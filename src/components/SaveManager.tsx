import React, { useState } from 'react'
import { useGame } from '../context/GameContext'

interface SaveManagerProps {
  onClose: () => void
}

export const SaveManager: React.FC<SaveManagerProps> = ({ onClose }) => {
  const { saves, currentSave, selectSave, createNewSave, loadSaves } = useGame()
  const [newSaveName, setNewSaveName] = useState('')

  const handleCreateSave = async () => {
    if (!newSaveName.trim()) return
    await createNewSave(newSaveName.trim())
    setNewSaveName('')
    await loadSaves()
  }

  const handleSelectSave = async (saveId: string) => {
    await selectSave(saveId)
    onClose()
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN')
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-md w-full shadow-2xl animate-slide-up border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">💾 存档管理</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSaveName}
              onChange={(e) => setNewSaveName(e.target.value)}
              placeholder="输入存档名称..."
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateSave()}
            />
            <button
              onClick={handleCreateSave}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 transition-colors text-sm font-medium"
            >
              新建
            </button>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {saves.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <span className="text-4xl block mb-2">📁</span>
                <p>暂无存档，创建一个新存档开始探索吧！</p>
              </div>
            ) : (
              saves.map(save => (
                <div
                  key={save.id}
                  onClick={() => handleSelectSave(save.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    currentSave?.id === save.id
                      ? 'bg-amber-900/30 border-amber-600/50'
                      : 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white">{save.name}</h3>
                      <p className="text-xs text-gray-400 mt-1">
                        化石: {save.gameState.collectedFossils.length} | 
                        挖掘: {save.gameState.totalDigs}次
                      </p>
                    </div>
                    {currentSave?.id === save.id && (
                      <span className="text-xs bg-amber-600 text-white px-2 py-1 rounded">当前</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    更新于: {formatDate(save.updatedAt)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
