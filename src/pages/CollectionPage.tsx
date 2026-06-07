import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { FOSSILS, getRarityColor, getRarityName, getFossilById } from '../data/fossils'
import { GEOLOGICAL_ERAS } from '../data/eras'
import { ToastContainer } from '../components/ToastContainer'

type FilterEra = string | 'all'
type FilterType = 'all' | 'animal' | 'plant' | 'mineral'
type FilterRarity = 'all' | 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'

export const CollectionPage: React.FC = () => {
  const { gameState } = useGame()
  const [filterEra, setFilterEra] = useState<FilterEra>('all')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [filterRarity, setFilterRarity] = useState<FilterRarity>('all')
  const [selectedFossil, setSelectedFossil] = useState<string | null>(null)

  const collectedFossilIds = useMemo(() => {
    return new Set(gameState.collectedFossils.map(f => f.fossilId))
  }, [gameState.collectedFossils])

  const filteredFossils = useMemo(() => {
    return FOSSILS.filter(fossil => {
      if (filterEra !== 'all' && fossil.eraId !== filterEra) return false
      if (filterType !== 'all' && fossil.type !== filterType) return false
      if (filterRarity !== 'all' && fossil.rarity !== filterRarity) return false
      return true
    })
  }, [filterEra, filterType, filterRarity])

  const getCompleteness = (fossilId: string): number => {
    const collected = gameState.collectedFossils.find(f => f.fossilId === fossilId)
    return collected?.completeness || 0
  }

  const totalCollected = gameState.collectedFossils.length
  const totalFossils = FOSSILS.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏛️</span>
            <div>
              <h1 className="text-xl font-bold text-white">化石收藏馆</h1>
              <p className="text-xs text-gray-400">共收集 {totalCollected} / {totalFossils} 种</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-2">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              ⛏️ 挖掘现场
            </Link>
            <Link
              to="/collection"
              className="px-4 py-2 text-sm font-medium text-amber-400 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              🏛️ 收藏馆
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gray-800/50 rounded-2xl p-4 mb-6 border border-gray-700">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="text-xs text-gray-400 block mb-1">地质年代</label>
              <select
                value={filterEra}
                onChange={(e) => setFilterEra(e.target.value)}
                className="bg-gray-700 text-white text-sm rounded-lg px-3 py-2 border border-gray-600 focus:border-amber-500 focus:outline-none"
              >
                <option value="all">全部年代</option>
                {GEOLOGICAL_ERAS.map(era => (
                  <option key={era.id} value={era.id}>{era.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">类型</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as FilterType)}
                className="bg-gray-700 text-white text-sm rounded-lg px-3 py-2 border border-gray-600 focus:border-amber-500 focus:outline-none"
              >
                <option value="all">全部类型</option>
                <option value="animal">动物化石</option>
                <option value="plant">植物化石</option>
                <option value="mineral">矿物</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1">稀有度</label>
              <select
                value={filterRarity}
                onChange={(e) => setFilterRarity(e.target.value as FilterRarity)}
                className="bg-gray-700 text-white text-sm rounded-lg px-3 py-2 border border-gray-600 focus:border-amber-500 focus:outline-none"
              >
                <option value="all">全部稀有度</option>
                <option value="common">普通</option>
                <option value="uncommon">稀有</option>
                <option value="rare">珍贵</option>
                <option value="epic">史诗</option>
                <option value="legendary">传说</option>
              </select>
            </div>

            <div className="ml-auto text-right">
              <div className="text-2xl font-bold text-amber-400">{totalCollected}</div>
              <div className="text-xs text-gray-400">已收集 / {totalFossils} 总数</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredFossils.map(fossil => {
            const isCollected = collectedFossilIds.has(fossil.id)
            const completeness = getCompleteness(fossil.id)
            const era = GEOLOGICAL_ERAS.find(e => e.id === fossil.eraId)

            return (
              <div
                key={fossil.id}
                className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer transform hover:scale-105 ${
                  isCollected 
                    ? 'border-gray-600 hover:border-amber-500' 
                    : 'border-gray-800 opacity-60'
                }`}
                onClick={() => isCollected && setSelectedFossil(fossil.id)}
              >
                <div 
                  className="h-32 flex items-center justify-center relative"
                  style={{ backgroundColor: isCollected ? era?.color || '#333' : '#1a1a2e' }}
                >
                  {isCollected ? (
                    <svg viewBox="0 0 50 50" className="w-16 h-16">
                      <path 
                        d={fossil.svgPath} 
                        fill="rgba(255,255,255,0.9)" 
                        stroke="#333" 
                        strokeWidth="0.5"
                      />
                    </svg>
                  ) : (
                    <span className="text-4xl text-gray-600">❓</span>
                  )}
                  
                  {isCollected && (
                    <div 
                      className="absolute top-2 right-2 w-3 h-3 rounded-full"
                      style={{ backgroundColor: getRarityColor(fossil.rarity) }}
                    />
                  )}
                </div>
                
                <div className="p-3 bg-gray-800">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {isCollected ? fossil.name : '???'}
                  </h3>
                  <p className="text-xs text-gray-400 truncate">
                    {isCollected ? era?.name : '未发现'}
                  </p>
                  
                  {isCollected && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">完整度</span>
                        <span className="text-gray-300">{completeness.toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                          style={{ width: `${completeness}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {selectedFossil && (() => {
        const fossil = getFossilById(selectedFossil)
        const completeness = getCompleteness(selectedFossil)
        if (!fossil) return null
        
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
                    onClick={() => setSelectedFossil(null)}
                    className="text-gray-400 hover:text-white text-2xl transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div 
                  className="w-full h-48 rounded-xl mb-4 flex items-center justify-center"
                  style={{ backgroundColor: GEOLOGICAL_ERAS.find(e => e.id === fossil.eraId)?.color || '#333' }}
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
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
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
                </div>

                <button
                  onClick={() => setSelectedFossil(null)}
                  className="w-full mt-6 py-3 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-600 transition-colors"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        )
      })()}

      <ToastContainer />
    </div>
  )
}
