import { METRICS } from '../data/metrics.js'

export function Metrics() {
  return (
    <section className="metrics" aria-label="Practice snapshot">
      <ul className="metrics__list">
        {METRICS.map((metric) => (
          <li key={metric.id} className="metrics__item">
            <p className="metrics__value">{metric.value}</p>
            <p className="metrics__label">{metric.label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
