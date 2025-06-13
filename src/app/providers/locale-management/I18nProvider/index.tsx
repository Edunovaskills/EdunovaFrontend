import { I18nextProvider } from 'react-i18next'

import { i18n } from '../model/i18n.model'

type Props = {
  readonly children: React.ReactNode
}

export function I18nProvider({ children }: Props) {
  return <I18nextProvider i18n={i18n}> {children} </I18nextProvider>
}
