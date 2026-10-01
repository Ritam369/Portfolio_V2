import { useEffect, useState } from 'react'
import ScrollDots from '../components/home/ScrollDots.jsx'
import HeroSection from '../components/home/HeroSection.jsx'
import FeaturedProjects from '../components/home/FeaturedProjects.jsx'
import ContributionsSection from '../components/home/ContributionsSection.jsx'
import FeaturedBlogs from '../components/home/FeaturedBlogs.jsx'
import NpmPackages from '../components/home/NpmPackages.jsx'

// Section order: change the JSX order below to reorder the home page.
const SECTION_COUNT = 5

// ScrollToTop — appears once 25% of the page height has been scrolled past.
// Fixed bottom-right, Home page only.
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      const scrolled    = window.scrollY
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setVisible(totalHeight > 0 && scrolled / totalHeight >= 0.25)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 w-9 h-9 flex items-center justify-center
                  rounded-md border border-border-subtle bg-bg-surface
                  text-text-muted hover:text-accent hover:border-accent
                  transition-all duration-300
                  ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    document.title = "Ritam Saha"
  }, [])

  // Scroll spy — tracks whichever section's center is closest to viewport center.
  useEffect(() => {
    function onScroll() {
      const mid = window.innerHeight / 2
      let closest = 0
      let closestDist = Infinity
      for (let i = 0; i < SECTION_COUNT; i++) {
        const el = document.getElementById(`section-${i}`)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const dist = Math.abs(rect.top + rect.height / 2 - mid)
        if (dist < closestDist) { closestDist = dist; closest = i }
      }
      setActiveSection(closest)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <ScrollDots count={SECTION_COUNT} activeIdx={activeSection} />
      <ScrollToTopButton />

      <main className="page-wrapper fade-in">
        <HeroSection          sectionIdx={0} />
        <FeaturedProjects     sectionIdx={1} />
        <ContributionsSection sectionIdx={2} />
        <NpmPackages          sectionIdx={3} />
        <FeaturedBlogs        sectionIdx={4} />
      </main>
    </>
  )
}
