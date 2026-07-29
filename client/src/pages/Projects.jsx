import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard.jsx'
import { getProjects } from '../lib/api.js'

const PAGE_SIZE = 6

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Projects — Ritam Saha'
    getProjects()
      .then(setProjects)
      .catch(() => setError('Failed to load projects.'))
  }, [])

  const shown = projects.slice(0, visible)
  const remaining = projects.length - visible

  return (
    <main className="page-wrapper fade-in">
      {/* Breadcrumb */}
      <nav className="text-text-muted text-sm mb-6" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-text-primary transition-colors duration-150">
          Ritam
        </Link>
        <span className="mx-2">›</span>
        <span className="text-text-primary">Projects</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 tracking-tight">
        Projects
      </h1>
      <p className="text-text-muted text-sm mb-10">
        Things I've built — side projects, college projects, and experiments.
      </p>

      {error && <p className="text-text-muted text-sm">{error}</p>}

      {!error && projects.length === 0 && (
        <p className="text-text-muted text-sm">Loading…</p>
      )}

      {shown.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {shown.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>
      )}

      {/* Show more */}
      {remaining > 0 && (
        <button
          onClick={() => setVisible((v) => v + PAGE_SIZE)}
          className="mt-8 block mx-auto text-sm text-accent hover:text-accent-hover transition-colors duration-150"
        >
          Show {Math.min(remaining, PAGE_SIZE)} more →
        </button>
      )}
    </main>
  )
}
