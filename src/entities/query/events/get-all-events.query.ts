import { useQuery } from '@tanstack/react-query'
import { eventsApi } from 'entities/api/events/events.api'

export const AllEventsQueryKey = 'all-events'
export const useAllEventsQuery = () => {
  return useQuery({
    queryKey: [AllEventsQueryKey],
    queryFn: async () => {
      const response = await eventsApi.getAllEvents()
      return response.data
    },
  })
}
