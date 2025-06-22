import { useQuery } from '@tanstack/react-query'
import { eventsApi } from 'entities/api/events/events.api'

export const EventByIdQueryKey = 'event-by-id'

export const useEventByIdQuery = (eventId: string) => {
  return useQuery({
    queryKey: [EventByIdQueryKey, eventId],
    queryFn: async () => {
      const response = await eventsApi.getEventById(eventId)
      return response.data
    },
  })
}
