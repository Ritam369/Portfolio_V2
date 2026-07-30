// ExperienceItem — renders a single work experience entry.
// Props: { company, role, startDate, endDate, current, description, tech }

function formatMonthYear(dateStr) {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  const d = new Date(parseInt(year), parseInt(month) - 1)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function ExperienceItem({ company, role, startDate, endDate, current, description, tech = [] }) {
  const start = formatMonthYear(startDate)
  const end = current ? 'Present' : formatMonthYear(endDate)

  return (
    <article className="border-b border-border-subtle pb-8 last:border-b-0 last:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
        <div>
          <h3 className="text-text-primary hover:text-accent-hover text-sm font-semibold">{company}</h3>
          <p className="text-text-muted text-sm">{role}</p>
        </div>
        <span className="text-text-muted text-xs shrink-0 sm:text-right">
          {start} — {end}
          {current && (
            <span className="ml-2 text-accent text-xs border border-accent/30 rounded px-1.5 py-0.5">
              current
            </span>
          )}
        </span>
      </div>

      {description && (
        <p className="text-text-muted text-sm leading-relaxed mb-3">{description}</p>
      )}

      {tech.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      )}
    </article>
  )
}
