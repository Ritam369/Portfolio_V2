import { useEffect, useState } from 'react'
import NpmCard from '../ui/NpmCard.jsx'
import { getNpmPackages } from '../../lib/api.js'

const DEFAULT_VISIBLE = 2

// NpmPackages — "npm packages" section for the Home page.
// Shows DEFAULT_VISIBLE cards by default with a "Show N more" toggle,
// and a "Show less" to collapse back. Count in header is always the total.
// Props: { sectionIdx: number }

export default function NpmPackages({ sectionIdx }) {
  const [packages, setPackages]   = useState([])
  const [expanded, setExpanded]   = useState(false)
  const [error, setError]         = useState(null)

  useEffect(() => {
    getNpmPackages()
      .then(setPackages)
      .catch(() => setError('Could not load packages.'))
  }, [])

  const visible   = expanded ? packages : packages.slice(0, DEFAULT_VISIBLE)
  const remaining = packages.length - DEFAULT_VISIBLE

  return (
    <section id={`section-${sectionIdx}`} data-section={sectionIdx} className="pb-16">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <span className="section-header">npm packages</span>
        {packages.length > 0 && (
          <span className="text-text-muted text-xs font-mono">({packages.length})</span>
        )}
      </div>
      <p className="text-text-muted text-sm mb-6">
        Open-source packages I've published to the npm registry.
      </p>

      {error && <p className="text-text-muted text-sm">{error}</p>}

      {!error && packages.length === 0 && (
        <p className="text-text-muted text-sm">Loading…</p>
      )}

      {visible.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 items-stretch">
          {visible.map((pkg) => (
            <NpmCard key={pkg.id} {...pkg} />
          ))}
        </div>
      )}

      {/* Show more / Show less toggle */}
      {packages.length > DEFAULT_VISIBLE && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="block mt-6 mx-auto text-sm text-accent hover:text-accent-hover transition-colors duration-150"
        >
          {expanded
            ? 'Show less ↑'
            : `Show ${remaining} more →`}
        </button>
      )}
    </section>
  )
}
