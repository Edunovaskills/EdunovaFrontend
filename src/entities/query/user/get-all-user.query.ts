import { useQuery } from '@tanstack/react-query'
import { adminUserApi } from 'entities/api/admin/users/users.api'
import type { PaginationParams } from 'entities/model'

export const AllUsersQueryKey = 'all-users'
export const useAllUsersQuery = (params?: PaginationParams) => {
  return useQuery({
    queryKey: [AllUsersQueryKey, params],
    queryFn: () => adminUserApi.getAllUsers(params),
  })
}
