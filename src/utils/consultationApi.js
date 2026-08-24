const MIN_DELAY_MS = 1000
const MAX_DELAY_MS = 1500

function getDelayMs() {
  return MIN_DELAY_MS + Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS + 1))
}

function shouldSimulateFailure(formData) {
  const email = String(formData?.email ?? '').trim().toLowerCase()
  return email.includes('fail@')
}

function createReferenceId() {
  return `MF-${Date.now().toString(36).toUpperCase()}`
}

/**
 * Simulated consultation desk. No network request is made.
 *
 * Later this module can be swapped for:
 *   fetch("/api/consultations", { method: "POST", headers, body })
 *
 * Use an email containing "fail@" to exercise the error path.
 * Form values are not logged.
 */
export function submitConsultation(formData) {
  return new Promise((resolve, reject) => {
    globalThis.setTimeout(() => {
      try {
        if (shouldSimulateFailure(formData)) {
          reject(new Error('Unable to send your request. Please try again.'))
          return
        }

        resolve({
          ok: true,
          referenceId: createReferenceId(),
        })
      } catch {
        reject(new Error('Unable to send your request. Please try again.'))
      }
    }, getDelayMs())
  })
}
