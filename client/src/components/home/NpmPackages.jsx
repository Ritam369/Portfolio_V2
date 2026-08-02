import { useEffect, useState } from 'react'
import NpmCard from '../ui/NpmCard.jsx'
import { getNpmPackages } from '../../lib/api.js'

// NpmPackages — "npm packages" section for the Home page.
// Props: { sectionIdx: number }

export default function NpmPackages({ sectionIdx }) {
  const [packages, setPackages] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getNpmPackages()
      .then(setPackages)
      .catch(() => setError('Could not load packages.'))
  }, [])

  return (
    <section id={`section-${sectionIdx}`} data-section={sectionIdx} className="pb-16">
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

      {packages.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 items-stretch">
          {packages.map((pkg) => (
            <NpmCard key={pkg.id} {...pkg} />
          ))}
        </div>
      )}
    </section>
  )
}
