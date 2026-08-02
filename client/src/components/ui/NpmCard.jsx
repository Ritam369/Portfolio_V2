import { useState } from 'react'

// NpmCard — displays a single published npm package.
// Props: { id, name, description, installCmd, npmUrl, githubUrl }

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy install command"
      className="absolute right-2.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100
                 transition-opacity duration-150 text-text-muted hover:text-accent"
    >
      {copied ? (
        // Checkmark
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        // Copy icon
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
    </button>
  )
}

export default function NpmCard({ id, name, description, installCmd, npmUrl, githubUrl }) {
  return (
    <article className="flex flex-col h-full border border-border-subtle rounded-md p-5 bg-bg-surface hover:border-[#3a3a3a] transition-colors duration-150">
      {/* Content — grows to fill available space */}
      <div className="flex-1">
        {/* Index + name */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-text-muted text-xs font-mono">#{id}</span>
          <h3 className="text-text-primary text-sm font-semibold">{name}</h3>
        </div>

        {/* Description */}
        <p className="text-text-muted text-sm leading-relaxed mb-4">{description}</p>

        {/* Install command box — terminal-style, copy button on hover */}
        <div className="relative group mb-4">
          <div className="flex items-center gap-2 bg-bg-primary border border-border-subtle rounded px-3 py-2 font-mono text-xs">
            <span className="text-accent select-none">$</span>
            <span className="text-text-primary">{installCmd}</span>
          </div>
          <CopyButton text={installCmd} />
        </div>
      </div>

      {/* Links — mt-auto pins these to the bottom-left no matter what's above */}
      <div className="flex items-center gap-4 text-xs mt-auto pt-1">
        {npmUrl && (
          <a
            href={npmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover transition-colors duration-150 flex items-center gap-1.5"
          >
            {/* npm icon — simplified circle with "n" feel */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M0 0h24v24H0V0zm19.2 19.2V4.8H4.8v14.4h7.2v-9.6h2.4v9.6h4.8z" />
            </svg>
            npm
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-primary transition-colors duration-150 flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            GitHub
          </a>
        )}
      </div>
    </article>
  )
}
