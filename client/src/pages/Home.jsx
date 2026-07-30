import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import BlogCard from '../components/BlogCard.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
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

// Typing effect hook — types out the text once on mount, then holds with blinking cursor
function useTypingEffect(text, speedMs = 80) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, speedMs)
    return () => clearInterval(interval)
  }, [text, speedMs])

  return { displayed, done }
}

export default function Home() {
  const { displayed: typedName, done: typingDone } = useTypingEffect('Ritam', 100)

  // featuredBlogs — only featured:true, shown in this section
  const [featuredBlogs, setFeaturedBlogs] = useState([])
  // totalBlogsCount — total across ALL blogs (featured + non-featured) for "Show N more" math
  const [totalBlogsCount, setTotalBlogsCount] = useState(0)
  // featuredProjects — only featured:true, shown in this section
  const [featuredProjects, setFeaturedProjects] = useState([])
  // totalProjectsCount — all projects (featured + non-featured) for "Show N more" math
  const [totalProjectsCount, setTotalProjectsCount] = useState(0)
  const [activeSection, setActiveSection] = useState(0)

  const SECTIONS = ['hero', 'blogs', 'projects']

  useEffect(() => {
    document.title = "Ritam's Portfolio"
    // Fetch featured-only for display
    getBlogs(false).then(setFeaturedBlogs).catch(() => {})
    // Fetch all to know the total count for "Show N more"
    getBlogs(true).then((all) => setTotalBlogsCount(all.length)).catch(() => {})
    // Fetch featured-only projects for display
    getProjects(false).then(setFeaturedProjects).catch(() => {})
    // Fetch all projects to know the total count for "Show N more"
    getProjects(true).then((all) => setTotalProjectsCount(all.length)).catch(() => {})
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
  }, [featuredBlogs, featuredProjects])

  // "Show N more" = total blogs on /blogs page minus the featured ones shown here
  const showMoreCount = totalBlogsCount - featuredBlogs.length
  // "Show N more" = total projects on /projects page minus the featured ones shown here
  const showMoreProjectsCount = totalProjectsCount - featuredProjects.length

  return (
    <>
      <ScrollDots sections={SECTIONS} activeIdx={activeSection} />

      <main className="page-wrapper fade-in">
        {/* Hero */}
        <section id="section-0" data-section="0" className="pt-2 pb-14">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-3 tracking-tight">
            {typedName}
            {/* Cursor — blinks while typing, stays solid briefly then fades out */}
            <span
              className={`inline-block w-0.5 h-9 sm:h-11 bg-accent align-middle ml-1 ${
                typingDone ? 'animate-[blink_1s_step-end_infinite]' : 'opacity-100'
              }`}
            />
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
              <a href="https://x.com/saharitam963" target="_blank" rel="noopener noreferrer" className="link-accent">
                X
              </a>
              . Check out my work below or grab my{' '}
              <a href="https://drive.google.com/file/d/1g48TUxRhY5JNVjtP-5Y718Ye1mmgzqnI/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="link-accent">
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

        {/* Latest Writing — featured blogs only */}
        <section id="section-1" data-section="1" className="pb-14">
          <div className="flex items-center justify-between mb-6">
            <span className="section-header">Things I've written</span>
            <Link to="/blogs" className="text-xs text-text-muted hover:text-accent transition-colors duration-150">
              All posts →
            </Link>
          </div>

          {featuredBlogs.length === 0 ? (
            <p className="text-text-muted text-sm">Loading posts…</p>
          ) : (
            <div>
              {featuredBlogs.map((b) => (
                <BlogCard key={b.id} {...b} />
              ))}
            </div>
          )}

          {/* Show N more: count of non-featured blogs on the /blogs page */}
          {showMoreCount > 0 && (
            <Link
              to="/blogs"
              className="block mt-4 text-center text-sm text-accent hover:text-accent-hover transition-colors duration-150"
            >
              Show {showMoreCount} more →
            </Link>
          )}
        </section>

        {/* Things I've built — featured projects only */}
        <section id="section-2" data-section="2" className="pb-2">
          <div className="flex items-center justify-between mb-6">
            <span className="section-header">Things I've built</span>
            <Link to="/projects" className="text-xs text-text-muted hover:text-accent transition-colors duration-150">
              All projects →
            </Link>
          </div>

          {featuredProjects.length === 0 ? (
            <p className="text-text-muted text-sm">Loading projects…</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 items-stretch">
              {featuredProjects.map((p) => (
                <ProjectCard key={p.id} {...p} />
              ))}
            </div>
          )}

          {/* Show N more: count of non-featured projects on the /projects page */}
          {showMoreProjectsCount > 0 && (
            <Link
              to="/projects"
              className="block mt-8 text-center text-sm text-accent hover:text-accent-hover transition-colors duration-150"
            >
              Show {showMoreProjectsCount} more →
            </Link>
          )}
        </section>
      </main>
    </>
  )
}
