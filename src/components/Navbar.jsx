import { useEffect, useState } from 'react'
import { NAV_LINKS } from '../data/nav.js'

export function Navbar({ onOpenConsult }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  function closeMenu() {
    setIsMenuOpen(false)
  }

  function handleConsultClick(event) {
    closeMenu()
    onOpenConsult(event)
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <a className="navbar__brand" href="#hero" onClick={closeMenu}>
          MAYERFELD
        </a>

        <button
          className={isMenuOpen ? 'navbar__toggle is-open' : 'navbar__toggle'}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="navbar__hamburger" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id="site-navigation"
          className={isMenuOpen ? 'navbar__nav is-open' : 'navbar__nav'}
          aria-label="Primary"
        >
          <ul className="navbar__list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                className="button button--primary navbar__consult"
                type="button"
                onClick={handleConsultClick}
              >
                Request Consultation
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
