import React from 'react'
import { Fossil } from '../types'
import { getRarityColor, getRarityName } from '../data/fossils'
import { GEOLOGICAL_ERAS } from '../data/eras'

interface FossilKnowledgeCardProps {
  fossil: Fossil
  completeness: number
  onClose: () => void
}

export const FossilKnowledgeCard: React.FC<FossilKnowledgeCardProps> = ({ fossil, completeness, onClose }) => {
  const era = GEOLOGICAL_ERAS.find(e => e.id === fossil.eraId)

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-md w-full shadow-2xl animate-slide-up border border-gray-700 overflow-hidden">
        <div 
          className="h-2"
          style={{ backgroundColor: getRarityColor(fossil.rarity) }}
        />
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{fossil.name}</h2>
              <p className="text-gray-400 text-sm">{fossil.nameEn}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl transition-colors"
            >
              ×
            </button>
          </div>

          <div 
            className="w-full h-48 rounded-xl mb-4 flex items-center justify-center"
            style={{ backgroundColor: era?.color || '#333' }}
          >
            <svg viewBox="0 0 50 50" className="w-32 h-32 fossil-glow">
              <path 
                d={fossil.svgPath} 
                fill="rgba(255,255,255,0.9)" 
                stroke="#333" 
                strokeWidth="0.5"
              />
            </svg>
          </div>

          <div className="flex gap-2 mb-4 flex-wrap">
            <span 
              className="px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: getRarityColor(fossil.rarity) }}
            >
              {getRarityName(fossil.rarity)}
            </span>
            <span 
              className="px-3 py-1 rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: era?.color || '#666' }}
            >
              {era?.name}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
              {fossil.type === 'animal' ? '动物' : fossil.type === 'plant' ? '植物' : '矿物'}
            </span>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">完整度</span>
              <span className="text-white font-semibold">{completeness.toFixed(0)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${completeness}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-amber-400 mb-1">📖 描述</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{fossil.description}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-cyan-400 mb-1">💡 趣味知识</h3>
              <p className="text-gray-300 text-sm leading-relaxed italic">{fossil.funFact}</p>
            </div>

            {era && (
              <div>
                <h3 className="text-sm font-semibold text-purple-400 mb-1">⏰ 地质年代</h3>
                <p className="text-gray-300 text-sm">
                  {era.startMya >= 1000 ? `${(era.startMya/1000).toFixed(1)}亿` : era.startMya} 万年前 - {era.endMya > 0 ? `${era.endMya} 万年前` : '至今'}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            加入收藏 ✨
          </button>
        </div>
      </div>
    </div>
  )
}
