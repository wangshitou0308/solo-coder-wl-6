import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { GEOLOGICAL_ERAS } from '../data/eras'
import { useGame } from '../context/GameContext'

interface TimelineProps {
  onEraClick?: (eraId: string) => void
}

export const Timeline: React.FC<TimelineProps> = ({ onEraClick }) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const { highlightedEra, setHighlightedEra, gameState } = useGame()

  useEffect(() => {
    if (!svgRef.current) return

    const width = 200
    const height = 700
    const margin = { top: 20, right: 10, bottom: 20, left: 50 }

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    svg.selectAll('*').remove()

    const maxMya = GEOLOGICAL_ERAS[0].startMya
    const minMya = GEOLOGICAL_ERAS[GEOLOGICAL_ERAS.length - 1].startMya

    const yScale = d3.scaleLog()
      .domain([minMya * 0.9, maxMya * 1.1])
      .range([height - margin.bottom, margin.top])

    const g = svg.append('g')

    GEOLOGICAL_ERAS.forEach((era, index) => {
      const yTop = index === 0 ? margin.top : yScale(era.startMya)
      const yBottom = index === GEOLOGICAL_ERAS.length - 1 
        ? height - margin.bottom 
        : yScale(GEOLOGICAL_ERAS[index - 1].startMya)
      const barHeight = yBottom - yTop

      const isHighlighted = highlightedEra === era.id
      const isDiscovered = gameState.discoveredEras.includes(era.id)

      g.append('rect')
        .attr('x', margin.left)
        .attr('y', yTop)
        .attr('width', 40)
        .attr('height', barHeight)
        .attr('fill', era.color)
        .attr('stroke', isHighlighted ? '#FFD700' : '#333')
        .attr('stroke-width', isHighlighted ? 3 : 1)
        .attr('rx', 4)
        .style('cursor', 'pointer')
        .style('opacity', isHighlighted ? 1 : 0.85)
        .on('click', () => {
          setHighlightedEra(era.id)
          onEraClick?.(era.id)
        })
        .on('mouseenter', function() {
          d3.select(this).style('opacity', 1)
        })
        .on('mouseleave', function() {
          d3.select(this).style('opacity', highlightedEra === era.id ? 1 : 0.85)
        })

      if (isDiscovered) {
        g.append('text')
          .attr('x', margin.left + 20)
          .attr('y', yTop + barHeight / 2 + 4)
          .attr('text-anchor', 'middle')
          .attr('font-size', '12')
          .text('✓')
          .attr('fill', 'white')
          .attr('font-weight', 'bold')
      }

      const labelY = yTop + barHeight / 2
      g.append('text')
        .attr('x', margin.left - 8)
        .attr('y', labelY + 4)
        .attr('text-anchor', 'end')
        .attr('font-size', '11')
        .attr('fill', isHighlighted ? '#FFD700' : '#CBD5E0')
        .attr('font-weight', isHighlighted ? 'bold' : 'normal')
        .text(era.name)
        .style('pointer-events', 'none')

      if (barHeight > 30) {
        const timeText = era.startMya >= 1000 
          ? `${(era.startMya / 1000).toFixed(0)}亿` 
          : `${era.startMya.toFixed(0)}万年`
        g.append('text')
          .attr('x', margin.left - 8)
          .attr('y', labelY + 16)
          .attr('text-anchor', 'end')
          .attr('font-size', '9')
          .attr('fill', '#718096')
          .text(timeText)
          .style('pointer-events', 'none')
      }
    })

    g.append('text')
      .attr('x', width / 2)
      .attr('y', 12)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12')
      .attr('fill', '#FFD700')
      .attr('font-weight', 'bold')
      .text('📅 地质时间轴')

  }, [highlightedEra, gameState.discoveredEras, setHighlightedEra, onEraClick])

  return (
    <div className="bg-gray-800/90 backdrop-blur rounded-2xl p-4 shadow-xl border border-gray-700">
      <svg ref={svgRef} className="mx-auto" />
    </div>
  )
}
