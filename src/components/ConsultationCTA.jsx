export function ConsultationCTA({ onOpenConsult }) {
  return (
    <section id="contact" className="cta" aria-labelledby="cta-heading">
      <div className="container cta__inner">
        <h2 id="cta-heading">Ready to scope an engagement?</h2>
        <p>
          Share a little context and the team will follow up to discuss fit,
          timing, and next steps.
        </p>
        <button
          className="button button--primary"
          type="button"
          onClick={onOpenConsult}
        >
          Request a consultation
        </button>
      </div>
    </section>
  )
}
