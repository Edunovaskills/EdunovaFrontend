import { useUserQuery } from 'entities/query'
import { USER_ID_TOKEN } from 'shared/data-providers/model/token'
import { useLocalState } from 'shared/hooks'

export const useUserSession = () => {
  const [isLoggedIn] = useLocalState(USER_ID_TOKEN, '', 'cookie')
  const { data, refetch } = useUserQuery()

  return {
    isLoggedIn: !!isLoggedIn,
    user: data,
    refetch,
  }
}
