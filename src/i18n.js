import { createI18n } from 'vue-i18n'
import en from './locales/en.js'
import ptBr from './locales/pt-br.js'
import es from './locales/es.js'

const savedLocale = localStorage.getItem('vyliam_locale') || 'en'

const i18n = createI18n({
  legacy: false, // Use Vue 3 Composition API mode
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    'pt-br': ptBr,
    es
  }
})

export default i18n
