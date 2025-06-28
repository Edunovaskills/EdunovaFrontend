import React, { Suspense } from 'react'

import {
  I18nProvider,
  QueryProvider,
  RouterProvider,
  ThemeProvider,
} from './providers'
import { SnackBarProvider } from 'entities/state'
import { LoadingComponent, ErrorBoundary } from 'shared/components'

// Import the new AuthProvider

const App = () => {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  )
}

export default App
