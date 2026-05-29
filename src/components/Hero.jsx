import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="inicio" style={{
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <style>{`
        .hero-inner {
          padding: 8rem 2.5rem 5rem;
          max-width: 80rem;
          margin: 0 auto;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.78rem;
          color: var(--fg-dim);
          margin-bottom: 4rem;
          animation: fadeUp 0.9s 0.1s ease forwards;
          opacity: 0;
        }
        .hero-h1 {
          font-size: clamp(3rem, 6.5vw, 6.5rem);
          margin-bottom: 2.5rem;
        }
        .hero-greeting {
          font-size: clamp(0.72rem, 1.1vw, 0.85rem);
          font-family: var(--sans);
          font-weight: 400;
          color: var(--fg-faint);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 1.1rem;
          display: block;
        }
        .hero-bottom-grid {
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
          gap: 4rem;
          align-items: flex-end;
          margin-top: 5rem;
        }
        .hero-meta-row {
          position: absolute;
          bottom: 2.5rem;
          left: 2.5rem;
          right: 2.5rem;
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          color: var(--fg-faint);
          letter-spacing: 0.02em;
          animation: fadeIn 1.5s 1.6s ease forwards;
          opacity: 0;
        }
        .hero-ctas {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          animation: fadeUp 1s 0.75s ease forwards;
          opacity: 0;
        }
        .hero-btn-primary {
          padding: 1rem 1.75rem;
          background-color: var(--fg);
          color: var(--bg);
          font-family: var(--sans);
          font-size: 0.88rem;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          transition: transform 0.4s cubic-bezier(0.19,1,0.22,1),
                      box-shadow 0.4s;
          cursor: pointer;
          border: none;
          text-decoration: none;
          white-space: nowrap;
        }
        .hero-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(237,234,227,0.15);
        }
        .hero-btn-secondary {
          padding: 1rem 1.75rem;
          background-color: transparent;
          color: var(--fg);
          border: 1px solid var(--line);
          font-family: var(--sans);
          font-size: 0.88rem;
          font-weight: 400;
          transition: border-color 0.35s, background-color 0.35s;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
        }
        .hero-btn-secondary:hover {
          border-color: var(--fg-dim);
        }
        @media (max-width: 1024px) {
          .hero-inner { padding: 7rem 2rem 5rem; }
          .hero-bottom-grid { grid-template-columns: 1fr; gap: 2.5rem; margin-top: 3.5rem; }
          .hero-meta-row { left: 2rem; right: 2rem; }
        }
        @media (max-width: 640px) {
          .hero-inner { padding: 6rem 1.25rem 4rem; }
          .hero-badge { margin-bottom: 2.5rem; }
          .hero-meta-row { left: 1.25rem; right: 1.25rem; display: none; }
          .hero-bottom-grid { margin-top: 2.5rem; gap: 2rem; }
        }
      `}</style>


      <div className="hero-inner">
        {/* Available badge */}
        <div className="hero-badge">
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: 'var(--accent)', flexShrink: 0,
            animation: 'pulse 2.4s ease-in-out infinite',
          }} />
          {t.hero.badge}
        </div>

        {/* Name — big, confident */}
        <h1 className="display hero-h1" style={{ color: 'var(--fg)' }}>
          <span className="hero-greeting" style={{
            animation: 'fadeUp 1.1s 0.25s cubic-bezier(0.19,1,0.22,1) forwards',
            opacity: 0,
          }}>
            {t.hero.greeting}
          </span>
          <span style={{
            display: 'block',
            fontWeight: 800,
            background: 'linear-gradient(90deg, #E8B984 0%, #EDEAE3 45%, #E8B984 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'fadeUp 1.1s 0.42s cubic-bezier(0.19,1,0.22,1) forwards, gradientFlow 5s 1.55s linear infinite',
            opacity: 0,
          }}>
            David Geo.
          </span>
        </h1>

        {/* Bottom two-col */}
        <div className="hero-bottom-grid">
          {/* Description */}
          <p style={{
            fontFamily: 'var(--sans)', fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            lineHeight: 1.65, color: 'var(--fg-dim)', maxWidth: '34rem',
            animation: 'fadeUp 1s 0.6s ease forwards', opacity: 0,
          }}>
            <span style={{ color: 'var(--fg)' }}>{t.hero.title}.</span>
            {' '}{t.hero.description}
          </p>

          {/* CTAs */}
          <div className="hero-ctas">
            <a href="#proyectos" className="hero-btn-primary">
              {t.hero.cta1}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contacto" className="hero-btn-secondary">
              {t.hero.cta2}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom meta (hidden on mobile) */}
      <div className="hero-meta-row">
        <span>Bogotá, Colombia</span>
        <span>© 2026 — Independent</span>
      </div>
    </section>
  )
}
