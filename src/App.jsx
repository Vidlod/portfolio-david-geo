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

        {/* ─── White Aurora — no blur, no blend-mode, opacity-only (Mac perf fix) ─── */}
        <div aria-hidden="true" style={{
          position: 'fixed', inset: 0,
          pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
        }}>
          {/* Crown — large warm-white radial, top-center */}
          <div style={{
            position: 'absolute',
            top: '-10%', left: '50%', marginLeft: '-600px',
            width: '1200px', height: '800px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 50% 42%, rgba(255,252,248,0.13) 0%, rgba(255,252,248,0.05) 38%, rgba(255,252,248,0.01) 62%, transparent 80%)',
            animation: 'auroraBreath 22s ease-in-out infinite',
            willChange: 'opacity',
          }} />

          {/* Horizontal band — aurora streak across mid-top */}
          <div style={{
            position: 'absolute',
            top: '18%', left: '-5%',
            width: '110%', height: '460px',
            background: 'radial-gradient(ellipse 72% 42% at 46% 50%, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 52%, transparent 78%)',
            animation: 'auroraBreath2 30s ease-in-out infinite 2s',
            willChange: 'opacity',
          }} />

          {/* Right shoulder — pure cool white */}
          <div style={{
            position: 'absolute',
            top: '5%', right: '-8%',
            width: '700px', height: '620px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 42%, transparent 70%)',
            animation: 'auroraBreath 17s ease-in-out infinite 1.8s',
            willChange: 'opacity',
          }} />

          {/* Base depth — bottom warmth */}
          <div style={{
            position: 'absolute',
            bottom: '-8%', left: '20%', marginLeft: '-200px',
            width: '900px', height: '440px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse 65% 40% at 50% 55%, rgba(255,252,245,0.07) 0%, transparent 72%)',
            animation: 'auroraBreath2 26s ease-in-out infinite 5s',
            willChange: 'opacity',
          }} />
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
