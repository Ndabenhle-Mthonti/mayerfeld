import { useState } from 'react'
import { SERVICES } from '../data/services.js'

export function ServiceSelector() {
  const [selectedServiceId, setSelectedServiceId] = useState(null)

  return (
    <section id="services" className="section" aria-labelledby="services-heading">
      <div className="section__inner">
        <h2 id="services-heading">Consulting services</h2>
        <p className="section__intro">
          Choose a challenge to frame the engagement. Estimation comes in a
          later phase.
        </p>

        <div className="service-selector">
          {SERVICES.map((service) => {
            const isSelected = service.id === selectedServiceId

            return (
              <button
                key={service.id}
                className={
                  isSelected
                    ? 'service-selector__option is-selected'
                    : 'service-selector__option'
                }
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedServiceId(service.id)}
              >
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
