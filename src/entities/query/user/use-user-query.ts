import { useQuery } from '@tanstack/react-query'
import { authApi } from 'entities/api'
import { getUserId } from 'shared/data-providers'

export const UserQueryKey = 'user-query'
export const useUserQuery = () => {
  const validUserId = !!getUserId() && getUserId() !== 'undefined'
  return useQuery({
    enabled: validUserId,
    queryKey: [UserQueryKey],
    queryFn: async () => {
      const response = await authApi.getUser()
      return response.data
    },
  })
}
