import { REGIONS } from '../data/regions.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_NAME_LENGTH = 2
const REGION_IDS = new Set(REGIONS.map((region) => region.id))
const MAX_LENGTHS = {
  fullName: 80,
  email: 254,
  companyName: 120,
  scope: 1000,
}

function readTrimmed(value) {
  return typeof value === 'string' ? value.trim() : ''
}

/**
 * Client-side consultation checks for the assessment form.
 * Returns messages only — no DOM updates and no React. Never throws.
 */
export function validateConsultationForm(formData) {
  const errors = {}
  const data = formData && typeof formData === 'object' ? formData : {}
  const fullName = readTrimmed(data.fullName)
  const email = readTrimmed(data.email)
  const companyName = readTrimmed(data.companyName)
  const region = readTrimmed(data.region)
  const scope = readTrimmed(data.scope)

  if (!fullName) {
    errors.fullName = 'Please enter your full name.'
  } else if (fullName.length < MIN_NAME_LENGTH) {
    errors.fullName = `Please enter a name of at least ${MIN_NAME_LENGTH} characters.`
  } else if (fullName.length > MAX_LENGTHS.fullName) {
    errors.fullName = `Please enter a name of at most ${MAX_LENGTHS.fullName} characters.`
  }

  if (!email) {
    errors.email = 'Please enter a business email.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid business email.'
  } else if (email.length > MAX_LENGTHS.email) {
    errors.email = 'Please enter a shorter business email.'
  }

  if (!companyName) {
    errors.companyName = 'Please enter a company name.'
  } else if (companyName.length > MAX_LENGTHS.companyName) {
    errors.companyName = `Please enter a company name of at most ${MAX_LENGTHS.companyName} characters.`
  }

  if (!region) {
    errors.region = 'Please select a region.'
  } else if (!REGION_IDS.has(region)) {
    errors.region = 'Please select a valid region.'
  }

  if (!scope) {
    errors.scope = 'Please summarise the engagement scope.'
  } else if (scope.length > MAX_LENGTHS.scope) {
    errors.scope = `Please keep the scope summary to ${MAX_LENGTHS.scope} characters.`
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export const CONSULTATION_FIELD_LIMITS = MAX_LENGTHS
