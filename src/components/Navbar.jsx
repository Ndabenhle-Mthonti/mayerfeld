import { useState } from 'react'
import { NAV_LINKS } from '../data/nav.js'

export function Navbar({ onOpenConsult }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleNavClick() {
    setIsMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <a className="navbar__brand" href="#hero">
          Mayerfeld Consulting
        </a>

        <button
          className="navbar__toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>

        <nav
          id="site-navigation"
          className={isMenuOpen ? 'navbar__nav is-open' : 'navbar__nav'}
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={handleNavClick}>
              {link.label}
            </a>
          ))}
          <button
            className="button button--primary"
            type="button"
            onClick={() => {
              handleNavClick()
              onOpenConsult()
            }}
          >
            Request a consultation
          </button>
        </nav>
      </div>
    </header>
  )
}
