export interface GeologicalEra {
  id: string
  name: string
  nameEn: string
  startMya: number
  endMya: number
  color: string
  colorLight: string
  description: string
  events: string[]
}

export interface Fossil {
  id: string
  name: string
  nameEn: string
  type: 'animal' | 'plant' | 'mineral'
  eraId: string
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  description: string
  funFact: string
  svgPath: string
  width: number
  height: number
}

export interface PlacedFossil {
  fossil: Fossil
  x: number
  y: number
  discovered: boolean
  completeness: number
}

export type ToolType = 'drill' | 'hammer' | 'brush'

export interface Tool {
  type: ToolType
  name: string
  description: string
  radius: number
  damage: number
  speed: number
  icon: string
}

export interface CollectedFossil {
  fossilId: string
  discoveredAt: number
  completeness: number
  eraId: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: number
  condition: (state: GameState) => boolean
}

export interface GameState {
  currentSaveId: string
  totalDigs: number
  brushUses: number
  collectedFossils: CollectedFossil[]
  unlockedAchievements: string[]
  discoveredEras: string[]
}

export interface SaveData {
  id: string
  name: string
  createdAt: number
  updatedAt: number
  gameState: GameState
}

export interface Toast {
  id: string
  type: 'success' | 'info' | 'warning' | 'achievement'
  title: string
  message: string
  duration: number
}
