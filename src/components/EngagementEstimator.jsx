import { BUSINESS_SIZES } from '../data/businessSizes.js'
import { SERVICES } from '../data/services.js'
import { calculateEngagement } from '../utils/calculator.js'

function formatDuration(duration) {
  if (!Number.isInteger(duration)) {
    return 'Unavailable'
  }

  return duration === 1 ? '1 Month' : `${duration} Months`
}

function formatTeamSize(teamSize) {
  return teamSize === 1 ? '1 Consultant' : `${teamSize} Consultants`
}

export function EngagementEstimator({ businessSize, pillar, duration }) {
  const estimate = calculateEngagement({
    businessSize,
    pillar,
    duration,
  })
  const selectedService = SERVICES.find((service) => service.id === pillar)
  const selectedSize = BUSINESS_SIZES.find((size) => size.id === businessSize)

  const configuration = [
    {
      label: 'Business Size',
      value: selectedSize?.name ?? 'Unavailable',
    },
    {
      label: 'Service',
      value: selectedService?.title ?? 'Unavailable',
    },
    {
      label: 'Duration',
      value: formatDuration(duration),
    },
  ]

  return (
    <section
      id="how-it-works"
      className="section section--muted"
      aria-labelledby="estimator-heading"
    >
      <div className="container">
        <h2 id="estimator-heading">Estimated Engagement</h2>
        <p className="section__intro">
          Figures are mock assessment assumptions, not a live commercial quote.
        </p>

        <div className="estimator">
          {estimate ? (
            <div className="estimator__results" aria-live="polite">
              <article className="card estimator__stat">
                <h3>Engagement Hours</h3>
                <p>{estimate.totalHours}</p>
              </article>
              <article className="card estimator__stat">
                <h3>Recommended Team</h3>
                <p>{formatTeamSize(estimate.teamSize)}</p>
              </article>
              <article className="card estimator__stat">
                <h3>KPI Deliverables</h3>
                <p>{estimate.kpiCount}</p>
              </article>
            </div>
          ) : (
            <p className="card estimator__empty" role="status">
              This combination could not be estimated. Choose a valid business
              size, service, and duration between 1 and 6 months.
            </p>
          )}

          <dl className="card estimator__config">
            {configuration.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
