import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { projects } from '../data/content'

function ProjectCard({ project, t, lang, idx, inView, delay }) {
  const [h, setH] = useState(false)

  if (project.wip) return (
    <div style={{
      border: '1px dashed var(--line)',
      minHeight: '360px',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '1rem',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.9s ${delay}s cubic-bezier(0.19,1,0.22,1),
                   transform 0.9s ${delay}s cubic-bezier(0.19,1,0.22,1)`,
    }}>
      <span style={{ fontSize: '0.75rem', color: 'var(--fg-faint)', letterSpacing: '0.02em' }}>0{idx + 1}</span>
      <span className="display" style={{ fontSize: '1.35rem', color: 'var(--fg-faint)', fontStyle: 'italic', fontWeight: 300 }}>
        {t.projects.wip}
      </span>
    </div>
  )

  return (
    <div style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(40px)',
      transition: `opacity 0.9s ${delay}s cubic-bezier(0.19,1,0.22,1),
                   transform 0.9s ${delay}s cubic-bezier(0.19,1,0.22,1)`,
    }}>
      <a href={project.url} target="_blank" rel="noopener noreferrer"
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>

        {/* Image wrapper */}
        <div style={{
          height: 'clamp(240px, 35vw, 380px)',
          position: 'relative', overflow: 'hidden', marginBottom: '1.5rem',
          cursor: 'pointer',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            transform: h ? 'scale(1.06)' : 'scale(1)',
            filter: h ? 'grayscale(0)' : 'grayscale(0.5) brightness(0.82)',
            transition: 'transform 1.4s cubic-bezier(0.19,1,0.22,1), filter 0.7s',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(14,14,14,0.55) 0%, transparent 55%)',
            opacity: h ? 0 : 1, transition: 'opacity 0.6s',
          }} />

          {/* Index top-left */}
          <span style={{
            position: 'absolute', top: '1.25rem', left: '1.25rem',
            fontSize: '0.75rem', color: 'var(--fg)', letterSpacing: '0.02em',
          }}>0{idx + 1}</span>

          {/* Arrow top-right */}
          <div style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem',
            width: '40px', height: '40px',
            background: h ? 'var(--fg)' : 'transparent',
            border: `1px solid ${h ? 'var(--fg)' : 'rgba(237,234,227,0.4)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: h ? 'var(--bg)' : 'var(--fg)',
            transition: 'all 0.4s cubic-bezier(0.19,1,0.22,1)',
            transform: h ? 'scale(1.1)' : 'scale(1)',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Text content */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          gap: '1rem', marginBottom: '0.6rem', flexWrap: 'wrap',
        }}>
          <h3 className="display" style={{
            fontSize: 'clamp(1.4rem, 2vw, 1.65rem)', color: 'var(--fg)',
            transition: 'transform 0.4s', transform: h ? 'translateX(4px)' : 'translateX(0)',
          }}>{project.name}</h3>
          <span style={{ fontSize: '0.72rem', color: 'var(--fg-faint)', flexShrink: 0 }}>
            {project.tech.join(' · ')}
          </span>
        </div>

        <p style={{
          fontSize: 'clamp(0.88rem, 1.5vw, 0.92rem)',
          lineHeight: 1.65, color: 'var(--fg-dim)',
        }}>{project.desc[lang]}</p>
      </a>
    </div>
  )
}

export default function Projects() {
  const { t, lang } = useLanguage()
  const [ref, inView] = useReveal()

  return (
    <section id="proyectos" className="section" ref={ref}>
      <style>{`
        #proyectos .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 2.5rem 2rem;
        }
        @media (max-width: 1024px) {
          #proyectos .projects-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
        }
        @media (max-width: 640px) {
          #proyectos .projects-grid { grid-template-columns: 1fr; gap: 2.5rem; }
        }
      `}</style>

      <div className="eyebrow" style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.9s, transform 0.9s cubic-bezier(0.19,1,0.22,1)',
      }}>
        <span className="eyebrow-dot" />
        03 — {t.projects.label}
      </div>

      <h2 className="display" style={{
        fontSize: 'clamp(2.2rem, 5.5vw, 5rem)',
        color: 'var(--fg)', marginBottom: '4rem',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 1s 0.12s cubic-bezier(0.19,1,0.22,1), transform 1s 0.12s cubic-bezier(0.19,1,0.22,1)',
      }}>
        {t.projects.title}
      </h2>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} t={t} lang={lang} idx={i} inView={inView} delay={0.22 + i * 0.1} />
        ))}
      </div>
    </section>
  )
}
