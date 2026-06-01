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

        {/* ─── White Aurora — 2 composited layers, opacity-only (Intel-Mac friendly) ─── */}
        <div className="aurora" aria-hidden="true" />

        {/* ─── Content (above aurora) ─── */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <ScrollLines />
          <Navbar />
          <main>
            <Hero />
            <Projects />
            <About />
            <Services />
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
