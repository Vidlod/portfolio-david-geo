import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { useLanguage } from '../context/LanguageContext'
import { useReveal } from '../hooks/useReveal'

const EMAILJS_SERVICE  = 'service_vynd56d'
const EMAILJS_TEMPLATE = 'template_l3plcir'
const EMAILJS_KEY      = '47zZDCw1reqTnp5uS'

export default function Contact() {
  const { t, lang } = useLanguage()
  const [ref, inView] = useReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)
  const [btnH, setBtnH] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = true
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true
    if (!form.message.trim()) e.message = true
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSending(true)
    setSendError(false)
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        { name: form.name, email: form.email, message: form.message },
        EMAILJS_KEY
      )
      setSent(true)
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  if (sent) return (
    <section id="contacto" style={{ padding: 'clamp(6rem,14vw,14rem) 2.5rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
        <div style={{
          width: '4.5rem', height: '4.5rem',
          border: '1px solid var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 3rem',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12L10 17L19 8" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="display" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', marginBottom: '1.25rem' }}>
          {t.contact.successTitle}
        </h2>
        <p style={{ color: 'var(--fg-dim)', fontSize: '1rem', lineHeight: 1.7 }}>{t.contact.successDesc}</p>
      </div>
    </section>
  )

  return (
    <section id="contacto" className="section" ref={ref}>
      <style>{`
        #contacto input::placeholder,
        #contacto textarea::placeholder {
          color: rgba(240, 237, 232, 0.45);
          font-family: var(--sans);
          opacity: 1; /* evita el atenuado por defecto de algunos navegadores */
        }

        /* ── Campos: "filled underline" — superficie sutil + subrayado visible ── */
        #contacto .field {
          width: 100%;
          box-sizing: border-box;
          background: rgba(240, 237, 232, 0.035);
          border: none;
          border-bottom: 1.5px solid rgba(237, 234, 227, 0.28);
          color: var(--fg);
          padding: 0.85rem 0.9rem;
          font-size: clamp(0.95rem, 1.6vw, 1rem);
          font-family: var(--sans);
          outline: none;
          -webkit-appearance: none;
          transition: background 0.35s, border-color 0.35s, box-shadow 0.35s;
        }
        #contacto .field:hover {
          background: rgba(240, 237, 232, 0.06);
          border-bottom-color: rgba(237, 234, 227, 0.5);
        }
        #contacto .field:focus {
          background: rgba(240, 237, 232, 0.06);
          border-bottom-color: var(--cyan);
          box-shadow: 0 6px 22px -10px rgba(34, 211, 238, 0.5);
        }
        #contacto .field.error { border-bottom-color: #d97070; }
        #contacto .field.error:focus { box-shadow: 0 6px 22px -10px rgba(217, 112, 112, 0.45); }
        #contacto textarea.field { resize: vertical; min-height: 110px; }
        #contacto .contact-grid {
          display: grid;
          grid-template-columns: minmax(0, 5fr) minmax(0, 4fr);
          gap: 6rem;
          align-items: flex-start;
        }
        #contacto .info-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 1rem 0;
          border-bottom: 1px solid var(--line);
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          #contacto .contact-grid { grid-template-columns: 1fr; gap: 3.5rem; }
        }
        @media (max-width: 640px) {
          #contacto .contact-grid { gap: 2.5rem; }
        }
      `}</style>

      {/* Eyebrow */}
      <div className="eyebrow" style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.9s, transform 0.9s cubic-bezier(0.19,1,0.22,1)',
      }}>
        <span className="eyebrow-dot" />
        05 — {t.contact.label}
      </div>

      {/* Big headline */}
      <h2 className="display" style={{
        fontSize: 'clamp(2.8rem, 9vw, 8.5rem)',
        color: 'var(--fg)',
        marginBottom: '5rem',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 1s 0.12s cubic-bezier(0.19,1,0.22,1), transform 1s 0.12s cubic-bezier(0.19,1,0.22,1)',
      }}>
        {lang === 'es' ? <>Hablemos<span style={{ color: 'var(--accent)' }}>.</span></> : <>Let's talk<span style={{ color: 'var(--accent)' }}>.</span></>}
      </h2>

      <div className="contact-grid">
        {/* LEFT — Form in glass card */}
        <div style={{
          background: 'rgba(14, 14, 14, 0.95)',
          border: '1px solid rgba(240, 237, 232, 0.10)',
          padding: 'clamp(2rem, 4vw, 3rem)',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s 0.28s cubic-bezier(0.19,1,0.22,1), transform 1s 0.28s cubic-bezier(0.19,1,0.22,1)',
        }}>
        <form onSubmit={handleSubmit} noValidate style={{
          display: 'flex', flexDirection: 'column', gap: '2rem',
        }}>
          {[
            { key: 'name',  n: '01', label: t.contact.name,  ph: lang === 'es' ? 'Tu nombre' : 'Your name' },
            { key: 'email', n: '02', label: t.contact.email, type: 'email', ph: lang === 'es' ? 'tu@correo.com' : 'you@email.com' },
          ].map(field => (
            <div key={field.key}>
              <label style={{
                display: 'block', fontSize: '0.72rem',
                color: errors[field.key] ? '#d97070' : 'rgba(240,237,232,0.7)',
                marginBottom: '0.55rem', letterSpacing: '0.02em',
                transition: 'color 0.3s',
              }}>
                {field.n} — {field.label}{errors[field.key] ? ' *' : ''}
              </label>
              <input
                type={field.type || 'text'}
                placeholder={field.ph}
                className={`field${errors[field.key] ? ' error' : ''}`}
                value={form[field.key]}
                autoComplete={field.key === 'email' ? 'email' : 'name'}
                onChange={e => { setForm(f => ({ ...f, [field.key]: e.target.value })); setErrors(er => ({ ...er, [field.key]: false })) }}
              />
            </div>
          ))}

          <div>
            <label style={{
              display: 'block', fontSize: '0.72rem',
              color: errors.message ? '#d97070' : 'rgba(240,237,232,0.7)',
              marginBottom: '0.55rem', letterSpacing: '0.02em',
              transition: 'color 0.3s',
            }}>
              03 — {t.contact.message}{errors.message ? ' *' : ''}
            </label>
            <textarea
              placeholder={lang === 'es' ? 'Cuéntame sobre tu proyecto…' : 'Tell me about your project…'}
              rows={4}
              className={`field${errors.message ? ' error' : ''}`}
              value={form.message}
              onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: false })) }}
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            onMouseEnter={() => setBtnH(true)}
            onMouseLeave={() => setBtnH(false)}
            style={{
              alignSelf: 'flex-start', marginTop: '1rem',
              padding: '1.1rem 2rem',
              background: sending ? 'var(--fg-dim)' : btnH ? 'var(--accent)' : 'var(--fg)',
              color: 'var(--bg)',
              border: 'none', cursor: sending ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--sans)', fontSize: '0.9rem', fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: '0.65rem',
              transition: 'all 0.4s cubic-bezier(0.19,1,0.22,1)',
              transform: (!sending && btnH) ? 'translateY(-3px)' : 'none',
              boxShadow: (!sending && btnH) ? '0 12px 40px rgba(232,185,132,0.25)' : 'none',
              minWidth: '180px', justifyContent: 'center',
              opacity: sending ? 0.7 : 1,
            }}>
            {sending ? (lang === 'es' ? 'Enviando…' : 'Sending…') : t.contact.send}
            {!sending && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>

          {sendError && (
            <p style={{ fontSize: '0.82rem', color: '#d97070', marginTop: '0.5rem' }}>
              {lang === 'es'
                ? 'Hubo un error al enviar. Intenta escribirme directamente a david25geo@gmail.com'
                : 'Something went wrong. Try emailing me directly at david25geo@gmail.com'}
            </p>
          )}
        </form>
        </div>

        {/* RIGHT — Direct contact info */}
        <div style={{
          paddingTop: '1.5rem',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s 0.42s cubic-bezier(0.19,1,0.22,1), transform 1s 0.42s cubic-bezier(0.19,1,0.22,1)',
        }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--fg-faint)', marginBottom: '1rem', letterSpacing: '0.02em' }}>
            — {t.contact.orAt}
          </p>

          <a href="mailto:david25geo@gmail.com" className="under"
            style={{
              fontFamily: 'var(--display)', fontWeight: 400, fontStyle: 'italic',
              fontSize: 'clamp(1.15rem, 2vw, 1.7rem)',
              color: 'var(--fg)',
              display: 'inline-block', marginBottom: '3rem',
              wordBreak: 'break-all',
            }}>
            david25geo@gmail.com
          </a>

          {[
            { k: lang === 'es' ? 'Ubicación' : 'Location',  v: 'Bogotá, Colombia' },
            { k: lang === 'es' ? 'Zona horaria' : 'Timezone', v: 'UTC −5 · COT' },
            { k: lang === 'es' ? 'Alcance' : 'Scope',        v: lang === 'es' ? 'Remoto · global' : 'Remote · global' },
            { k: lang === 'es' ? 'Respuesta' : 'Reply time',  v: lang === 'es' ? '< 24 horas' : '< 24 hours' },
          ].map(item => (
            <div key={item.k} className="info-row">
              <span style={{ fontSize: '0.75rem', color: 'var(--fg-faint)' }}>{item.k}</span>
              <span style={{ fontSize: '0.88rem', color: 'var(--fg)', fontWeight: 500, textAlign: 'right' }}>{item.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
