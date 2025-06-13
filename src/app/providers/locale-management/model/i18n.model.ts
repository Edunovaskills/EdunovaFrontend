import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { I18nextProvider, initReactI18next } from 'react-i18next'

import { defaultNS, en } from './resources'

export const resources = {
  en,
}

export const i18n = i18next
  .use(LanguageDetector) // detect user language in browser
  .use(initReactI18next) // pass the i18n instance to react-i18next
  .createInstance(
    {
      detection: {
        order: ['navigator'],
      },
      resources,
      fallbackLng: 'en',
      ns: Object.keys(en),
      defaultNS,
      fallbackNS: defaultNS,
      debug: true,
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      saveMissing: true,
      missingKeyHandler: (lngs, ns, key) => {
        // eslint-disable-next-line no-console
        console.log({ lngs, ns, key })
        // FIXME: don t use console.log in production
        // TODO: make logger service - replace all console.log
      },
    },
    // The callback will be called after all translations were loaded or with an error when failed
    (error) => {
      // eslint-disable-next-line no-console
      if (error) console.log(error)
    }
  )

export const I18nProvider = I18nextProvider
