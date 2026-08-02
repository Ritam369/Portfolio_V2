import { useEffect, useState } from 'react'
import ScrollDots from '../components/home/ScrollDots.jsx'
import HeroSection from '../components/home/HeroSection.jsx'
import FeaturedProjects from '../components/home/FeaturedProjects.jsx'
import ContributionsSection from '../components/home/ContributionsSection.jsx'
import FeaturedBlogs from '../components/home/FeaturedBlogs.jsx'
import NpmPackages from '../components/home/NpmPackages.jsx'

// Section order: change the JSX order below to reorder the home page.
const SECTION_COUNT = 5

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    document.title = "Ritam Saha"
  }, [])

  // Scroll spy — tracks whichever section's center is closest to viewport center.
  // Deterministic: always one winner, no threshold races, no skipping.
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
