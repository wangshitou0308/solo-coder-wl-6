import { Achievement, GameState } from '../types'

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_dig',
    name: '初露锋芒',
    description: '完成第一次挖掘',
    icon: '⛏️',
    unlocked: false,
    condition: (state: GameState) => state.totalDigs >= 1
  },
  {
    id: 'brush_lover',
    name: '刷子爱好者',
    description: '使用刷子挖掘100次',
    icon: '🖌️',
    unlocked: false,
    condition: (state: GameState) => state.brushUses >= 100
  },
  {
    id: 'dinosaur_hunter',
    name: '恐龙猎人',
    description: '发现5种不同的恐龙化石',
    icon: '🦖',
    unlocked: false,
    condition: (state: GameState) => {
      const dinosaurFossils = ['tyrannosaur_tooth', 'triceratops', 'velociraptor', 'stegosaurus', 'brachiosaurus', 'allosaurus', 'coelophysis', 'hadrosaur', 'ankylosaurus', 'dinosaur_egg', 'dinosaur_bone', 'archaeopteryx']
      const collected = state.collectedFossils.filter(f => dinosaurFossils.includes(f.fossilId))
      return new Set(collected.map(f => f.fossilId)).size >= 5
    }
  },
  {
    id: 'fossil_collector',
    name: '化石收藏家',
    description: '收集20种不同的化石',
    icon: '🏆',
    unlocked: false,
    condition: (state: GameState) => new Set(state.collectedFossils.map(f => f.fossilId)).size >= 20
  },
  {
    id: 'ancient_explorer',
    name: '远古探索者',
    description: '探索前寒武纪地层',
    icon: '🌋',
    unlocked: false,
    condition: (state: GameState) => state.discoveredEras.includes('precambrian')
  },
  {
    id: 'paleontologist',
    name: '古生物学家',
    description: '收集所有古生代化石类型',
    icon: '📚',
    unlocked: false,
    condition: (state: GameState) => {
      const paleozoicFossils = ['trilobite', 'ammonite', 'dunkleosteus', 'giant_fern', 'graptolite', 'placoderm', 'eurypterid', 'calamites', 'signature_rock', 'pyrite']
      const collected = state.collectedFossils.filter(f => paleozoicFossils.includes(f.fossilId))
      return new Set(collected.map(f => f.fossilId)).size >= 5
    }
  },
  {
    id: 'complete_discovery',
    name: '完美发掘',
    description: '发现一个完整度100%的化石',
    icon: '✨',
    unlocked: false,
    condition: (state: GameState) => state.collectedFossils.some(f => f.completeness >= 100)
  },
  {
    id: 'time_traveler',
    name: '时间旅行者',
    description: '在所有12个地质年代都有发现',
    icon: '⏰',
    unlocked: false,
    condition: (state: GameState) => state.discoveredEras.length >= 12
  }
]

export const checkAchievements = (state: GameState, unlockedIds: string[]): Achievement[] => {
  return ACHIEVEMENTS.filter(a => {
    if (unlockedIds.includes(a.id)) return false
    return a.condition(state)
  })
}
