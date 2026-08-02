import ContributionGraph from '../ui/ContributionGraph.jsx'

// ContributionsSection — GitHub activity graph section for the Home page.
// Props: { sectionIdx: number }

export default function ContributionsSection({ sectionIdx }) {
  return (
    <section id={`section-${sectionIdx}`} data-section={sectionIdx} className="pb-14">
      <div className="mb-2">
        <span className="section-header">Contributions</span>
      </div>
      {/* <p className="text-text-muted text-sm mb-6">My open-source activity over the past year.</p> */}
      <ContributionGraph />
    </section>
  )
}
