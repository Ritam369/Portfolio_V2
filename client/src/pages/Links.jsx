import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LinkItem from '../components/LinkItem.jsx'
import { getLinks } from '../lib/api.js'

// Section labels match the reference screenshot — uppercase, accent color
const SECTION_ORDER = ['connect', 'professional', 'content']

export default function Links() {
  const [links, setLinks] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Links — Ritam Saha'
    getLinks()
      .then(setLinks)
      .catch(() => setError('Failed to load links.'))
  }, [])

  return (
    <main className="page-wrapper fade-in">
      {/* Centered profile header — mirrors reference screenshot */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-24 h-24 rounded-md border border-border-subtle mb-4 overflow-hidden">
          <img
            src="/OscarIsaac.jpeg"
            alt="RS"
            className="w-full h-full object-cover brightness-50 hover:brightness-100 transition-[filter] text-3xl font-bold select-none duration-500 ease-in-out"
          />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-1">Ritam Saha</h1>
        <p className="text-text-muted text-sm max-w-xs">
          Building for the web, learning every layer, shipping what matters.
        </p>
      </div>

      {error && <p className="text-text-muted text-sm text-center">{error}</p>}
      {!links && !error && <p className="text-text-muted text-sm text-center">Loading…</p>}

      {links && (
        <div className="max-w-lg mx-auto space-y-8">
          {SECTION_ORDER.filter((key) => links[key]?.length > 0).map((key) => (
            <section key={key}>
              <h2 className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
                {key}
              </h2>
              <div className="border border-border-subtle rounded-md bg-bg-surface overflow-hidden">
                {links[key].map((item) => (
                  <LinkItem key={item.label} {...item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-16 text-center space-y-2">
        <p className="text-text-muted text-xs">Made with intentional simplicity</p>
        <Link
          to="/"
          className="text-accent hover:text-accent-hover transition-colors duration-150 text-sm"
        >
          ← View Full Portfolio
        </Link>
      </div>
    </main>
  )
}
