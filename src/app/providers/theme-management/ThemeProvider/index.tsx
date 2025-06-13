import { CssBaseline } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

import { ThemeModeProvider, useThemeMode } from 'shared/state'

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
      <ThemeSetup>{children}</ThemeSetup>
    </ThemeModeProvider>
  )
}
