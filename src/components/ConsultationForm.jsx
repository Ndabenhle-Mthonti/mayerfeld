import { REGIONS } from '../data/regions.js'

export function ConsultationForm({ onCancel }) {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <form className="consult-form" onSubmit={handleSubmit} noValidate>
      <div className="consult-form__field">
        <label htmlFor="fullName">Full name</label>
        <input id="fullName" name="fullName" type="text" autoComplete="name" />
      </div>

      <div className="consult-form__field">
        <label htmlFor="companyName">Company</label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          autoComplete="organization"
        />
      </div>

      <div className="consult-form__field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" />
      </div>

      <div className="consult-form__field">
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" />
      </div>

      <div className="consult-form__field">
        <label htmlFor="region">Region</label>
        <select id="region" name="region" defaultValue="">
          <option value="" disabled>
            Select a region
          </option>
          {REGIONS.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
      </div>

      <div className="consult-form__field">
        <label htmlFor="message">How can we help?</label>
        <textarea id="message" name="message" rows="4" />
      </div>

      <div className="consult-form__actions">
        <button className="button button--primary" type="submit">
          Send request
        </button>
        <button className="button button--ghost" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}
