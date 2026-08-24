import { useEffect, useRef } from 'react'
import { ConsultationForm } from './ConsultationForm.jsx'

function getFocusableElements(container) {
  if (!container) {
    return []
  }

  return [
    ...container.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ]
}

export function ConsultationModal({ isOpen, onClose, returnFocusRef }) {
  const dialogRef = useRef(null)
  const firstFieldRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const trigger = returnFocusRef?.current
    document.body.style.overflow = 'hidden'
    firstFieldRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusable = getFocusableElements(dialogRef.current)
      if (focusable.length === 0) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      if (trigger && typeof trigger.focus === 'function' && document.contains(trigger)) {
        trigger.focus()
      }
    }
  }, [isOpen, onClose, returnFocusRef])

  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-heading"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal__header">
          <h2 id="consult-heading">Request a consultation</h2>
          <button
            className="modal__close"
            type="button"
            aria-label="Close consultation form"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <ConsultationForm onCancel={onClose} firstFieldRef={firstFieldRef} />
      </div>
    </div>
  )
}
