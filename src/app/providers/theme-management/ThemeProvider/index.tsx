import { CssBaseline } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

import { ThemeModeProvider, useThemeMode } from 'shared/state'
import { ClientOnly } from 'shared/components'

import getTheme from '../theme'

type Props = {
  children: React.ReactNode
}

function ThemeSetup({ children }: Props) {
  const { mode } = useThemeMode()

  return (
    <MuiThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export function ThemeProvider({ children }: Props) {
  return (
    <ThemeModeProvider>
      <ClientOnly fallback={<div>Loading theme...</div>}>
        <ThemeSetup>{children}</ThemeSetup>
      </ClientOnly>
    </ThemeModeProvider>
  )
}
