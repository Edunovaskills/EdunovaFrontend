import { useQuery } from '@tanstack/react-query'
import { eventsApi } from 'entities/api/events/events.api'
import type { EventResponse } from 'entities/model'

export const AllEventsQueryKey = 'all-events'

interface AllEventsQueryParams {
  page?: number
  limit?: number
  search?: string
}

export const useAllEventsQuery = (params: AllEventsQueryParams = {}) => {
  const { page = 1, limit = 10, search = '' } = params

  return useQuery<EventResponse>({
    queryKey: [AllEventsQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await eventsApi.getAllEvents(page, limit, search)
      return response.data
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  })
}
