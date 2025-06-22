import React, { Suspense } from 'react'

import {
  I18nProvider,
  QueryProvider,
  RouterProvider,
  ThemeProvider,
} from './providers'
import { SnackBarProvider } from 'entities/state'
import { LoadingComponent } from 'shared/components'

// Import the new AuthProvider

const App = () => {
  return (
    <I18nProvider>
      <ThemeProvider>
        <QueryProvider>
          <SnackBarProvider>
            <Suspense
              fallback={
                <LoadingComponent loading={true} message="Loading..." />
              }
            >
              <RouterProvider />
            </Suspense>
          </SnackBarProvider>
        </QueryProvider>
      </ThemeProvider>
    </I18nProvider>
  )
}

export default App
