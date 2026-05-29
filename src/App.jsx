import './index.css'
import { LanguageProvider } from './context/LanguageContext'
import ScrollLines from './components/ScrollLines'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <LanguageProvider>
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)', position: 'relative' }}>

        {/* ─── White Aurora — single blur pass (perf optimized) ─── */}
        <div aria-hidden="true" style={{
          position: 'fixed',
          top: '-15%', left: '-8%', right: '-8%', bottom: '-8%',
          pointerEvents: 'none', zIndex: 0,
        }}>
          {/* ONE filter:blur wraps ALL orbs → 1 GPU op instead of 5 */}
          <div style={{
            position: 'absolute', inset: 0,
            filter: 'blur(80px)',
            mixBlendMode: 'screen',
            willChange: 'transform',
          }}>
            {/* Crown — top center, warm white, slow drift */}
            <div style={{
              position: 'absolute',
              top: '5%', left: '50%', marginLeft: '-520px',
              width: '1040px', height: '680px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse 55% 48% at 50% 44%, rgba(255,252,248,0.28) 0%, rgba(255,252,248,0.10) 45%, transparent 70%)',
              animation: 'auroraMain 22s ease-in-out infinite',
              willChange: 'transform',
            }} />

            {/* Horizontal band — aurora borealis streak */}
            <div style={{
              position: 'absolute',
              top: '22%', left: '-2%',
              width: '104%', height: '340px',
              background: 'radial-gradient(ellipse 68% 38% at 47% 50%, rgba(255,255,255,0.16) 0%, rgba(250,254,255,0.05) 55%, transparent 78%)',
              animation: 'auroraStreak 30s ease-in-out infinite',
              willChange: 'transform',
            }} />

            {/* Right glow — pure cool white */}
            <div style={{
              position: 'absolute',
              top: '8%', right: '-2%',
              width: '640px', height: '560px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.06) 48%, transparent 68%)',
              animation: 'auroraAccent 18s ease-in-out infinite 1.5s',
              willChange: 'transform',
            }} />

            {/* Base warmth — bottom center */}
            <div style={{
              position: 'absolute',
              bottom: '5%', left: '25%', marginLeft: '-220px',
              width: '840px', height: '360px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse 72% 42% at 50% 58%, rgba(255,252,245,0.10) 0%, transparent 65%)',
              animation: 'auroraDeep 24s ease-in-out infinite 4s',
              willChange: 'transform',
            }} />
          </div>
        </div>

        {/* ─── Content (above aurora) ─── */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ScrollLines />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Services />
            <Projects />
            <Skills />
            <Contact />
            <Footer />
          </main>
        </div>

      </div>
    </LanguageProvider>
  )
}

export default App
