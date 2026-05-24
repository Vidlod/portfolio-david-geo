import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t, lang } = useLanguage()

  return (
    <footer style={{ maxWidth: '80rem', margin: '0 auto', width: '100%' }}>
      <style>{`
        .footer-inner {
          border-top: 1px solid var(--line);
          padding: 4rem 2.5rem 2.5rem;
        }
        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 2rem;
          margin-bottom: 3.5rem;
        }
        .footer-links {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          align-items: flex-end;
        }
        .footer-link {
          font-size: 0.9rem;
          color: var(--fg-dim);
          font-family: var(--sans);
          transition: color 0.3s;
          position: relative;
          display: inline-block;
          padding-bottom: 2px;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: 0;
          width: 100%; height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right center;
          transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .footer-link:hover { color: var(--fg); }
        .footer-link:hover::after { transform: scaleX(1); transform-origin: left center; }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 2rem;
          border-top: 1px solid var(--line);
          font-size: 0.74rem;
          color: var(--fg-faint);
          letter-spacing: 0.01em;
        }
        @media (max-width: 640px) {
          .footer-inner { padding: 3rem 1.25rem 2rem; }
          .footer-top { flex-direction: column; align-items: flex-start; gap: 2rem; }
          .footer-links { gap: 1.25rem; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
        }
      `}</style>

      <div className="footer-inner">
        <div className="footer-top">
          {/* Name + status */}
          <div>
            <p style={{
              fontFamily: 'var(--display)', fontWeight: 500, fontSize: '1.35rem',
              color: 'var(--fg)', marginBottom: '0.6rem',
              letterSpacing: '-0.025em',
            }}>
              David Geo<span style={{ color: 'var(--accent)' }}>.</span>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: 'var(--accent)',
                animation: 'pulse 2.4s ease-in-out infinite',
                flexShrink: 0,
              }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--fg-dim)' }}>
                {lang === 'es' ? 'Disponible para nuevos proyectos' : 'Available for new projects'}
              </span>
            </div>
          </div>

          {/* External links */}
          <div className="footer-links">
            {[
              { label: 'Email', href: 'mailto:david25geo@gmail.com' },
              { label: 'GitHub', href: 'https://github.com' },
              { label: 'LinkedIn', href: 'https://linkedin.com' },
            ].map(s => (
              <a key={s.label} href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="footer-link">
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t.footer.copy}</span>
          <span>{t.footer.made}</span>
        </div>
      </div>
    </footer>
  )
}
