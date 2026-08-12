import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home', exact: true },
  { to: '/experience', label: 'Work Experience' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/projects', label: 'Projects' },
  { to: '/links', label: 'Links' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e) => {
      if (!e.target.closest('#mobile-menu') && !e.target.closest('#menu-toggle')) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-accent underline underline-offset-4 decoration-accent transition-colors duration-150'
      : 'text-text-muted hover:text-text-primary transition-colors duration-150'

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      {/* Inner wrapper — matches page-wrapper alignment exactly */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 flex items-center justify-between pt-6">

        {/* Logo — left-aligned with content */}
        <Link
          to="/"
          className="text-text-primary text-lg font-semibold tracking-wide hover:text-accent transition-colors duration-150"
        >
          RS
        </Link>

        {/* Desktop nav — right-aligned with content */}
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          {NAV_LINKS.map(({ to, label, exact }) => (
            <NavLink key={to} to={to} end={exact} className={navLinkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <div className="sm:hidden">
          <button
            id="menu-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="text-text-muted hover:text-text-primary transition-colors duration-150 p-1"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile dropdown — aligned to the right edge of the content wrapper */}
      {menuOpen && (
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <div
            id="mobile-menu"
            className="sm:hidden mt-1 ml-auto w-fit bg-bg-surface border border-border-subtle rounded-md py-1 min-w-44 shadow-xl"
          >
            {NAV_LINKS.map(({ to, label, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                className={({ isActive }) =>
                  `block px-4 py-2.5 text-sm transition-colors duration-150 ${
                    isActive ? 'text-accent' : 'text-text-muted hover:text-text-primary'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
