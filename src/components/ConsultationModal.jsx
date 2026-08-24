import { useEffect } from 'react'
import { ConsultationForm } from './ConsultationForm.jsx'

export function ConsultationModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
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
        <ConsultationForm onCancel={onClose} />
      </div>
    </div>
  )
}
