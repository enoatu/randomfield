import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    'common': {
      'title': 'RandomField',
      'description': 'This is The RandomField.',
    },
  },
  ja: {
    'common': {
      'title': 'ランダムフィールド',
      'description': 'これがランダムフィールドだ',
    },
  },
}

const isSSR = typeof window === 'undefined'

let lang = isSSR || sessionStorage.getItem('lang')
if (!['ja', 'en'].includes(lang)) {
  lang = 'en'
}

i18n.use(initReactI18next).init({
  resources,
  lng: lang,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
