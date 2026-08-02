import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import Experience from './pages/Experience.jsx'
import Blogs from './pages/Blogs.jsx'
import Projects from './pages/Projects.jsx'
import Links from './pages/Links.jsx'

function NotFound() {
  useEffect(() => {
    document.title = '404 — Ritam Saha'
  }, [])

  return (
    <main className="page-wrapper fade-in flex flex-col items-start justify-center min-h-[60vh]">
      <p className="text-text-muted text-xs mb-3 tracking-widest uppercase">404</p>
      <h1 className="text-3xl font-bold text-text-primary mb-3">Page not found.</h1>
      <p className="text-text-muted text-sm mb-6">
        That route doesn't exist. You may have followed a broken link.
      </p>
      <Link
        to="/"
        className="text-sm text-accent hover:text-accent-hover transition-colors duration-150"
      >
        ← Back to Home
      </Link>
    </main>
  )
}

// Scrolls to top on every route change.
// Uses 'instant' to bypass smooth-scroll CSS and fires after paint
// so it always wins over any in-page scroll restoration.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // requestAnimationFrame ensures this runs after the new page renders,
    // preventing the IntersectionObserver on Home from fighting the scroll.
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <div className="min-h-screen pt-16 sm:pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/links" element={<Links />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}
