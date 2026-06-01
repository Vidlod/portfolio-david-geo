import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { projects } from '../data/content'

const AUTOPLAY_MS = 4200

/**
 * Coverflow 3D — carrusel circular sobre eje vertical.
 * La imagen central va grande y de frente; las laterales se inclinan y
 * retroceden en perspectiva. Auto-rota lento, se pausa al pasar el mouse,
 * y se controla con flechas, arrastrando o haciendo clic en las laterales.
 * Solo anima opacity / transform (Intel-Mac friendly).
 */
export default function ProjectCarousel({ inView }) {
  const { t, lang } = useLanguage()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = projects.length

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  // Detección de móvil (reactiva al resize / rotación)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 640px)').matches
      : false,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Geometría: coverflow 3D en tablet/desktop; en móvil una sola tarjeta
  // con slide horizontal (sin laterales 3D) para que se vea enfocada.
  const geo = isMobile
    ? { xMul: 100, rotY: 0, depth: 0, sideScale: 1,
        cardW: 'clamp(240px, 84vw, 440px)', cardH: 'clamp(180px, 58vw, 320px)',
        stageH: 'clamp(210px, 64vw, 360px)' }
    : { xMul: 58, rotY: 42, depth: 250, sideScale: 0.76,
        cardW: 'clamp(300px, 56vw, 660px)', cardH: 'clamp(220px, 38vw, 430px)',
        stageH: 'clamp(260px, 42vw, 480px)' }

  const go = useCallback((dir) => setActive((a) => (a + dir + n) % n), [n])

  // Auto-rotación (pausa al hover, fuera de viewport, o reduced-motion)
  useEffect(() => {
    if (paused || reduced || !inView) return
    const id = setInterval(() => setActive((a) => (a + 1) % n), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, reduced, inView, n])

  // Distancia mínima (con wrap) de cada tarjeta respecto a la activa
  const offsetOf = (i) => {
    let d = i - active
    if (d > n / 2) d -= n
    if (d < -n / 2) d += n
    return d
  }

  const current = projects[active]

  return (
    <div
      role="group"
      aria-roledescription="carrusel"
      aria-label={t.projects.title}
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1)
        if (e.key === 'ArrowLeft') go(-1)
      }}
      style={{
        position: 'relative',
        width: '100%',
        marginBottom: '5rem',
        outline: 'none',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition:
          'opacity 1s 0.18s cubic-bezier(0.19,1,0.22,1), transform 1s 0.18s cubic-bezier(0.19,1,0.22,1)',
      }}
    >
      {/* ── Escenario 3D (wrapper con la altura del stage para centrar flechas) ── */}
      <div style={{ position: 'relative', height: geo.stageH }}>
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragStart={() => setPaused(true)}
          onDragEnd={(e, info) => {
            if (info.offset.x < -60 || info.velocity.x < -350) go(1)
            else if (info.offset.x > 60 || info.velocity.x > 350) go(-1)
          }}
          style={{
            position: 'absolute',
            inset: 0,
            perspective: '1700px',
            transformStyle: 'preserve-3d',
            cursor: 'grab',
          }}
          whileTap={{ cursor: 'grabbing' }}
        >
          {projects.map((p, i) => {
            const d = offsetOf(i)
            const ad = Math.abs(d)
            const isCenter = d === 0
            return (
              <motion.div
                key={i}
                onClick={() => !isCenter && setActive(i)}
                initial={false}
                animate={{
                  x: `${d * geo.xMul}%`,
                  rotateY: d * -geo.rotY,
                  z: -ad * geo.depth,
                  scale: isCenter ? 1 : geo.sideScale,
                  opacity: isCenter ? 1 : isMobile ? 0 : ad >= 2 ? 0 : 0.5,
                  filter: isCenter
                    ? 'grayscale(0) brightness(1)'
                    : 'grayscale(0.5) brightness(0.6)',
                }}
                transition={{ type: 'spring', stiffness: 85, damping: 18 }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  margin: 'auto',
                  width: geo.cardW,
                  height: geo.cardH,
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                  zIndex: 20 - ad * 10,
                  cursor: isCenter ? 'default' : 'pointer',
                  pointerEvents: (!isCenter && isMobile) || ad >= 2 ? 'none' : 'auto',
                }}
              >
                <Frame project={p} idx={i} isCenter={isCenter} t={t} lang={lang} />
              </motion.div>
            )
          })}
        </motion.div>

        {/* ── Controles (centrados sobre el stage) ── */}
        <Arrow side="left" onClick={() => go(-1)} label="Anterior" mobile={isMobile}>
          <ChevronLeft size={isMobile ? 17 : 20} strokeWidth={1.5} />
        </Arrow>
        <Arrow side="right" onClick={() => go(1)} label="Siguiente" mobile={isMobile}>
          <ChevronRight size={isMobile ? 17 : 20} strokeWidth={1.5} />
        </Arrow>
      </div>

      {/* ── Pie: título + tech + indicadores ── */}
      <div style={{ marginTop: '2.25rem', textAlign: 'center', minHeight: '4.5rem' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <div
              style={{
                display: 'flex', alignItems: 'baseline', justifyContent: 'center',
                gap: '0.9rem', flexWrap: 'wrap',
              }}
            >
              <span style={{ fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.04em' }}>
                0{active + 1}
              </span>
              <a
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                className="display"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
                  color: 'var(--fg)',
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                }}
              >
                {current.name}
                <ArrowUpRight size={18} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
              </a>
            </div>
            <p style={{ marginTop: '0.55rem', fontSize: '0.72rem', color: 'var(--cyan)', letterSpacing: '0.01em' }}>
              {current.tech.join(' · ')}
            </p>
            <p style={{
              margin: '0.9rem auto 0',
              maxWidth: '46ch',
              fontSize: 'clamp(0.86rem, 1.5vw, 0.92rem)',
              lineHeight: 1.65,
              color: 'var(--fg-dim)',
            }}>
              {current.desc[lang]}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Indicadores */}
        <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginTop: '1.5rem' }}>
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Ir al proyecto ${i + 1}`}
              style={{
                width: i === active ? '28px' : '8px',
                height: '8px',
                padding: 0,
                border: 'none',
                cursor: 'pointer',
                background: i === active ? 'var(--accent)' : 'rgba(240,237,232,0.18)',
                transition: 'width 0.45s cubic-bezier(0.19,1,0.22,1), background 0.45s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Marco de imagen (mismo lenguaje visual que el grid) ── */
function Frame({ project, idx, isCenter }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%', height: '100%',
        overflow: 'hidden',
        border: `1px solid ${isCenter ? 'rgba(232,185,132,0.35)' : 'rgba(240,237,232,0.09)'}`,
        background: 'rgba(9,9,9,0.72)',
        boxShadow: isCenter ? '0 30px 80px -30px rgba(0,0,0,0.8)' : 'none',
        transition: 'border-color 0.5s, box-shadow 0.5s',
      }}
    >
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: project.image
            ? `url(${project.image}), ${project.gradient}`
            : project.gradient,
          backgroundSize: 'cover, cover',
          backgroundPosition: 'center, center',
        }}
      />
      {/* Velo inferior para legibilidad */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(14,14,14,0.55) 0%, transparent 50%)',
          opacity: isCenter ? 0.6 : 1,
          transition: 'opacity 0.5s',
        }}
      />
      {/* Índice */}
      <span
        style={{
          position: 'absolute', top: '1.25rem', left: '1.25rem',
          fontSize: '0.75rem', color: 'var(--fg)', letterSpacing: '0.02em',
        }}
      >
        0{idx + 1}
      </span>
    </div>
  )
}

/* ── Botón de flecha (mismo estilo que el cuadro de la grid) ── */
function Arrow({ side, onClick, label, children, mobile }) {
  const [h, setH] = useState(false)
  const sz = mobile ? 38 : 46
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      aria-label={label}
      style={{
        position: 'absolute',
        top: '50%',
        [side]: mobile ? '0.25rem' : 'clamp(-0.5rem, 2vw, 2rem)',
        transform: 'translateY(-50%)',
        width: `${sz}px`, height: `${sz}px`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: h ? 'var(--accent)' : 'rgba(14,14,14,0.85)',
        border: `1px solid ${h ? 'var(--accent)' : 'rgba(237,234,227,0.2)'}`,
        color: h ? 'var(--bg)' : 'var(--fg)',
        cursor: 'pointer',
        zIndex: 30,
        transition: 'background 0.4s, border-color 0.4s, color 0.4s',
      }}
    >
      {children}
    </button>
  )
}
