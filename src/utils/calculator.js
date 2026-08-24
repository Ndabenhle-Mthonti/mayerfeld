import { DURATION_MAX, DURATION_MIN } from '../data/durations.js'
import { SERVICES } from '../data/services.js'

/**
 * Mock assessment calculator.
 *
 * Monthly hours are sample assumptions from the services catalogue,
 * not live Mayerfeld quotes or staffing models.
 *
 * Example baselines:
 * - Small: Strategy 40, Process Optimization 35, Market Expansion 45
 * - Medium: Strategy 70, Process Optimization 60, Market Expansion 80
 * - Large: Strategy 100, Process Optimization 90, Market Expansion 120
 *
 * Formulas (assessment-only):
 * - totalHours = baseMonthlyHours * duration
 * - teamSize = Math.ceil(totalHours / 80)
 * - kpiCount = Math.max(2, Math.ceil(duration * 1.5))
 *
 * Invalid or missing inputs return null. Never throws.
 */

const HOURS_PER_CONSULTANT = 80
const KPI_FACTOR = 1.5
const MIN_KPI_COUNT = 2

function findService(pillar) {
  if (typeof pillar !== 'string' || pillar.trim() === '') {
    return undefined
  }

  const key = pillar.trim().toLowerCase()

  return SERVICES.find(
    (service) =>
      service.id === key || service.pillar.toLowerCase() === key,
  )
}

function isValidDuration(duration) {
  return (
    Number.isInteger(duration) &&
    duration >= DURATION_MIN &&
    duration <= DURATION_MAX
  )
}

function isUsableResult({ totalHours, teamSize, kpiCount }) {
  return [totalHours, teamSize, kpiCount].every(
    (value) => Number.isFinite(value) && value > 0,
  )
}

export function calculateEngagement(input) {
  if (input == null || typeof input !== 'object') {
    return null
  }

  const { businessSize, pillar, duration } = input
  const service = findService(pillar)
  const sizeKey = typeof businessSize === 'string' ? businessSize : ''
  const monthlyHours = service?.baseHoursByBusinessSize?.[sizeKey]

  if (!Number.isFinite(monthlyHours) || monthlyHours <= 0 || !isValidDuration(duration)) {
    return null
  }

  const totalHours = monthlyHours * duration
  const result = {
    totalHours,
    teamSize: Math.ceil(totalHours / HOURS_PER_CONSULTANT),
    kpiCount: Math.max(MIN_KPI_COUNT, Math.ceil(duration * KPI_FACTOR)),
  }

  return isUsableResult(result) ? result : null
}
