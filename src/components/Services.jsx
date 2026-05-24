import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useReveal } from '../hooks/useReveal'

function ServiceCard({ s, idx, inView, delay }) {
  const [h, setH] = useState(false)

  return (
    /* Outer wrapper handles reveal; inner handles hover */
    <div style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.9s ${delay}s cubic-bezier(0.19,1,0.22,1),
                   transform 0.9s ${delay}s cubic-bezier(0.19,1,0.22,1)`,
    }}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          padding: 'clamp(1.75rem, 3vw, 3rem) clamp(1.5rem, 2.5vw, 2.5rem)',
          backgroundColor: h ? 'var(--bg-soft)' : 'transparent',
          border: '1px solid var(--line)',
          borderColor: h ? 'rgba(237,234,227,0.2)' : 'var(--line)',
          transition: 'background 0.45s, border-color 0.45s, transform 0.45s, box-shadow 0.45s',
          transform: h ? 'translateY(-5px)' : 'translateY(0)',
          boxShadow: h ? '0 20px 60px rgba(0,0,0,0.35)' : 'none',
          height: '100%', cursor: 'default',
        }}>
        {/* Number */}
        <span style={{
          fontSize: '0.75rem', color: 'var(--fg-faint)',
          marginBottom: '3rem', display: 'block',
          letterSpacing: '0.02em',
        }}>0{idx + 1} / 03</span>

        {/* Title */}
        <h3 className="display" style={{
          fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
          color: 'var(--fg)', marginBottom: '1.25rem',
          transition: 'transform 0.45s',
          transform: h ? 'translateX(6px)' : 'translateX(0)',
        }}>
          {s.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: 'clamp(0.9rem, 1.5vw, 0.96rem)',
          lineHeight: 1.75, color: 'var(--fg-dim)', marginBottom: '2.5rem',
        }}>{s.desc}</p>

        {/* Arrow link */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.65rem',
          color: h ? 'var(--accent)' : 'var(--fg-faint)',
          fontSize: '0.82rem',
          transition: 'color 0.35s, gap 0.35s',
        }}>
          <span>{s.title}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            style={{ transition: 'transform 0.45s', transform: h ? 'translateX(5px)' : 'translateX(0)' }}>
            <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const { t } = useLanguage()
  const [ref, inView] = useReveal()

  return (
    <section id="servicios" className="section" ref={ref}>
      <style>{`
        #servicios .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          #servicios .services-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          #servicios .services-grid { grid-template-columns: 1fr; gap: 1rem; }
        }
      `}</style>

      <div className="eyebrow" style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.9s, transform 0.9s cubic-bezier(0.19,1,0.22,1)',
      }}>
        <span className="eyebrow-dot" />
        02 — {t.services.label}
      </div>

      <h2 className="display" style={{
        fontSize: 'clamp(2.2rem, 5.5vw, 5rem)',
        color: 'var(--fg)',
        marginBottom: '4rem',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 1s 0.12s cubic-bezier(0.19,1,0.22,1), transform 1s 0.12s cubic-bezier(0.19,1,0.22,1)',
      }}>
        {t.services.title}
      </h2>

      <div className="services-grid">
        {t.services.items.map((s, i) => (
          <ServiceCard key={i} s={s} idx={i} inView={inView} delay={0.22 + i * 0.1} />
        ))}
      </div>
    </section>
  )
}
