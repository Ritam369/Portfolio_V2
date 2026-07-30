// ProjectCard — displays a single project.
// Uses flex-col + h-full so the links row always sits at the bottom-left
// regardless of how much title, description, or tech tags appear above it.
// Props: { title, description, techStack, liveUrl, repoUrl }

export default function ProjectCard({ title, description, techStack = [], liveUrl, repoUrl }) {
  return (
    <article className="flex flex-col h-full border border-border-subtle rounded-md p-5 bg-bg-surface hover:border-[#3a3a3a] transition-colors duration-150">
      {/* Content — grows to fill available space */}
      <div className="flex-1">
        <h3 className="text-text-primary text-sm font-semibold mb-2">{title}</h3>
        <p className="text-text-muted text-sm leading-relaxed mb-4">{description}</p>

        {/* Tech stack chips */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        )}
      </div>

      {/* Links — mt-auto pushes this to the bottom-left no matter what's above */}
      {(liveUrl || repoUrl) && (
        <div className="flex items-center gap-4 text-xs mt-auto pt-1">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover transition-colors duration-150 flex items-center gap-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15,3 21,3 21,9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary transition-colors duration-150 flex items-center gap-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              Repo
            </a>
          )}
        </div>
      )}
    </article>
  )
}
