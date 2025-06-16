import { useCallback, useEffect, useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Nullable } from 'shared/typescript'

import { useEntitiesTranslation } from 'entities/locale'

import { initQueryClient } from '../query-client'
import { noErrorMessageCodeList } from 'entities/definitions'

type Props = {
  readonly children: React.ReactNode
}

export function QueryProvider({ children }: Props) {
  const { tEntities } = useEntitiesTranslation('errorEn')

  const [queryClient, setQueryClient] = useState<Nullable<QueryClient>>(null)

  const setQueryClientPersistently = useCallback(() => {
    setQueryClient(
      initQueryClient({
        onError: (err) => {
          const defaultMessage = err?.message || tEntities('default.label')
          if (err?.code && noErrorMessageCodeList.includes(err.code)) return
          console.error('global query err', err)
        },
      })
    )
  }, [tEntities])

  useEffect(() => {
    setQueryClientPersistently()
  }, [setQueryClientPersistently])

  if (!queryClient) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
    </QueryClientProvider>
  )
}
