import { useLanguage } from '../context/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import ProjectCarousel from './ProjectCarousel'

export default function Projects() {
  const { t } = useLanguage()
  const [ref, inView] = useReveal()

  return (
    <section id="proyectos" className="section" ref={ref}>
      <div className="eyebrow" style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.9s, transform 0.9s cubic-bezier(0.19,1,0.22,1)',
      }}>
        <span className="eyebrow-dot" />
        01 — {t.projects.label}
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

      {/* Carrusel coverflow 3D — única vista de proyectos */}
      <ProjectCarousel inView={inView} />
    </section>
  )
}
