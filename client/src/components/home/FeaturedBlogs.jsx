import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BlogCard from '../ui/BlogCard.jsx'
import { getBlogs } from '../../lib/api.js'

// FeaturedBlogs — "Things I've written" section for the Home page.
// Shows only featured:true blogs + "Show N more" link if non-featured exist.
// Props: { sectionIdx: number }

export default function FeaturedBlogs({ sectionIdx }) {
  const [featured, setFeatured] = useState([])
  const [totalCount, setTotal]  = useState(0)

  useEffect(() => {
    getBlogs(false).then(setFeatured).catch(() => {})
    getBlogs(true).then((all) => setTotal(all.length)).catch(() => {})
  }, [])

  const showMoreCount = totalCount - featured.length

  return (
    <section id={`section-${sectionIdx}`} data-section={sectionIdx}>
      <div className="flex items-center justify-between mb-6">
        <span className="section-header">Things I've written</span>
        <Link to="/blogs" className="text-xs text-text-muted hover:text-accent transition-colors duration-150">
          All posts →
        </Link>
      </div>

      {featured.length === 0 ? (
        <p className="text-text-muted text-sm">Loading posts…</p>
      ) : (
        <div>
          {featured.map((b) => (
            <BlogCard key={b.id} {...b} />
          ))}
        </div>
      )}

      {showMoreCount > 0 && (
        <Link
          to="/blogs"
          className="block mt-4 text-center text-sm text-accent hover:text-accent-hover transition-colors duration-150"
        >
          Show {showMoreCount} more →
        </Link>
      )}
    </section>
  )
}
