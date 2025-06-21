import React from 'react'

import {
  I18nProvider,
  QueryProvider,
  RouterProvider,
  ThemeProvider,
} from './providers'

// Import the new AuthProvider
import { AuthProvider } from './providers/auth-management/AuthContext'; // Adjust path if AuthContext.tsx is somewhere else

const App = () => {
  return (
    <I18nProvider>
      <ThemeProvider>
        <QueryProvider>
          <AuthProvider> {/* Add AuthProvider here, wrapping RouterProvider */}
            {/* TODO: Add Suspense fallback if there is any latency occur in future */}
            {/* <Suspense> */}
            <RouterProvider />
            {/* </Suspense> */}
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </I18nProvider>
  )
}

export default App