import { useQuery } from '@tanstack/react-query'
import { adminEventApi } from 'entities/api/admin/events/events.api'
import type { EventResponse } from 'entities/model'

export const AllEventsForAdminQueryKey = 'all-events-for-admin'

interface AllEventsForAdminQueryParams {
  page?: number
  limit?: number
  search?: string
}

export const useAllEventsForAdminQuery = (
  params: AllEventsForAdminQueryParams = {}
) => {
  const { page = 1, limit = 10, search = '' } = params

  return useQuery<EventResponse>({
    queryKey: [AllEventsForAdminQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await adminEventApi.getAllEvents(page, limit, search)
      return response.data
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  })
}
