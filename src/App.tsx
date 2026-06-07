import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import { HomePage } from './pages/HomePage'
import { CollectionPage } from './pages/CollectionPage'
import { useGame } from './context/GameContext'

const AppContent: React.FC = () => {
  const { currentSave, createNewSave, saves } = useGame()
  const [showWelcome, setShowWelcome] = useState(false)
  const [saveName, setSaveName] = useState('')

  useEffect(() => {
    if (saves.length === 0) {
      setShowWelcome(true)
    } else {
      setShowWelcome(false)
    }
  }, [saves.length])

  const handleCreateSave = async () => {
    const name = saveName.trim() || '我的第一个存档'
    await createNewSave(name)
    setShowWelcome(false)
  }

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800/90 backdrop-blur rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-700 text-center">
          <div className="text-6xl mb-4">🦕</div>
          <h1 className="text-3xl font-bold text-white mb-2">GeoDig</h1>
          <p className="text-gray-400 mb-6">交互式地质年代探索与化石挖掘模拟器</p>
          
          <div className="space-y-4 mb-6 text-left">
            <div className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-xl">
              <span className="text-2xl">⛏️</span>
              <div>
                <p className="text-white font-medium">挖掘地层</p>
                <p className="text-gray-400 text-sm">使用不同工具探索12个地质年代</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-xl">
              <span className="text-2xl">🦴</span>
              <div>
                <p className="text-white font-medium">发现化石</p>
                <p className="text-gray-400 text-sm">收集55种史前生物化石和矿物</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-xl">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="text-white font-medium">解锁成就</p>
                <p className="text-gray-400 text-sm">完成8个独特的成就挑战</p>
              </div>
            </div>
          </div>

          <input
            type="text"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            placeholder="输入存档名称..."
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-amber-500 focus:outline-none mb-4 text-center"
            onKeyPress={(e) => e.key === 'Enter' && handleCreateSave()}
          />

          <button
            onClick={handleCreateSave}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            开始探索 🚀
          </button>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/collection" element={<CollectionPage />} />
    </Routes>
  )
}

const App: React.FC = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  )
}

export default App
