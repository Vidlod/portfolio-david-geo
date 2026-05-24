import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const { t, lang, toggle } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
    { label: t.nav.about, href: '#sobre-mi' },
    { label: t.nav.services, href: '#servicios' },
    { label: t.nav.projects, href: '#proyectos' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.contact, href: '#contacto' },
  ]

  return (
    <>
      <style>{`
        .nav-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 70;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.75rem 2.5rem;
          transition: padding 0.5s cubic-bezier(0.19,1,0.22,1),
                      background 0.5s,
                      border-color 0.5s;
          border-bottom: 1px solid transparent;
          animation: fadeIn 0.6s ease;
        }
        .nav-header.scrolled {
          padding: 1.1rem 2.5rem;
          background: rgba(14,14,14,0.72);
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
          border-color: var(--line);
        }
        .nav-logo {
          font-family: var(--display);
          font-weight: 500;
          font-size: 1.2rem;
          color: var(--fg);
          display: flex;
          align-items: baseline;
          gap: 0.2rem;
          letter-spacing: -0.02em;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-links {
          display: flex;
          gap: 2.5rem;
          align-items: center;
        }
        .nav-link {
          font-family: var(--sans);
          font-size: 0.88rem;
          font-weight: 400;
          color: var(--fg-dim);
          text-decoration: none;
          transition: color 0.3s;
          /* minimum touch target */
          padding: 0.5rem 0;
        }
        .nav-link:hover { color: var(--fg); }
        .nav-right {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .lang-toggle {
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: var(--sans);
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--fg-dim);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem;
          /* 44px touch target */
          min-height: 44px;
        }
        .burger {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          padding: 0.5rem;
          /* 44px touch target */
          min-width: 44px;
          min-height: 44px;
          align-items: center;
        }
        .burger span {
          width: 22px;
          height: 1px;
          background: var(--fg);
          display: block;
          transition: transform 0.35s, opacity 0.25s;
        }

        /* Mobile panel */
        .mobile-panel {
          display: none;
          position: fixed;
          inset: 0;
          background: var(--bg);
          z-index: 65;
          flex-direction: column;
          justify-content: center;
          padding: 2rem 2rem 4rem;
          overflow-y: auto;
        }
        .mobile-panel.open { display: flex; }
        .mobile-nav-link {
          font-family: var(--display);
          font-weight: 400;
          font-variation-settings: "opsz" 144, "SOFT" 50;
          font-size: clamp(2rem, 10vw, 3.5rem);
          color: var(--fg);
          text-decoration: none;
          letter-spacing: -0.03em;
          line-height: 1.1;
          padding: 0.6rem 0;
          border-bottom: 1px solid var(--line);
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          transition: color 0.3s;
        }
        .mobile-nav-link:last-of-type { border-bottom: none; }
        .mobile-nav-link:hover { color: var(--fg-dim); }
        .mobile-nav-num {
          font-family: var(--sans);
          font-size: 0.72rem;
          color: var(--fg-faint);
          letter-spacing: 0.02em;
        }

        /* Breakpoints */
        @media (max-width: 860px) {
          .nav-links { display: none; }
          .burger { display: flex; }
        }
        @media (max-width: 640px) {
          .nav-header, .nav-header.scrolled { padding: 1.25rem 1.5rem; }
        }
      `}</style>

      <header className={`nav-header${scrolled ? ' scrolled' : ''}`}>
        <a href="#inicio" className="nav-logo">
          David Geo
          <span style={{
            width: '5px', height: '5px', borderRadius: '50%',
            background: 'var(--accent)', display: 'inline-block',
            transform: 'translateY(-2px)', flexShrink: 0,
          }} />
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          {links.map(link => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <button className="lang-toggle" onClick={toggle} aria-label="Toggle language">
            <span style={{ color: lang === 'es' ? 'var(--fg)' : 'var(--fg-faint)', transition: 'color 0.3s' }}>ES</span>
            <span style={{ color: 'var(--fg-faint)' }}>·</span>
            <span style={{ color: lang === 'en' ? 'var(--fg)' : 'var(--fg-faint)', transition: 'color 0.3s' }}>EN</span>
          </button>

          <button
            className="burger"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}>
            <span style={{ transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }} />
            <span style={{ opacity: open ? 0 : 1 }} />
            <span style={{ transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <nav className={`mobile-panel${open ? ' open' : ''}`} aria-label="Mobile navigation">
        <div style={{ marginBottom: '2rem', marginTop: '4rem' }}>
          {links.map((link, i) => (
            <a key={link.href} href={link.href}
              className="mobile-nav-link"
              onClick={() => setOpen(false)}
              style={{
                animation: open ? `fadeUp 0.5s ${0.04 * i}s ease forwards` : 'none',
                opacity: open ? 0 : 1,
              }}>
              {link.label}
              <span className="mobile-nav-num">0{i + 1}</span>
            </a>
          ))}
        </div>
        <div style={{
          marginTop: 'auto', paddingTop: '2rem',
          borderTop: '1px solid var(--line)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--fg-dim)' }}>david25geo@gmail.com</span>
          <button onClick={toggle} className="lang-toggle"
            style={{ minHeight: 'auto', padding: '0.5rem' }}>
            <span style={{ color: lang === 'es' ? 'var(--fg)' : 'var(--fg-faint)' }}>ES</span>
            <span style={{ color: 'var(--fg-faint)' }}>·</span>
            <span style={{ color: lang === 'en' ? 'var(--fg)' : 'var(--fg-faint)' }}>EN</span>
          </button>
        </div>
      </nav>
    </>
  )
}
