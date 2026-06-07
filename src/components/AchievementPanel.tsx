import React from 'react'
import { useGame } from '../context/GameContext'
import { ACHIEVEMENTS } from '../data/achievements'

interface AchievementPanelProps {
  onClose: () => void
}

export const AchievementPanel: React.FC<AchievementPanelProps> = ({ onClose }) => {
  const { gameState } = useGame()

  const unlockedCount = gameState.unlockedAchievements.length
  const totalCount = ACHIEVEMENTS.length

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-lg w-full shadow-2xl animate-slide-up border border-gray-700 overflow-hidden max-h-[80vh] flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">🏆 成就系统</h2>
              <p className="text-gray-400 text-sm">已解锁 {unlockedCount} / {totalCount}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl transition-colors"
            >
              ×
            </button>
          </div>
          
          <div className="mt-3">
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all"
                style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {ACHIEVEMENTS.map(achievement => {
            const isUnlocked = gameState.unlockedAchievements.includes(achievement.id)
            
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-600/50'
                    : 'bg-gray-800/50 border-gray-700 opacity-60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`text-4xl ${!isUnlocked && 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${isUnlocked ? 'text-amber-400' : 'text-gray-400'}`}>
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                  </div>
                  {isUnlocked && (
                    <div className="text-green-400 text-xl">✓</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
