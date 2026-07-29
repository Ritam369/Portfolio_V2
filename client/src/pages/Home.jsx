import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import BlogCard from '../components/BlogCard.jsx'
import { getBlogs, getProjects } from '../lib/api.js'

// Right-edge scroll dots for Home page sections
function ScrollDots({ sections, activeIdx }) {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-40">
      {sections.map((_, i) => (
        <button
          key={i}
          onClick={() => document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: 'smooth' })}
          aria-label={`Go to section ${i + 1}`}
          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
            i === activeIdx ? 'bg-accent scale-125' : 'bg-border-subtle hover:bg-text-muted'
          }`}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const [blogs, setBlogs] = useState([])
  const [projects, setProjects] = useState([])
  const [activeSection, setActiveSection] = useState(0)

  const SECTIONS = ['hero', 'blogs', 'projects']

  useEffect(() => {
    document.title = "Ritam's Portfolio"
    getBlogs().then(setBlogs).catch(() => {})
    getProjects().then(setProjects).catch(() => {})
  }, [])

  // Scroll spy for right-edge dots
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.section)
            setActiveSection(idx)
          }
        })
      },
      { threshold: 0.4 },
    )
    SECTIONS.forEach((_, i) => {
      const el = document.getElementById(`section-${i}`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [blogs, projects])

  const latestBlog = blogs[0]
  const latestProject = projects[0]

  return (
    <>
      <ScrollDots sections={SECTIONS} activeIdx={activeSection} />

      <main className="page-wrapper fade-in">
        {/* Hero */}
        <section id="section-0" data-section="0" className="pt-2 pb-14">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-3 tracking-tight">
            Ritam
          </h1>
          <p className="text-text-muted text-sm mb-8">
            Building for the web, learning every layer, shipping what matters.
          </p>

          <div className="space-y-3 text-sm leading-relaxed mb-8">
            <p className="text-text-primary">
              Hi, I'm Ritam Saha. I'm a CS student and full-stack web developer.
            </p>
            <p className="text-text-primary">
              Currently interning at{' '}
              <span className="text-accent font-medium">Omnivera Technologies Pvt Ltd</span>
              , where I work across the full stack — building and shipping features with React and Node.js.
            </p>
            <p className="text-text-muted">
              I write about what I learn and build on my{' '}
              <a href="https://ritamsahablogs.dev" target="_blank" rel="noopener noreferrer" className="link-accent">
                blog
              </a>
              {' '}and shitpost on{' '}
              <a href="https://twitter.com/ritamsaha" target="_blank" rel="noopener noreferrer" className="link-accent">
                X
              </a>
              . Check out my work below or grab my{' '}
              <a href="/resume.pdf" className="link-accent">
                resume
              </a>
              .
            </p>
          </div>

          {/* Quick action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* <a
              href="/resume.pdf"
              className="text-xs border border-border-subtle text-text-muted hover:text-text-primary hover:border-[#3a3a3a] transition-colors duration-150 rounded px-3 py-1.5"
            >
              Resume
            </a>
            <a
              href="https://github.com/ritamsaha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs border border-border-subtle text-text-muted hover:text-text-primary hover:border-[#3a3a3a] transition-colors duration-150 rounded px-3 py-1.5"
            >
              GitHub
            </a> */}
            <Link
              to="/links"
              className="text-xs text-accent hover:text-accent-hover transition-colors duration-150"
            >
              All links →
            </Link>
          </div>
        </section>

        {/* Latest Writing */}
        <section id="section-1" data-section="1" className="pb-14">
          <div className="flex items-center justify-between mb-6">
            <span className="section-header">Things I've written</span>
            <Link to="/blogs" className="text-xs text-text-muted hover:text-accent transition-colors duration-150">
              All posts →
            </Link>
          </div>

          {blogs.length === 0 ? (
            <p className="text-text-muted text-sm">Loading posts…</p>
          ) : (
            <div>
              {blogs.slice(0, 5).map((b) => (
                <BlogCard key={b.id} {...b} />
              ))}
            </div>
          )}

          {blogs.length > 5 && (
            <Link
              to="/blogs"
              className="block mt-4 text-center text-sm text-accent hover:text-accent-hover transition-colors duration-150"
            >
              Show {blogs.length - 5} more →
            </Link>
          )}
        </section>

        {/* Latest Projects */}
        <section id="section-2" data-section="2" className="pb-14">
          <div className="flex items-center justify-between mb-6">
            <span className="section-header">Things I've built</span>
            <Link to="/projects" className="text-xs text-text-muted hover:text-accent transition-colors duration-150">
              All projects →
            </Link>
          </div>

          {projects.length === 0 ? (
            <p className="text-text-muted text-sm">Loading projects…</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {projects.slice(0, 2).map((p) => (
                <div
                  key={p.id}
                  className="border border-border-subtle rounded-md p-4 bg-bg-surface hover:border-[#3a3a3a] transition-colors duration-150"
                >
                  <h3 className="text-text-primary text-sm font-semibold mb-1">{p.title}</h3>
                  <p className="text-text-muted text-xs leading-relaxed line-clamp-2">{p.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  )
}
