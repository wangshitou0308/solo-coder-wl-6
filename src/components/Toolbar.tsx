import React from 'react'
import { ToolType } from '../types'
import { TOOLS } from '../data/tools'
import { useGame } from '../context/GameContext'

interface ToolbarProps {
  onReset: () => void
}

export const Toolbar: React.FC<ToolbarProps> = ({ onReset }) => {
  const { currentTool, setCurrentTool, gameState, triggerTimelineAnimation } = useGame()

  return (
    <div className="bg-gray-800/90 backdrop-blur rounded-2xl p-4 shadow-xl border border-gray-700">
      <h3 className="text-white font-semibold mb-3 text-center">🔧 挖掘工具</h3>
      
      <div className="flex gap-2 mb-4">
        {TOOLS.map(tool => (
          <button
            key={tool.type}
            onClick={() => setCurrentTool(tool.type)}
            className={`flex-1 p-3 rounded-xl transition-all ${
              currentTool === tool.type
                ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg scale-105'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <div className="text-2xl mb-1">{tool.icon}</div>
            <div className="text-xs font-semibold">{tool.name}</div>
          </button>
        ))}
      </div>

      {TOOLS.map(tool => tool.type === currentTool && (
        <div key={tool.type} className="text-xs text-gray-400 mb-4 text-center p-2 bg-gray-700/50 rounded-lg">
          {tool.description}
        </div>
      ))}

      <div className="flex gap-2">
        <button
          onClick={onReset}
          className="flex-1 py-2 px-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
        >
          🔄 重置剖面
        </button>
        <button
          onClick={triggerTimelineAnimation}
          className="flex-1 py-2 px-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors text-sm font-medium"
        >
          ⏰ 时间压缩
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>总挖掘次数</span>
          <span className="text-white font-semibold">{gameState.totalDigs}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>发现化石</span>
          <span className="text-amber-400 font-semibold">{gameState.collectedFossils.length}</span>
        </div>
      </div>
    </div>
  )
}
