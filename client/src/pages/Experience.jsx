import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ExperienceItem from '../components/ExperienceItem.jsx'
import { getExperience } from '../lib/api.js'

export default function Experience() {
  const [experience, setExperience] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Work Experience — Ritam Saha'
    getExperience()
      .then(setExperience)
      .catch(() => setError('Failed to load experience.'))
  }, [])

  return (
    <main className="page-wrapper fade-in">
      {/* Breadcrumb */}
      <nav className="text-text-muted text-sm mb-6" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-text-primary transition-colors duration-150">
          Ritam
        </Link>
        <span className="mx-2">›</span>
        <span className="text-text-primary">Work Experience</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 tracking-tight">
        Work Experience
      </h1>
      <p className="text-text-muted text-sm mb-10">
        Places I've worked, what I built there, and what I learned.
      </p>

      {error && <p className="text-text-muted text-sm">{error}</p>}

      {!error && experience.length === 0 && (
        <p className="text-text-muted text-sm">Loading…</p>
      )}

      {experience.length > 0 && (
        <div className="space-y-8">
          {experience.map((item) => (
            <ExperienceItem key={item.id} {...item} />
          ))}
        </div>
      )}
    </main>
  )
}
