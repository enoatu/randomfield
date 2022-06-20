import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    'common': {
      'title': 'DevUtils',
      'description': 'Support Tools for Developers.',
    },
    'create-image': {
      'title': 'Image Creation Tools',
      'description': 'Create an image by specifying height, width, etc.',
    },
  },
  ja: {
    'common': {
      'title': '開発ツール',
      'description': '開発者向けサポートツール',
    },
    'create-image': {
      'title': '画像作成ツール',
      'description': '高さや横幅などを指定して、画像を作成します',
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
