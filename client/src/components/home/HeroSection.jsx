import { Link } from 'react-router-dom'
import { useTypingEffect } from '../../hooks/useTypingEffect.js'

// HeroSection — name, tagline, bio, quick links.
// Props: { sectionIdx: number }

export default function HeroSection({ sectionIdx }) {
  const { displayed: typedName, done: typingDone } = useTypingEffect('Ritam', 100)

  return (
    <section id={`section-${sectionIdx}`} data-section={sectionIdx} className="pt-2 pb-14">
      <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-3 tracking-tight">
        {typedName}
        <span
          className={`inline-block w-0.5 h-9 sm:h-11 bg-accent align-middle ml-1 ${
            typingDone ? 'animate-[blink_1s_step-end_infinite]' : 'opacity-100'
          }`}
        />
      </h1>

      <p className="text-text-muted text-sm mb-8">
        Building for the web, learning every layer, shipping what matters.
      </p>

      <div className="space-y-3 text-sm leading-relaxed mb-8">
        <p className="text-text-primary">
          Hi, I'm Ritam Saha. I'm a CS student and full-stack web developer.
        </p>
        <p className="text-text-primary">
          Currently interning at{' '}
          <span className="text-accent font-medium">Omnivera Technologies Pvt Ltd</span>
          , where I work across the full stack — building and shipping features with React and Node.js.
        </p>
        <p className="text-text-muted">
          I write about what I learn and build on my{' '}
          <a href="https://ritamsahablogs.dev" target="_blank" rel="noopener noreferrer" className="link-accent">
            blog
          </a>
          {' '}and shitpost on{' '}
          <a href="https://x.com/saharitam963" target="_blank" rel="noopener noreferrer" className="link-accent">
            X
          </a>
          . Check out my work below or grab my{' '}
          <a href="https://drive.google.com/file/d/1g48TUxRhY5JNVjtP-5Y718Ye1mmgzqnI/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="link-accent">
            resume
          </a>
          .
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/links"
          className="text-xs text-accent hover:text-accent-hover transition-colors duration-150"
        >
          All links →
        </Link>
      </div>
    </section>
  )
}
