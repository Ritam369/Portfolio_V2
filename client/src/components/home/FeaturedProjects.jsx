import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../ui/ProjectCard.jsx'
import { getProjects } from '../../lib/api.js'

// FeaturedProjects — "Things I've built" section for the Home page.
// Shows only featured:true projects + "Show N more" link if non-featured exist.
// Props: { sectionIdx: number }

export default function FeaturedProjects({ sectionIdx }) {
  const [featured, setFeatured]   = useState([])
  const [totalCount, setTotal]    = useState(0)

  useEffect(() => {
    getProjects(false).then(setFeatured).catch(() => {})
    getProjects(true).then((all) => setTotal(all.length)).catch(() => {})
  }, [])

  const showMoreCount = totalCount - featured.length

  return (
    <section id={`section-${sectionIdx}`} data-section={sectionIdx} className="pb-14">
      <div className="flex items-center justify-between mb-6">
        <span className="section-header">Things I've built</span>
        <Link to="/projects" className="text-xs text-text-muted hover:text-accent transition-colors duration-150">
          All projects →
        </Link>
      </div>

      {featured.length === 0 ? (
        <p className="text-text-muted text-sm">Loading projects…</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 items-stretch">
          {featured.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>
      )}

      {showMoreCount > 0 && (
        <Link
          to="/projects"
          className="block mt-8 text-center text-sm text-accent hover:text-accent-hover transition-colors duration-150"
        >
          Show {showMoreCount} more →
        </Link>
      )}
    </section>
  )
}
