import { CASE_STUDIES } from '../data/caseStudies.js'
import { CaseStudyCard } from './CaseStudyCard.jsx'

export function CaseStudies() {
  return (
    <section id="cases" className="section" aria-labelledby="cases-heading">
      <div className="section__inner">
        <h2 id="cases-heading">Case studies</h2>
        <p className="section__intro">
          Anonymised scenarios that show how discovery work is framed. These
          are illustrative, not real client records.
        </p>
        <div className="case-grid">
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </section>
  )
}
