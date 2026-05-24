import { useEffect, useState } from 'react'

/**
 * Minimal top progress bar — single 1px line that fills with scroll.
 * The only persistent visual element. Quiet, useful, refined.
 */
export default function ScrollLines() {
  const [p, setP] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setP(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: '1px', zIndex: 80, pointerEvents: 'none',
      background: 'transparent',
    }}>
      <div style={{
        height: '100%',
        width: `${p * 100}%`,
        background: 'var(--fg)',
        transition: 'width 0.12s linear',
      }} />
    </div>
  )
}
