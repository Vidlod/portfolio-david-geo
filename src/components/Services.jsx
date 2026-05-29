import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useReveal } from '../hooks/useReveal'

/* SVG icons — one per service */
const icons = [
  /* Landing Pages — cursor click */
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
  </svg>,
  /* Sites & Portfolios — layout */
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
  </svg>,
  /* Web Apps — code */
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>,
  /* Maintenance — wrench */
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>,
]

function ServiceCard({ s, idx, inView, delay }) {
  const [h, setH] = useState(false)

  return (
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
          padding: 'clamp(1.75rem, 3vw, 2.5rem)',
          background: 'rgba(9, 9, 9, 0.68)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: `1px solid ${h ? 'rgba(232,185,132,0.35)' : 'rgba(237,234,227,0.08)'}`,
          transition: 'border-color 0.45s, transform 0.45s, box-shadow 0.45s',
          transform: h ? 'translateY(-5px)' : 'translateY(0)',
          boxShadow: h ? '0 0 40px rgba(232,185,132,0.07), 0 24px 60px rgba(0,0,0,0.35)' : 'none',
          display: 'flex', flexDirection: 'column', gap: '1.5rem',
          height: '100%',
        }}>

        {/* Icon + number row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div style={{
            width: '44px', height: '44px',
            border: `1px solid ${h ? 'rgba(34,211,238,0.4)' : 'rgba(237,234,227,0.08)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: h ? 'var(--cyan)' : 'var(--fg-dim)',
            transition: 'color 0.4s, border-color 0.4s',
            flexShrink: 0,
          }}>
            {icons[idx]}
          </div>
          <span style={{
            fontSize: '0.72rem', color: 'var(--fg-faint)', letterSpacing: '0.02em',
          }}>0{idx + 1}</span>
        </div>

        {/* Title */}
        <h3 className="display" style={{
          fontSize: 'clamp(1.5rem, 2.3vw, 2rem)',
          color: 'var(--fg)',
          transition: 'transform 0.4s',
          transform: h ? 'translateX(5px)' : 'translateX(0)',
        }}>
          {s.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: 'clamp(0.9rem, 1.4vw, 0.95rem)',
          lineHeight: 1.8, color: 'var(--fg-dim)',
          flexGrow: 1,
        }}>{s.desc}</p>

        {/* Tags */}
        {s.tags && (
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--line)',
          }}>
            {s.tags.map(tag => (
              <span key={tag} style={{
                fontSize: '0.72rem', color: h ? 'var(--fg-dim)' : 'var(--fg-faint)',
                border: '1px solid var(--line)',
                padding: '0.3rem 0.65rem',
                letterSpacing: '0.01em',
                transition: 'color 0.35s',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}
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
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
        }
        @media (max-width: 640px) {
          #servicios .services-grid { grid-template-columns: 1fr; gap: 1rem; }
        }
      `}</style>

      {/* Eyebrow */}
      <div className="eyebrow" style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.9s, transform 0.9s cubic-bezier(0.19,1,0.22,1)',
      }}>
        <span className="eyebrow-dot" />
        02 — {t.services.label}
      </div>

      {/* Headline */}
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

      {/* 2×2 Grid */}
      <div className="services-grid">
        {t.services.items.map((s, i) => (
          <ServiceCard key={i} s={s} idx={i} inView={inView} delay={0.2 + i * 0.08} />
        ))}
      </div>
    </section>
  )
}
