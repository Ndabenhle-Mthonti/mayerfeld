export function CaseStudyCard({
  heading,
  category,
  challenge,
  solution,
  outcome,
  metric,
}) {
  return (
    <article className="card case-card">
      <p className="case-card__category">{category}</p>
      <h3>{heading}</h3>

      <p>
        <span className="case-card__label">Challenge</span>
        {challenge}
      </p>
      <p>
        <span className="case-card__label">Solution</span>
        {solution}
      </p>
      <p>
        <span className="case-card__label">Outcome</span>
        {outcome}
      </p>
      <p className="case-card__metric">
        <span className="case-card__label">Metric</span>
        {metric}
      </p>
    </article>
  )
}
