import { Tool } from '../types'

export const TOOLS: Tool[] = [
  {
    type: 'drill',
    name: '钻头',
    description: '挖掘速度快，但可能损坏化石',
    radius: 15,
    damage: 0.4,
    speed: 3,
    icon: '⚙️'
  },
  {
    type: 'hammer',
    name: '地质锤',
    description: '平衡的挖掘工具，中等速度和精度',
    radius: 12,
    damage: 0.25,
    speed: 2,
    icon: '🔨'
  },
  {
    type: 'brush',
    name: '刷子',
    description: '精细清理，100%保存化石完整度',
    radius: 8,
    damage: 0,
    speed: 1,
    icon: '🖌️'
  }
]
