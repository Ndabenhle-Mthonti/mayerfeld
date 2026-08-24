import { useRef, useState } from 'react'
import { REGIONS } from '../data/regions.js'
import { submitConsultation } from '../utils/consultationApi.js'
import {
  CONSULTATION_FIELD_LIMITS,
  validateConsultationForm,
} from '../utils/validation.js'

const FIELD_ORDER = ['fullName', 'email', 'companyName', 'region', 'scope']

const INITIAL_VALUES = {
  fullName: '',
  email: '',
  companyName: '',
  region: '',
  scope: '',
}

function Field({ id, label, error, children }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="form-field__message--error">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function ConsultationForm({ onCancel, firstFieldRef }) {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const submitLockRef = useRef(false)

  const isSubmitting = status === 'submitting'

  function updateField(name, value) {
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)

    if (status === 'success' || status === 'error') {
      setStatus('idle')
      setStatusMessage('')
    }

    if (!errors[name]) {
      return
    }

    const { errors: nextErrors } = validateConsultationForm(nextValues)

    setErrors((current) => {
      if (nextErrors[name]) {
        return { ...current, [name]: nextErrors[name] }
      }

      const rest = { ...current }
      delete rest[name]
      return rest
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (isSubmitting || submitLockRef.current) {
      return
    }

    const { isValid, errors: nextErrors } = validateConsultationForm(values)
    setErrors(nextErrors)

    if (!isValid) {
      const firstInvalid = FIELD_ORDER.find((name) => nextErrors[name])
      const field = event.currentTarget.elements.namedItem(firstInvalid)
      if (field && typeof field.focus === 'function') {
        field.focus()
      }
      return
    }

    submitLockRef.current = true
    setStatus('submitting')
    setStatusMessage('')

    try {
      const result = await submitConsultation(values)
      const referenceId =
        result && typeof result.referenceId === 'string' ? result.referenceId : ''

      setValues(INITIAL_VALUES)
      setErrors({})
      setStatus('success')
      setStatusMessage(
        referenceId
          ? `Thank you. Your consultation request has been received (reference ${referenceId}).`
          : 'Thank you. Your consultation request has been received.',
      )
    } catch (error) {
      setStatus('error')
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Unable to send your request. Please try again.',
      )
    } finally {
      submitLockRef.current = false
    }
  }

  return (
    <form
      className="consult-form"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
    >
      {status === 'success' ? (
        <p className="form-banner form-banner--success" role="status">
          {statusMessage}
        </p>
      ) : null}

      {status === 'error' ? (
        <p className="form-banner form-banner--error" role="alert">
          {statusMessage}
        </p>
      ) : null}

      <Field id="fullName" label="Full Name" error={errors.fullName}>
        <input
          ref={firstFieldRef}
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          value={values.fullName}
          maxLength={CONSULTATION_FIELD_LIMITS.fullName}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          onChange={(event) => updateField('fullName', event.target.value)}
        />
      </Field>

      <Field id="email" label="Business Email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          maxLength={CONSULTATION_FIELD_LIMITS.email}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          onChange={(event) => updateField('email', event.target.value)}
        />
      </Field>

      <Field id="companyName" label="Company Name" error={errors.companyName}>
        <input
          id="companyName"
          name="companyName"
          type="text"
          autoComplete="organization"
          value={values.companyName}
          maxLength={CONSULTATION_FIELD_LIMITS.companyName}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.companyName)}
          aria-describedby={errors.companyName ? 'companyName-error' : undefined}
          onChange={(event) => updateField('companyName', event.target.value)}
        />
      </Field>

      <Field id="region" label="Region" error={errors.region}>
        <select
          id="region"
          name="region"
          value={values.region}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.region)}
          aria-describedby={errors.region ? 'region-error' : undefined}
          onChange={(event) => updateField('region', event.target.value)}
        >
          <option value="" disabled>
            Select a region
          </option>
          {REGIONS.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
      </Field>

      <Field id="scope" label="Scope Summary" error={errors.scope}>
        <textarea
          id="scope"
          name="scope"
          rows="4"
          value={values.scope}
          maxLength={CONSULTATION_FIELD_LIMITS.scope}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.scope)}
          aria-describedby={errors.scope ? 'scope-error' : undefined}
          onChange={(event) => updateField('scope', event.target.value)}
        />
      </Field>

      <div className="consult-form__actions">
        <button
          className="button button--primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Send request'}
        </button>
        <button
          className="button button--ghost"
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
