import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { GameState, SaveData, Toast, CollectedFossil, ToolType } from '../types'
import { getSaves, createSave, updateSave, getSave } from '../utils/db'
import { checkAchievements } from '../data/achievements'

interface GameContextType {
  currentSave: SaveData | null
  saves: SaveData[]
  gameState: GameState
  toasts: Toast[]
  currentTool: ToolType
  highlightedEra: string | null
  isTimelineAnimating: boolean
  loadSaves: () => Promise<void>
  createNewSave: (name: string) => Promise<void>
  selectSave: (saveId: string) => Promise<void>
  addDig: (toolType: ToolType) => void
  collectFossil: (fossil: CollectedFossil) => void
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  setCurrentTool: (tool: ToolType) => void
  setHighlightedEra: (eraId: string | null) => void
  setIsTimelineAnimating: (animating: boolean) => void
  triggerTimelineAnimation: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within GameProvider')
  }
  return context
}

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [saves, setSaves] = useState<SaveData[]>([])
  const [currentSave, setCurrentSave] = useState<SaveData | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [currentTool, setCurrentTool] = useState<ToolType>('hammer')
  const [highlightedEra, setHighlightedEra] = useState<string | null>(null)
  const [isTimelineAnimating, setIsTimelineAnimating] = useState(false)

  const gameState = currentSave?.gameState || {
    currentSaveId: '',
    totalDigs: 0,
    brushUses: 0,
    collectedFossils: [],
    unlockedAchievements: [],
    discoveredEras: []
  }

  const loadSaves = useCallback(async () => {
    const loadedSaves = await getSaves()
    setSaves(loadedSaves)
    if (loadedSaves.length > 0 && !currentSave) {
      setCurrentSave(loadedSaves[0])
    }
  }, [currentSave])

  const createNewSave = useCallback(async (name: string) => {
    const newSave = await createSave(name)
    setSaves(prev => [...prev, newSave])
    setCurrentSave(newSave)
  }, [])

  const selectSave = useCallback(async (saveId: string) => {
    const save = await getSave(saveId)
    if (save) {
      setCurrentSave(save)
    }
  }, [])

  const checkAndUnlockAchievements = useCallback((state: GameState): string[] => {
    const newAchievements = checkAchievements(state, state.unlockedAchievements)
    newAchievements.forEach(achievement => {
      addToast({
        type: 'achievement',
        title: '成就解锁！',
        message: `${achievement.icon} ${achievement.name}`,
        duration: 5000
      })
    })
    return newAchievements.map(a => a.id)
  }, [])

  const addDig = useCallback((toolType: ToolType) => {
    if (!currentSave) return

    const newState = { ...currentSave.gameState }
    newState.totalDigs += 1
    if (toolType === 'brush') {
      newState.brushUses += 1
    }

    const newAchievements = checkAndUnlockAchievements(newState)
    if (newAchievements.length > 0) {
      newState.unlockedAchievements = [...newState.unlockedAchievements, ...newAchievements]
    }

    const updatedSave = { ...currentSave, gameState: newState }
    setCurrentSave(updatedSave)
    updateSave(updatedSave)
  }, [currentSave, checkAndUnlockAchievements])

  const collectFossil = useCallback((fossil: CollectedFossil) => {
    if (!currentSave) return

    const newState = { ...currentSave.gameState }
    const exists = newState.collectedFossils.some(f => f.fossilId === fossil.fossilId)
    
    if (!exists) {
      newState.collectedFossils.push(fossil)
      if (!newState.discoveredEras.includes(fossil.eraId)) {
        newState.discoveredEras.push(fossil.eraId)
      }
    }

    const newAchievements = checkAndUnlockAchievements(newState)
    if (newAchievements.length > 0) {
      newState.unlockedAchievements = [...newState.unlockedAchievements, ...newAchievements]
    }

    const updatedSave = { ...currentSave, gameState: newState }
    setCurrentSave(updatedSave)
    updateSave(updatedSave)
  }, [currentSave, checkAndUnlockAchievements])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random()}`
    setToasts(prev => [...prev, { ...toast, id }])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, toast.duration)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const triggerTimelineAnimation = useCallback(() => {
    setIsTimelineAnimating(true)
    const eras = ['holocene', 'pleistocene', 'pliocene', 'miocene', 'oligocene', 'eocene', 'paleocene', 'cretaceous', 'jurassic', 'triassic', 'paleozoic', 'precambrian']
    
    eras.forEach((era, index) => {
      setTimeout(() => {
        setHighlightedEra(era)
      }, index * 300)
    })

    setTimeout(() => {
      setHighlightedEra(null)
      setIsTimelineAnimating(false)
    }, eras.length * 300 + 500)
  }, [])

  useEffect(() => {
    loadSaves()
  }, [loadSaves])

  const value: GameContextType = {
    currentSave,
    saves,
    gameState,
    toasts,
    currentTool,
    highlightedEra,
    isTimelineAnimating,
    loadSaves,
    createNewSave,
    selectSave,
    addDig,
    collectFossil,
    addToast,
    removeToast,
    setCurrentTool,
    setHighlightedEra,
    setIsTimelineAnimating,
    triggerTimelineAnimation
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}
