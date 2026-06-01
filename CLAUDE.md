# portfolio-david-geo — Contexto para Claude Code

## Stack base
- React 19 + Vite 8
- Tailwind CSS v4 (configurado vía `@tailwindcss/vite`)
- EmailJS para el formulario de contacto

## Hardware objetivo
Mac con procesador **Intel** — evitar efectos que dependan de GPU intensa o backdrop-filter pesado. El comentario `Intel-Mac friendly` en `App.jsx` marca esta restricción. Preferir `opacity` y `transform` sobre filtros CSS como `blur()` en capas grandes.

---

## Herramientas de animación instaladas (autónomas, sin assets externos)

### Framer Motion `framer-motion@^12`
La opción principal para animaciones de UI en React. La IA puede escribir estas completamente.

```jsx
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

// Entrada simple
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} />

// Al entrar en viewport
<motion.section whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} viewport={{ once: true }} />

// Hover interactivo
<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} />
```

**Cuándo usarlo:** transiciones de sección, entradas de tarjetas, modales, listas con `AnimatePresence`, parallax con `useScroll`.

---

### GSAP `gsap@^3`
Para animaciones de timeline complejas y efectos de scroll avanzados.

```js
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Timeline en useLayoutEffect
gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top center' } })
  .from('.hero-title', { opacity: 0, y: 60, duration: 0.8 })
  .from('.hero-sub',   { opacity: 0, y: 30, duration: 0.6 }, '-=0.4')
```

**Cuándo usarlo:** animaciones de texto letra a letra, efectos de scroll complejos, coordinar múltiples elementos en secuencia.

> Nota: GSAP core es gratuito. Los plugins premium (SplitText, MorphSVG) requieren licencia Club GreenSock.

---

### Anime.js `animejs@^4`
Alternativa ligera a GSAP. Buena para animaciones puntuales sin mucho overhead.

```js
import anime from 'animejs'

anime({ targets: '.skill-bar', width: ['0%', '80%'], easing: 'easeOutExpo', duration: 1200, delay: anime.stagger(100) })
```

**Cuándo usarlo:** barras de progreso, contadores numéricos, SVG path drawing, stagger de elementos repetidos.

---

### Lucide React `lucide-react@^1`
Iconos como componentes React, sin archivos SVG externos. La IA los usa directamente en código.

```jsx
import { Github, Mail, ExternalLink, ChevronDown } from 'lucide-react'

<Github size={20} strokeWidth={1.5} />
```

**Cuándo usarlo:** siempre que se necesiten iconos — no importar SVGs manualmente.

---

## Herramientas que requieren assets humanos (NO instaladas)

| Herramienta | Por qué no es autónoma |
|---|---|
| **Rive** | El runtime es gratuito, pero el archivo `.riv` se crea en el editor de Rive (web, gratuito para uso personal). La IA puede integrar el runtime una vez que exista el archivo. |
| **Lottie** | El JSON se genera en After Effects o en el editor de LottieFiles. La IA puede integrarlo, pero no crearlo. Alternativa: usar animaciones gratuitas de `lottiefiles.com`. |
| **Spline** | Editor 3D visual; exporta un componente React. La IA integra el output. |

---

## Patrones recomendados para este proyecto

### Animaciones de entrada por sección
Usar `framer-motion` con `whileInView` y `viewport={{ once: true }}` para que cada sección anime al hacer scroll, una sola vez.

### Hover en tarjetas de proyectos
`whileHover` con `scale` y `boxShadow` en el componente `Projects.jsx`.

### Texto animado en Hero
GSAP con `SplitType` (libre) o animación letra a letra manual con `AnimatePresence` de Framer.

### Stagger en lista de skills
Anime.js o Framer Motion con `variants` y `staggerChildren`.

---

## Componentes actuales
```
src/components/
├── About.jsx
├── Contact.jsx
├── Footer.jsx
├── Hero.jsx
├── Navbar.jsx
├── ProjectCarousel.jsx  ← coverflow 3D (Framer Motion) — showcase encima del grid
├── Projects.jsx         ← carrusel + grid de proyectos
├── ScrollLines.jsx      ← efecto decorativo de líneas de scroll
├── Services.jsx
└── Skills.jsx
```

### Orden de secciones (App.jsx)
Hero → **Projects** (01) → About (02) → Services (03) → Skills (04) → Contact (05).
Proyectos se subió justo después del Hero; los números del `eyebrow` se renumeraron en consecuencia.

### ProjectCarousel.jsx — coverflow 3D
Carrusel circular sobre eje vertical con **Framer Motion** (`motion`, `AnimatePresence`) e iconos de **Lucide** (`ChevronLeft/Right`, `ArrowUpRight`).
- Imagen central grande y de frente; laterales inclinadas (`rotateY`) y retrocedidas (`translateZ`) en perspectiva.
- Auto-rota cada 4.2s; se pausa al hover/focus/drag y respeta `prefers-reduced-motion` + `inView`.
- Control manual: flechas, arrastre (`drag="x"` con snap), clic en laterales e indicadores.
- Solo anima `opacity`/`transform`/`filter` puntual (Intel-Mac friendly). Reutiliza el lenguaje de marcos del grid (borde ámbar al frente, fondo `rgba(9,9,9,0.72)`).
- Lee los mismos `projects` de `src/data/content.js` — agregar un proyecto ahí lo añade al carrusel y al grid automáticamente.

## Contexto adicional
- `src/context/LanguageContext.jsx` — maneja i18n (es/en)
- `src/data/` — datos de proyectos y contenido separados de los componentes
- `src/hooks/` — custom hooks del proyecto
