import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { getContributions } from '../../lib/api.js'

// ─── Colour scale ─────────────────────────────────────────────────────────────
function getColor(count) {
  if (count === 0) return { bg: '#161616', border: '#262626' }
  if (count <= 2)  return { bg: '#134e4a', border: '#0f3d39' }
  if (count <= 5)  return { bg: '#0f766e', border: '#0d6660' }
  if (count <= 9)  return { bg: '#14b8a6', border: '#0fa394' }
  return           { bg: '#7dd3dc', border: '#5ec8d4' }
}

// ─── Tooltip text ─────────────────────────────────────────────────────────────
function formatTooltip(dateStr, count) {
  const d = new Date(dateStr + 'T00:00:00')
  const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  if (count === 0) return `No contributions on ${label}`
  return `${count} contribution${count !== 1 ? 's' : ''} on ${label}`
}

// ─── Month labels ─────────────────────────────────────────────────────────────
// Uses the middle day of each week as the "owning month" — avoids the edge
// bug where the first partial week spans two months and both get labelled at x=0.
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAY_LABELS  = [null, 'Mon', null, 'Wed', null, 'Fri', null]

function getMonthLabels(weeks, STEP, LEFT_OFFSET) {
  const raw = []
  let prevKey = null

  weeks.forEach((week, wi) => {
    const days = week.contributionDays
    if (!days.length) return
    const midDay = days[Math.floor(days.length / 2)]
    const dt  = new Date(midDay.date + 'T00:00:00')
    const key = `${dt.getFullYear()}-${dt.getMonth()}`
    if (key !== prevKey) {
      raw.push({ key, month: dt.getMonth(), wi })
      prevKey = key
    }
  })

  // Drop any label whose next sibling is less than 2 columns away (collision guard)
  const MIN_GAP = 2
  return raw
    .filter((label, i) => {
      const next = raw[i + 1]
      return !(next && next.wi - label.wi < MIN_GAP)
    })
    .map(({ key, month, wi }) => ({ key, month, x: LEFT_OFFSET + wi * STEP }))
}

// ─── Constants ────────────────────────────────────────────────────────────────
const CELL        = 13
const GAP         = 3
const STEP        = CELL + GAP
const LEFT_OFFSET = 28
const TOP_OFFSET  = 20

// ─── Component ────────────────────────────────────────────────────────────────
export default function ContributionGraph() {
  const [data, setData]       = useState(null)
  const [error, setError]     = useState(null)
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 })
  const scrollRef             = useRef(null)

  useEffect(() => {
    getContributions()
      .then(setData)
      .catch(() => setError('Could not load contribution data.'))
  }, [])

  // Scroll to most recent (rightmost) weeks on load
  useEffect(() => {
    if (data && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
    }
  }, [data])

  function handleMouseEnter(e, day) {
    const r = e.currentTarget.getBoundingClientRect()
    setTooltip({
      visible: true,
      text: formatTooltip(day.date, day.contributionCount),
      x: r.left + r.width / 2,
      y: r.top,
    })
  }

  function handleMouseLeave() {
    setTooltip(t => ({ ...t, visible: false }))
  }

  if (error) return <p className="text-text-muted text-xs">{error}</p>

  if (!data) {
    return (
      <div>
        <div className="h-4 w-48 bg-bg-surface rounded mb-4 animate-pulse" />
        <svg width={LEFT_OFFSET + 52 * STEP} height={TOP_OFFSET + 7 * STEP} style={{ display: 'block' }}>
          {Array.from({ length: 52 }).map((_, wi) =>
            Array.from({ length: 7 }).map((_, di) => (
              <rect key={`sk-${wi}-${di}`}
                x={LEFT_OFFSET + wi * STEP} y={TOP_OFFSET + di * STEP}
                width={CELL} height={CELL} rx={2}
                fill="#161616" stroke="#262626" strokeWidth={0.5}
              />
            ))
          )}
        </svg>
      </div>
    )
  }

  const { totalContributions, weeks } = data
  const gridW       = weeks.length * STEP - GAP
  const gridH       = 7 * STEP - GAP
  const monthLabels = getMonthLabels(weeks, STEP, LEFT_OFFSET)

  return (
    <div className="w-full">
      <p className="text-text-primary text-sm mb-4">
        <span className="font-semibold">{totalContributions.toLocaleString()}</span>
        <span className="text-text-muted"> contributions in the last year</span>
      </p>

      <div ref={scrollRef} className="overflow-x-auto pb-1">
        <div style={{ width: LEFT_OFFSET + gridW }}>
          <svg
            width={LEFT_OFFSET + gridW}
            height={TOP_OFFSET + gridH}
            style={{ display: 'block', overflow: 'visible' }}
            aria-label={`GitHub contribution graph: ${totalContributions} contributions in the last year`}
          >
            {monthLabels.map(({ key, month, x }) => (
              <text key={key} x={x} y={12} fontSize={10} fill="#8a8a8a" fontFamily="'JetBrains Mono', monospace">
                {MONTH_NAMES[month]}
              </text>
            ))}

            {DAY_LABELS.map((label, i) =>
              label ? (
                <text key={`d-${i}`} x={0} y={TOP_OFFSET + i * STEP + CELL - 1} fontSize={10} fill="#8a8a8a" fontFamily="'JetBrains Mono', monospace">
                  {label}
                </text>
              ) : null
            )}

            {weeks.map((week, wi) =>
              week.contributionDays.map((day) => {
                const { bg, border } = getColor(day.contributionCount)
                const cx = LEFT_OFFSET + wi * STEP
                const cy = TOP_OFFSET + day.weekday * STEP
                return (
                  <rect
                    key={day.date}
                    x={cx} y={cy} width={CELL} height={CELL} rx={2} ry={2}
                    fill={bg} stroke={border} strokeWidth={0.5}
                    pointerEvents="all" style={{ cursor: 'default' }}
                    onMouseEnter={(e) => handleMouseEnter(e, day)}
                    onMouseLeave={handleMouseLeave}
                  />
                )
              })
            )}
          </svg>
        </div>
      </div>

      {tooltip.visible && createPortal(
        <div
          style={{ position: 'fixed', left: tooltip.x, top: tooltip.y - 8, transform: 'translate(-50%, -100%)', zIndex: 9999, pointerEvents: 'none' }}
          className="bg-bg-surface border border-border-subtle rounded px-2 py-1 text-text-muted text-xs whitespace-nowrap"
        >
          {tooltip.text}
        </div>,
        document.body
      )}
    </div>
  )
}
