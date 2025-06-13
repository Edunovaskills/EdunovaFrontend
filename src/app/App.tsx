import React, { Suspense } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { I18nProvider, RouterProvider, ThemeProvider } from './providers'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})

const App = () => {
  return (
    <I18nProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          {/* TODO: Add Suspense fallback if there is any latency occur in future */}
          {/* <Suspense> */}
          <RouterProvider />
          {/* </Suspense> */}
        </QueryClientProvider>
      </ThemeProvider>
    </I18nProvider>
  )
}

export default App
