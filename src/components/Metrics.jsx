import { METRICS } from '../data/metrics.js'

export function Metrics() {
  return (
    <section className="metrics" aria-label="Practice snapshot">
      <div className="container">
        <dl className="metrics__list">
          {METRICS.map((metric) => (
            <div key={metric.id} className="metrics__item">
              <dt className="metrics__label">{metric.label}</dt>
              <dd className="metrics__value">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
