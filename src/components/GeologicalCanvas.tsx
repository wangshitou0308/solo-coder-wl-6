import React, { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react'
import { GEOLOGICAL_ERAS } from '../data/eras'
import { getFossilsByEra } from '../data/fossils'
import { TOOLS } from '../data/tools'
import { PlacedFossil, ToolType, Fossil } from '../types'
import { useGame } from '../context/GameContext'

interface GeologicalCanvasProps {
  onFossilDiscovered: (fossil: Fossil, completeness: number) => void
  seed?: number
}

export interface GeologicalCanvasHandle {
  resetCanvas: () => void
}

export const GeologicalCanvas = forwardRef<GeologicalCanvasHandle, GeologicalCanvasProps>(
  ({ onFossilDiscovered, seed = 12345 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const maskCanvasRef = useRef<HTMLCanvasElement>(null)
    const fossilCanvasRef = useRef<HTMLCanvasElement>(null)
    const { currentTool, addDig, addToast } = useGame()
    
    const [isDrawing, setIsDrawing] = useState(false)
    const [placedFossils, setPlacedFossils] = useState<PlacedFossil[]>([])
    const [canvasSize] = useState({ width: 500, height: 700 })

    const seededRandom = useCallback((s: number) => {
      let seedVal = s
      return () => {
        seedVal = (seedVal * 9301 + 49297) % 233280
        return seedVal / 233280
      }
    }, [])

    const generateRockTexture = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, baseColor: string, lightColor: string, random: () => number) => {
      ctx.fillStyle = baseColor
      ctx.fillRect(x, y, w, h)

      for (let i = 0; i < 100; i++) {
        const rx = x + random() * w
        const ry = y + random() * h
        const rw = 2 + random() * 8
        const rh = 2 + random() * 8
        
        ctx.fillStyle = random() > 0.5 ? lightColor : darkenColor(baseColor, 0.2)
        ctx.globalAlpha = 0.3 + random() * 0.3
        
        ctx.beginPath()
        ctx.ellipse(rx, ry, rw, rh, random() * Math.PI, 0, Math.PI * 2)
        ctx.fill()
      }

      for (let i = 0; i < 20; i++) {
        const startX = x + random() * w
        const startY = y + random() * h
        const endX = startX + (random() - 0.5) * 60
        const endY = startY + (random() - 0.5) * 20
        
        ctx.strokeStyle = darkenColor(baseColor, 0.3)
        ctx.globalAlpha = 0.2 + random() * 0.2
        ctx.lineWidth = 0.5 + random() * 1
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()
      }

      ctx.globalAlpha = 1
    }, [])

    const darkenColor = (color: string, amount: number): string => {
      const hex = color.replace('#', '')
      const r = Math.max(0, parseInt(hex.substr(0, 2), 16) * (1 - amount))
      const g = Math.max(0, parseInt(hex.substr(2, 2), 16) * (1 - amount))
      const b = Math.max(0, parseInt(hex.substr(4, 2), 16) * (1 - amount))
      return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`
    }

    const placeFossils = useCallback(() => {
      const random = seededRandom(seed + Math.random() * 10000)
      const fossils: PlacedFossil[] = []
      const eraHeight = canvasSize.height / GEOLOGICAL_ERAS.length

      GEOLOGICAL_ERAS.forEach((era, eraIndex) => {
        const eraFossils = getFossilsByEra(era.id)
        const yStart = eraIndex * eraHeight
        const fossilCount = 2 + Math.floor(random() * 3)

        for (let i = 0; i < fossilCount; i++) {
          if (eraFossils.length === 0) continue
          
          const rarityRoll = random()
          let targetRarity: string
          if (rarityRoll < 0.5) targetRarity = 'common'
          else if (rarityRoll < 0.75) targetRarity = 'uncommon'
          else if (rarityRoll < 0.9) targetRarity = 'rare'
          else if (rarityRoll < 0.97) targetRarity = 'epic'
          else targetRarity = 'legendary'

          let availableFossils = eraFossils.filter(f => f.rarity === targetRarity)
          if (availableFossils.length === 0) {
            availableFossils = eraFossils
          }
          
          const fossil = availableFossils[Math.floor(random() * availableFossils.length)]
          
          const x = 50 + random() * (canvasSize.width - 100)
          const y = yStart + 30 + random() * (eraHeight - 60)

          fossils.push({
            fossil,
            x,
            y,
            discovered: false,
            completeness: 100
          })
        }
      })

      return fossils
    }, [seed, seededRandom, canvasSize.height])

    const drawGeologicalLayers = useCallback((ctx: CanvasRenderingContext2D) => {
      const random = seededRandom(seed)
      const eraHeight = canvasSize.height / GEOLOGICAL_ERAS.length

      GEOLOGICAL_ERAS.forEach((era, index) => {
        const y = index * eraHeight
        generateRockTexture(ctx, 0, y, canvasSize.width, eraHeight, era.color, era.colorLight, random)
        
        ctx.fillStyle = 'rgba(0,0,0,0.3)'
        ctx.fillRect(0, y, canvasSize.width, 2)

        ctx.fillStyle = 'rgba(255,255,255,0.8)'
        ctx.font = 'bold 12px sans-serif'
        ctx.fillText(era.name, 10, y + 20)
      })
    }, [seed, seededRandom, generateRockTexture, canvasSize])

    const drawFossils = useCallback((ctx: CanvasRenderingContext2D, fossils: PlacedFossil[]) => {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)
      
      fossils.forEach(pf => {
        if (!pf.discovered) {
          ctx.save()
          ctx.globalAlpha = 0.15
          ctx.translate(pf.x, pf.y)
          
          const scale = 0.8
          ctx.scale(scale, scale)
          ctx.translate(-25, -25)
          
          const path = new Path2D(pf.fossil.svgPath)
          ctx.fillStyle = '#FFD700'
          ctx.fill(path)
          ctx.strokeStyle = '#B8860B'
          ctx.lineWidth = 0.5
          ctx.stroke(path)
          
          ctx.restore()
        }
      })
    }, [canvasSize])

    const initMask = useCallback((ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = 'rgba(40, 40, 50, 0.95)'
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
    }, [canvasSize])

    const checkFossilDiscovery = useCallback((x: number, y: number, tool: ToolType, fossils: PlacedFossil[]): PlacedFossil | null => {
      const toolData = TOOLS.find(t => t.type === tool)!
      
      for (const pf of fossils) {
        if (pf.discovered) continue

        const dx = x - pf.x
        const dy = y - pf.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const fossilRadius = 25

        if (distance < toolData.radius + fossilRadius) {
          return pf
        }
      }
      return null
    }, [])

    const dig = useCallback((x: number, y: number) => {
      const maskCanvas = maskCanvasRef.current
      if (!maskCanvas) return

      const maskCtx = maskCanvas.getContext('2d')
      if (!maskCtx) return

      const toolData = TOOLS.find(t => t.type === currentTool)!
      
      maskCtx.globalCompositeOperation = 'destination-out'
      
      const gradient = maskCtx.createRadialGradient(x, y, 0, x, y, toolData.radius)
      gradient.addColorStop(0, 'rgba(0,0,0,1)')
      gradient.addColorStop(0.7, 'rgba(0,0,0,0.8)')
      gradient.addColorStop(1, 'rgba(0,0,0,0)')
      
      maskCtx.fillStyle = gradient
      maskCtx.beginPath()
      maskCtx.arc(x, y, toolData.radius, 0, Math.PI * 2)
      maskCtx.fill()

      maskCtx.globalCompositeOperation = 'source-over'

      const discovered = checkFossilDiscovery(x, y, currentTool, placedFossils)
      if (discovered) {
        const tool = TOOLS.find(t => t.type === currentTool)!
        let completeness = 100 - tool.damage * 100 * (0.5 + Math.random() * 0.5)
        completeness = Math.max(10, Math.min(100, completeness))
        
        if (currentTool === 'brush') {
          completeness = 100
        }

        discovered.discovered = true
        discovered.completeness = completeness

        setPlacedFossils([...placedFossils])
        onFossilDiscovered(discovered.fossil, completeness)
        addToast({
          type: 'success',
          title: '发现化石！',
          message: `${discovered.fossil.name} - 完整度 ${completeness.toFixed(0)}%`,
          duration: 3000
        })
      }

      addDig(currentTool)
    }, [currentTool, checkFossilDiscovery, placedFossils, onFossilDiscovered, addDig, addToast])

    const getCanvasCoords = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = maskCanvasRef.current
      if (!canvas) return { x: 0, y: 0 }
      
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      }
    }, [])

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
      setIsDrawing(true)
      const { x, y } = getCanvasCoords(e)
      dig(x, y)
    }, [getCanvasCoords, dig])

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return
      const { x, y } = getCanvasCoords(e)
      dig(x, y)
    }, [isDrawing, getCanvasCoords, dig])

    const handleMouseUp = useCallback(() => {
      setIsDrawing(false)
    }, [])

    const handleMouseLeave = useCallback(() => {
      setIsDrawing(false)
    }, [])

    const resetCanvas = useCallback(() => {
      const newFossils = placeFossils()
      setPlacedFossils(newFossils)

      const mainCanvas = canvasRef.current
      const maskCanvas = maskCanvasRef.current
      const fossilCanvas = fossilCanvasRef.current

      if (mainCanvas && maskCanvas && fossilCanvas) {
        const mainCtx = mainCanvas.getContext('2d')
        const maskCtx = maskCanvas.getContext('2d')
        const fossilCtx = fossilCanvas.getContext('2d')

        if (mainCtx && maskCtx && fossilCtx) {
          drawGeologicalLayers(mainCtx)
          initMask(maskCtx)
          drawFossils(fossilCtx, newFossils)
        }
      }
    }, [placeFossils, drawGeologicalLayers, initMask, drawFossils])

    useImperativeHandle(ref, () => ({
      resetCanvas
    }))

    useEffect(() => {
      resetCanvas()
    }, [])

    useEffect(() => {
      const fossilCanvas = fossilCanvasRef.current
      if (fossilCanvas) {
        const ctx = fossilCanvas.getContext('2d')
        if (ctx) {
          drawFossils(ctx, placedFossils)
        }
      }
    }, [placedFossils, drawFossils])

    return (
      <div className="relative inline-block">
        <div className="relative canvas-container rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-700">
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className="absolute top-0 left-0 block"
          />
          <canvas
            ref={fossilCanvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className="absolute top-0 left-0 pointer-events-none block"
          />
          <canvas
            ref={maskCanvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className="absolute top-0 left-0 block"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          />
        </div>
        
        <div className="mt-3 text-center text-gray-400 text-sm">
          💡 点击并拖动鼠标来挖掘地层，发现隐藏的化石
        </div>
      </div>
    )
  }
)

GeologicalCanvas.displayName = 'GeologicalCanvas'
