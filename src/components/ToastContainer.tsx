import React from 'react'
import { useGame } from '../context/GameContext'

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useGame()

  const getToastStyle = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-600 border-green-500'
      case 'info':
        return 'bg-blue-600 border-blue-500'
      case 'warning':
        return 'bg-yellow-600 border-yellow-500'
      case 'achievement':
        return 'bg-gradient-to-r from-purple-600 to-amber-600 border-amber-400'
      default:
        return 'bg-gray-600 border-gray-500'
    }
  }

  const getToastIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅'
      case 'info':
        return 'ℹ️'
      case 'warning':
        return '⚠️'
      case 'achievement':
        return '🏆'
      default:
        return '📢'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`toast-enter ${getToastStyle(toast.type)} text-white px-4 py-3 rounded-xl shadow-lg border-l-4 min-w-[280px] max-w-sm cursor-pointer`}
          onClick={() => removeToast(toast.id)}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">{getToastIcon(toast.type)}</span>
            <div className="flex-1">
              <p className="font-semibold text-sm">{toast.title}</p>
              <p className="text-xs text-white/80 mt-0.5">{toast.message}</p>
            </div>
            <button 
              className="text-white/60 hover:text-white text-lg leading-none"
              onClick={(e) => {
                e.stopPropagation()
                removeToast(toast.id)
              }}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
