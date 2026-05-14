import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@/locales/en/common.json'
import es from '@/locales/es/common.json'

const LANG_KEY = 'lumen_lang'

function getSavedLang(): string {
  const saved = localStorage.getItem(LANG_KEY)
  return saved === 'en' ? 'en' : 'es'
}

i18n.use(initReactI18next).init({
  lng: getSavedLang(),
  fallbackLng: 'es',
  resources: {
    en: { common: en },
    es: { common: es },
  },
  defaultNS: 'common',
  interpolation: { escapeValue: false },
})

export { LANG_KEY }
export default i18n
