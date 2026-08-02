// ScrollDots — right-edge scroll position indicator for the Home page.
// Props: { count: number, activeIdx: number }

export default function ScrollDots({ count, activeIdx }) {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-40">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: 'smooth' })}
          aria-label={`Go to section ${i + 1}`}
          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
            i === activeIdx
              ? 'bg-accent scale-125'
              : 'bg-border-subtle hover:bg-text-muted'
          }`}
        />
      ))}
    </div>
  )
}
