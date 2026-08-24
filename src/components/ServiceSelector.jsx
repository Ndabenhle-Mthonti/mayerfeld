import { BUSINESS_SIZES } from '../data/businessSizes.js'
import { DURATION_MAX, DURATION_MIN } from '../data/durations.js'
import { SERVICES } from '../data/services.js'

export function ServiceSelector({
  businessSize,
  selectedPillar,
  duration,
  onBusinessSizeChange,
  onSelectedPillarChange,
  onDurationChange,
}) {
  const durationLabel = duration === 1 ? '1 month' : `${duration} months`

  return (
    <section id="services" className="section" aria-labelledby="services-heading">
      <div className="container">
        <h2 id="services-heading">Consulting services</h2>
        <p className="section__intro">
          Choose a pillar, business size, and duration. The estimate below
          updates from these selections.
        </p>

        <div className="selector-stack">
          <fieldset className="selector-group">
            <legend>Consulting pillar</legend>
            <div className="service-selector">
              {SERVICES.map((service) => {
                const isSelected = service.id === selectedPillar

                return (
                  <button
                    key={service.id}
                    className={
                      isSelected
                        ? 'card service-selector__option is-selected'
                        : 'card service-selector__option'
                    }
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => onSelectedPillarChange(service.id)}
                  >
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <fieldset className="selector-group">
            <legend>Business size</legend>
            <div className="chip-row">
              {BUSINESS_SIZES.map((size) => {
                const isSelected = size.id === businessSize

                return (
                  <button
                    key={size.id}
                    className={isSelected ? 'chip is-selected' : 'chip'}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => onBusinessSizeChange(size.id)}
                  >
                    {size.name}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <fieldset className="selector-group">
            <legend>Engagement duration</legend>
            <div className="duration-control">
              <label htmlFor="engagement-duration">
                Length of engagement
              </label>
              <output htmlFor="engagement-duration" aria-live="polite">
                {durationLabel}
              </output>
              <input
                id="engagement-duration"
                type="range"
                min={DURATION_MIN}
                max={DURATION_MAX}
                step="1"
                value={duration}
                aria-valuemin={DURATION_MIN}
                aria-valuemax={DURATION_MAX}
                aria-valuenow={duration}
                aria-valuetext={durationLabel}
                onChange={(event) => {
                  const nextDuration = Number(event.target.value)
                  if (
                    Number.isInteger(nextDuration) &&
                    nextDuration >= DURATION_MIN &&
                    nextDuration <= DURATION_MAX
                  ) {
                    onDurationChange(nextDuration)
                  }
                }}
              />
              <div className="duration-control__bounds">
                <span>{DURATION_MIN} month</span>
                <span>{DURATION_MAX} months</span>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </section>
  )
}
