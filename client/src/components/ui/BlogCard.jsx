// BlogCard — a list-style row with date, title, and external link.
// Props: { title, url, publishedDate, excerpt }

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function BlogCard({ title, url, publishedDate, excerpt }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-6 py-4 border-b border-border-subtle last:border-b-0 group hover:opacity-90 transition-opacity duration-150"
    >
      <time
        dateTime={publishedDate}
        className="text-text-muted text-sm shrink-0 w-28 pt-0.5"
      >
        {formatDate(publishedDate)}
      </time>

      <div className="flex-1 min-w-0">
        <p className="text-text-primary text-sm group-hover:text-accent transition-colors duration-150 leading-snug">
          {title}
        </p>
        {excerpt && (
          <p className="text-text-muted text-xs mt-1 leading-relaxed line-clamp-2">{excerpt}</p>
        )}
      </div>
    </a>
  )
}
