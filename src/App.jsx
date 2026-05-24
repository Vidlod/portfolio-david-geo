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
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--fg)',
        position: 'relative',
      }}>
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
    </LanguageProvider>
  )
}

export default App
