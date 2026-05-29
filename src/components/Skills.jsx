import { useLanguage } from '../context/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { skills } from '../data/content'

export default function Skills() {
  const { t } = useLanguage()
  const [ref, inView] = useReveal()

  return (
    <section id="skills" className="section" ref={ref}>
      <style>{`
        #skills .skills-grid {
          display: grid;
          grid-template-columns: minmax(0, 5fr) minmax(0, 4fr);
          gap: 6rem;
          align-items: flex-start;
        }
        #skills .chip {
          padding: 0.6rem 1.1rem;
          border: 1px solid rgba(240,237,232,0.10);
          background: rgba(16,16,16,0.85);
          font-size: 0.85rem;
          color: var(--fg-dim);
          transition: border-color 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s;
          cursor: default;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
        }
        #skills .chip::before {
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--cyan);
          opacity: 0;
          flex-shrink: 0;
          transition: opacity 0.3s;
        }
        #skills .chip:hover {
          border-color: rgba(34,211,238,0.35);
          color: var(--fg);
          transform: translateY(-2px);
          box-shadow: 0 0 16px rgba(34,211,238,0.06);
        }
        #skills .chip:hover::before {
          opacity: 1;
        }
        @media (max-width: 1024px) {
          #skills .skills-grid { grid-template-columns: 1fr; gap: 3.5rem; }
        }
        @media (max-width: 640px) {
          #skills .skills-grid { gap: 2.5rem; }
        }
      `}</style>

      <div className="eyebrow" style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.9s, transform 0.9s cubic-bezier(0.19,1,0.22,1)',
      }}>
        <span className="eyebrow-dot" />
        04 — {t.skills.label}
      </div>

      <div className="skills-grid">
        {/* Left */}
        <div>
          <h2 className="display" style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 5rem)',
            color: 'var(--fg)', marginBottom: '3.5rem',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 1s 0.12s cubic-bezier(0.19,1,0.22,1), transform 1s 0.12s cubic-bezier(0.19,1,0.22,1)',
          }}>
            {t.skills.title}
          </h2>

          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 1s 0.28s cubic-bezier(0.19,1,0.22,1), transform 1s 0.28s cubic-bezier(0.19,1,0.22,1)',
          }}>
            {skills.map(s => (
              <span key={s.name} className="chip">{s.name}</span>
            ))}
          </div>
        </div>

        {/* Right — AI note */}
        <div style={{
          paddingTop: '0.75rem',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s 0.38s cubic-bezier(0.19,1,0.22,1), transform 1s 0.38s cubic-bezier(0.19,1,0.22,1)',
        }}>
          <p style={{
            fontSize: '0.75rem', color: 'var(--fg-faint)',
            marginBottom: '1.25rem', letterSpacing: '0.02em',
          }}>— AI workflow</p>

          <p className="display" style={{
            fontSize: 'clamp(1.3rem, 2vw, 1.85rem)',
            color: 'var(--fg)', fontWeight: 300, fontStyle: 'italic',
            lineHeight: 1.35,
          }}>
            {t.skills.aiNote}
          </p>
        </div>
      </div>
    </section>
  )
}
