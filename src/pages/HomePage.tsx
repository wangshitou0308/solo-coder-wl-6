import React, { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { GeologicalCanvas, GeologicalCanvasHandle } from '../components/GeologicalCanvas'
import { Toolbar } from '../components/Toolbar'
import { Timeline } from '../components/Timeline'
import { FossilKnowledgeCard } from '../components/FossilKnowledgeCard'
import { ToastContainer } from '../components/ToastContainer'
import { AchievementPanel } from '../components/AchievementPanel'
import { SaveManager } from '../components/SaveManager'
import { Fossil } from '../types'
import { useGame } from '../context/GameContext'

export const HomePage: React.FC = () => {
  const [selectedFossil, setSelectedFossil] = useState<{ fossil: Fossil; completeness: number } | null>(null)
  const [showAchievements, setShowAchievements] = useState(false)
  const [showSaves, setShowSaves] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const canvasRef = useRef<GeologicalCanvasHandle>(null)
  const { collectFossil, setHighlightedEra } = useGame()

  const handleFossilDiscovered = useCallback((fossil: Fossil, completeness: number) => {
    setSelectedFossil({ fossil, completeness })
    setHighlightedEra(fossil.eraId)
    
    collectFossil({
      fossilId: fossil.id,
      discoveredAt: Date.now(),
      completeness,
      eraId: fossil.eraId
    })
  }, [collectFossil, setHighlightedEra])

  const handleCloseCard = useCallback(() => {
    setSelectedFossil(null)
    setHighlightedEra(null)
  }, [setHighlightedEra])

  const handleReset = useCallback(() => {
    setResetKey(prev => prev + 1)
  }, [])

  const handleEraClick = useCallback((eraId: string) => {
    setHighlightedEra(eraId)
  }, [setHighlightedEra])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🦕</span>
            <div>
              <h1 className="text-xl font-bold text-white">GeoDig</h1>
              <p className="text-xs text-gray-400">交互式地质年代探索与化石挖掘模拟器</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-2">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-amber-400 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              ⛏️ 挖掘现场
            </Link>
            <Link
              to="/collection"
              className="px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              🏛️ 收藏馆
            </Link>
            <button
              onClick={() => setShowAchievements(true)}
              className="px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              🏆 成就
            </button>
            <button
              onClick={() => setShowSaves(true)}
              className="px-4 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              💾 存档
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6 justify-center items-start">
          <div className="w-56 flex-shrink-0">
            <Timeline onEraClick={handleEraClick} />
          </div>

          <div className="flex-shrink-0">
            <GeologicalCanvas
              key={resetKey}
              ref={canvasRef}
              onFossilDiscovered={handleFossilDiscovered}
              seed={Date.now() % 100000}
            />
          </div>

          <div className="w-64 flex-shrink-0 space-y-4">
            <Toolbar onReset={handleReset} />
            
            <div className="bg-gray-800/90 backdrop-blur rounded-2xl p-4 shadow-xl border border-gray-700">
              <h3 className="text-white font-semibold mb-3 text-center">📊 探索进度</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">已发现年代</span>
                  <span className="text-amber-400 font-semibold">12 / 12</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {selectedFossil && (
        <FossilKnowledgeCard
          fossil={selectedFossil.fossil}
          completeness={selectedFossil.completeness}
          onClose={handleCloseCard}
        />
      )}

      {showAchievements && (
        <AchievementPanel onClose={() => setShowAchievements(false)} />
      )}

      {showSaves && (
        <SaveManager onClose={() => setShowSaves(false)} />
      )}

      <ToastContainer />
    </div>
  )
}
