import { createContext, useContext, useState } from 'react'
import { content } from '../data/content'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('es')
  const toggle = () => setLang(l => l === 'es' ? 'en' : 'es')
  const t = content[lang]
  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
