import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'

type Position = {
  x: number
  y: number
}

type Milestone = {
  id: string
  label: string
  position: Position
}

const width = 7
const height = 5

const milestones: Milestone[] = [
  { id: 'circuit', label: 'First circuits', position: { x: 1, y: 3 } },
  { id: 'bot', label: 'Line Bot', position: { x: 3, y: 1 } },
  { id: 'internship', label: 'CP China', position: { x: 5, y: 3 } },
  { id: 'award', label: 'Gold medal', position: { x: 6, y: 1 } },
]

const goal = { x: 6, y: 4 }

function samePosition(a: Position, b: Position) {
  return a.x === b.x && a.y === b.y
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export function JourneyGame() {
  const [player, setPlayer] = useState<Position>({ x: 0, y: 4 })
  const [collected, setCollected] = useState<string[]>([])
  const won = collected.length === milestones.length && samePosition(player, goal)

  const grid = useMemo(() => {
    return Array.from({ length: width * height }, (_, index) => ({
      x: index % width,
      y: Math.floor(index / width),
    }))
  }, [])

  const move = useCallback((dx: number, dy: number) => {
    setPlayer((current) => {
      const next = {
        x: clamp(current.x + dx, 0, width - 1),
        y: clamp(current.y + dy, 0, height - 1),
      }
      const found = milestones.find((milestone) => samePosition(milestone.position, next))
      if (found) {
        setCollected((items) => (items.includes(found.id) ? items : [...items, found.id]))
      }
      return next
    })
  }, [])

  const reset = () => {
    setPlayer({ x: 0, y: 4 })
    setCollected([])
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') move(-1, 0)
      if (event.key === 'ArrowRight') move(1, 0)
      if (event.key === 'ArrowUp') move(0, -1)
      if (event.key === 'ArrowDown') move(0, 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [move])

  return (
    <div className="journey-game" aria-label="Mini game about Worapon engineering journey">
      <div className="game-board" style={{ '--grid-width': width } as CSSProperties}>
        {grid.map((cell) => {
          const milestone = milestones.find((item) => samePosition(item.position, cell))
          const isPlayer = samePosition(player, cell)
          const isGoal = samePosition(goal, cell)
          const isCollected = milestone ? collected.includes(milestone.id) : false

          return (
            <div
              className={[
                'game-cell',
                isGoal ? 'goal' : '',
                milestone ? 'milestone' : '',
                isCollected ? 'collected' : '',
                isPlayer ? 'player' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              key={`${cell.x}-${cell.y}`}
            >
              {milestone ? <span>{milestone.label}</span> : null}
              {isGoal ? <span>Portfolio launch</span> : null}
              {isPlayer ? <strong>WS</strong> : null}
            </div>
          )
        })}
      </div>

      <div className="game-panel">
        <div>
          <p className="section-kicker">Mini journey</p>
          <h3>Collect the milestones, then reach launch.</h3>
          <p>
            Move through the engineering path from early circuits to WheelSense recognition and
            portfolio launch.
          </p>
        </div>
        <div className="game-status" aria-live="polite">
          <span>{collected.length} / {milestones.length} milestones</span>
          <strong>{won ? 'Launch reached' : 'Journey active'}</strong>
        </div>
        <div className="game-controls" aria-label="Movement controls">
          <button type="button" onClick={() => move(0, -1)} aria-label="Move up">
            <ArrowUp size={18} />
          </button>
          <button type="button" onClick={() => move(-1, 0)} aria-label="Move left">
            <ArrowLeft size={18} />
          </button>
          <button type="button" onClick={() => move(1, 0)} aria-label="Move right">
            <ArrowRight size={18} />
          </button>
          <button type="button" onClick={() => move(0, 1)} aria-label="Move down">
            <ArrowDown size={18} />
          </button>
          <button type="button" onClick={reset} aria-label="Reset mini game">
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
