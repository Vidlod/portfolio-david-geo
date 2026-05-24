import { useEffect, useRef, useState } from 'react'

/**
 * Triggers `in` = true once the element scrolls into view.
 * Apply the returned ref to any element and toggle the `in` class
 * (or use the boolean directly with inline styles).
 */
export function useReveal({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        if (once) obs.disconnect()
      } else if (!once) {
        setInView(false)
      }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, once])

  return [ref, inView]
}
