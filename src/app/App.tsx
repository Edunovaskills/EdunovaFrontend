import React from 'react'

import {
  I18nProvider,
  QueryProvider,
  RouterProvider,
  ThemeProvider,
} from './providers'
import { SnackBarProvider } from 'entities/state'

// Import the new AuthProvider

const App = () => {
  return (
    <I18nProvider>
      <ThemeProvider>
        <QueryProvider>
          <SnackBarProvider>
            <RouterProvider />
          </SnackBarProvider>
        </QueryProvider>
      </ThemeProvider>
    </I18nProvider>
  )
}

export default App
