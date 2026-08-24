export function Hero({ onOpenConsult }) {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-heading">
      <div className="container hero__inner">
        <p className="hero__eyebrow">South Africa · Client discovery</p>
        <h1 id="hero-heading">
          Mayerfeld Consulting helps South African businesses solve complex
          operational and growth challenges.
        </h1>
        <p className="hero__lede">
          Explore strategy, process optimisation, and market expansion, then
          request a conversation to scope a fit-for-purpose engagement.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#services">
            Explore Solutions
          </a>
          <button
            className="button button--secondary"
            type="button"
            onClick={onOpenConsult}
          >
            Request Consultation
          </button>
        </div>
      </div>
    </section>
  )
}
