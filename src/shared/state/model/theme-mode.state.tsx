import { createContext, useContext, useMemo, useState } from 'react'

import { PaletteMode } from '@mui/material'

export type ThemeMode = PaletteMode

type ThemeModeContextType = {
  mode: ThemeMode
  setTheme: (mode: ThemeMode) => void
  toggleTheme: () => void
}

const ThemeModeContext = createContext<ThemeModeContextType>({
  mode: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
})

export const useThemeMode = () => useContext(ThemeModeContext)

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const themeModeContextValue = useMemo(
    () =>
      ({
        mode: themeMode,
        setTheme: (mode: ThemeMode) => {
          setThemeMode(mode)
        },
        toggleTheme: () => {
          setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
        },
      }) as ThemeModeContextType,
    [themeMode]
  )

  return (
    <ThemeModeContext.Provider value={themeModeContextValue}>
      {children}
    </ThemeModeContext.Provider>
  )
}
