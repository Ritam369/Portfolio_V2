import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BlogCard from '../components/BlogCard.jsx'
import { getBlogs } from '../lib/api.js'

export default function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Blogs — Ritam Saha'
    getBlogs()
      .then(setBlogs)
      .catch(() => setError('Failed to load posts.'))
  }, [])

  return (
    <main className="page-wrapper fade-in">
      {/* Breadcrumb */}
      <nav className="text-text-muted text-sm mb-6" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-text-primary transition-colors duration-150">
          Ritam
        </Link>
        <span className="mx-2">›</span>
        <span className="text-text-primary">Blogs</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-2 tracking-tight">
        Technical Blogs
      </h1>
      <p className="text-text-muted text-sm mb-2">
        Deep dives into web dev, systems, and things I'm learning while building.
      </p>

      {!error && blogs.length > 0 && (
        <p className="text-text-muted text-xs mb-8 flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
          </svg>
          {blogs.length} article{blogs.length !== 1 ? 's' : ''} published
        </p>
      )}

      {!blogs.length && !error && (
        <p className="text-text-muted text-sm mt-8">Loading…</p>
      )}

      {error && <p className="text-text-muted text-sm mt-8">{error}</p>}

      {blogs.length > 0 && (
        <div className="mt-6">
          {blogs.map((b) => (
            <BlogCard key={b.id} {...b} />
          ))}
        </div>
      )}

      {/* Footer CTA */}
      <div className="mt-12 pt-8 border-t border-border-subtle">
        <p className="text-text-muted text-sm mb-2">
          Want reactions and discussion? Head to the originals.
        </p>
        <a
          href="https://ritamsahablogs.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover transition-colors duration-150 text-sm flex items-center gap-1.5"
        >
          Visit my blog →
        </a>
      </div>
    </main>
  )
}
