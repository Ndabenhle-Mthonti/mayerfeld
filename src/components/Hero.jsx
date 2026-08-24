export function Hero({ onOpenConsult }) {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-heading">
      <div className="hero__inner">
        <p className="hero__eyebrow">South Africa · SADC</p>
        <h1 id="hero-heading">Client Discovery Dashboard</h1>
        <p className="hero__lede">
          Explore Mayerfeld consulting engagements across strategy, process
          optimization, and market expansion — then request a conversation
          with the team.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#services">
            Explore services
          </a>
          <button
            className="button button--secondary"
            type="button"
            onClick={onOpenConsult}
          >
            Request a consultation
          </button>
        </div>
      </div>
    </section>
  )
}
