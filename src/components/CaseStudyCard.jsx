export function CaseStudyCard({ study }) {
  return (
    <article className="case-card">
      <p className="case-card__meta">
        {study.pillar} · {study.region}
      </p>
      <h3>{study.title}</h3>
      <p className="case-card__client">{study.anonymisedLabel}</p>
      <p>{study.outcome}</p>
    </article>
  )
}
