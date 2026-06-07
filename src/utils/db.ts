import { openDB, IDBPDatabase } from 'idb'
import { GameState, SaveData, CollectedFossil } from '../types'

const DB_NAME = 'geodig-db'
const DB_VERSION = 1

const STORE_SAVES = 'saves'
const STORE_COLLECTIONS = 'collections'

interface GameDB {
  saves: SaveData
  collections: CollectedFossil
}

let db: IDBPDatabase<GameDB> | null = null

export const initDB = async (): Promise<IDBPDatabase<GameDB>> => {
  if (db) return db

  db = await openDB<GameDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_SAVES)) {
        const store = db.createObjectStore(STORE_SAVES, { keyPath: 'id' })
        store.createIndex('createdAt', 'createdAt')
      }
      if (!db.objectStoreNames.contains(STORE_COLLECTIONS)) {
        const store = db.createObjectStore(STORE_COLLECTIONS, { keyPath: 'fossilId' })
        store.createIndex('eraId', 'eraId')
      }
    }
  })

  return db
}

export const createInitialGameState = (): GameState => ({
  currentSaveId: '',
  totalDigs: 0,
  brushUses: 0,
  collectedFossils: [],
  unlockedAchievements: [],
  discoveredEras: []
})

export const createSave = async (name: string): Promise<SaveData> => {
  const database = await initDB()
  const id = `save_${Date.now()}`
  const saveData: SaveData = {
    id,
    name,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    gameState: {
      ...createInitialGameState(),
      currentSaveId: id
    }
  }
  
  await database.add(STORE_SAVES, saveData)
  return saveData
}

export const getSaves = async (): Promise<SaveData[]> => {
  const database = await initDB()
  return database.getAll(STORE_SAVES)
}

export const getSave = async (id: string): Promise<SaveData | undefined> => {
  const database = await initDB()
  return database.get(STORE_SAVES, id)
}

export const updateSave = async (saveData: SaveData): Promise<void> => {
  const database = await initDB()
  saveData.updatedAt = Date.now()
  await database.put(STORE_SAVES, saveData)
}

export const deleteSave = async (id: string): Promise<void> => {
  const database = await initDB()
  await database.delete(STORE_SAVES, id)
}

export const addCollectedFossil = async (saveId: string, fossil: CollectedFossil): Promise<void> => {
  const save = await getSave(saveId)
  if (save) {
    const exists = save.gameState.collectedFossils.some(f => f.fossilId === fossil.fossilId)
    if (!exists) {
      save.gameState.collectedFossils.push(fossil)
      if (!save.gameState.discoveredEras.includes(fossil.eraId)) {
        save.gameState.discoveredEras.push(fossil.eraId)
      }
      await updateSave(save)
    }
  }
}

export const getCollectedFossils = async (saveId: string): Promise<CollectedFossil[]> => {
  const save = await getSave(saveId)
  return save?.gameState.collectedFossils || []
}
