import { useLanguage } from '../context/LanguageContext'
import { useReveal } from '../hooks/useReveal'

export default function About() {
  const { t, lang } = useLanguage()
  const [ref, inView] = useReveal()

  return (
    <section id="sobre-mi" className="section" ref={ref}>
      <style>{`
        #sobre-mi .about-grid {
          display: grid;
          grid-template-columns: minmax(0, 5fr) minmax(0, 4fr);
          gap: 6rem;
          align-items: flex-start;
        }
        @media (max-width: 1024px) {
          #sobre-mi .about-grid { grid-template-columns: 1fr; gap: 4rem; }
        }
        @media (max-width: 640px) {
          #sobre-mi .about-grid { gap: 3rem; }
        }
      `}</style>

      {/* Eyebrow */}
      <div className="eyebrow" style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.9s, transform 0.9s cubic-bezier(0.19,1,0.22,1)',
      }}>
        <span className="eyebrow-dot" />
        02 — {t.about.label}
      </div>

      <div className="about-grid">
        {/* LEFT — Headline + text */}
        <div style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s 0.1s cubic-bezier(0.19,1,0.22,1), transform 1s 0.1s cubic-bezier(0.19,1,0.22,1)',
        }}>
          <h2 className="display" style={{
            fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
            color: 'var(--fg)', marginBottom: '3rem',
            whiteSpace: 'pre-line',
          }}>
            {t.about.title}
          </h2>

          {[t.about.p1, t.about.p2, t.about.p3].map((p, i) => (
            <p key={i} style={{
              fontSize: 'clamp(0.95rem, 1.6vw, 1.02rem)',
              lineHeight: 1.8,
              color: i === 0 ? 'var(--fg)' : 'var(--fg-dim)',
              marginBottom: '1.5rem',
              maxWidth: '38rem',
            }}>{p}</p>
          ))}
        </div>

        {/* RIGHT — Spec sheet */}
        <div style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s 0.25s cubic-bezier(0.19,1,0.22,1), transform 1s 0.25s cubic-bezier(0.19,1,0.22,1)',
          paddingTop: '0.5rem',
        }}>
          {[
            { k: lang === 'es' ? 'Nombre' : 'Name', v: 'David Geo' },
            { k: 'Role', v: 'Full Stack Developer' },
            { k: 'Stack', v: 'React · Python · Dart' },
            { k: lang === 'es' ? 'Ubicación' : 'Based in', v: 'Bogotá, Colombia 🇨🇴' },
            { k: 'Email', v: 'david25geo@gmail.com', small: true },
            { k: lang === 'es' ? 'Estado' : 'Status', v: lang === 'es' ? '● Disponible' : '● Available', accent: true },
          ].map((row, i) => (
            <div key={row.k} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              padding: '1rem 0',
              borderBottom: '1px solid var(--line)',
              gap: '1.5rem',
              opacity: inView ? 1 : 0,
              transition: `opacity 0.8s ${0.3 + i * 0.06}s`,
            }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--fg-faint)', flexShrink: 0 }}>{row.k}</span>
              <span style={{
                fontSize: row.small ? '0.78rem' : '0.9rem',
                color: row.accent ? 'var(--accent)' : 'var(--fg)',
                fontWeight: row.accent ? 500 : 400,
                textAlign: 'right',
                wordBreak: 'break-all',
              }}>{row.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
