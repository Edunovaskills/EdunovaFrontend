import React from 'react'

import {
  I18nProvider,
  QueryProvider,
  RouterProvider,
  ThemeProvider,
} from './providers'

const App = () => {
  return (
    <I18nProvider>
      <ThemeProvider>
        <QueryProvider>
          {/* TODO: Add Suspense fallback if there is any latency occur in future */}
          {/* <Suspense> */}
          <RouterProvider />
          {/* </Suspense> */}
        </QueryProvider>
      </ThemeProvider>
    </I18nProvider>
  )
}

export default App
