import { defaultNS, en } from 'app/providers'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: typeof en
  }
}
