import { useQuery } from '@tanstack/react-query'
import { adminEventApi } from 'entities/api/admin/events/events.api'
import type { EventDetail } from 'entities/model'

export const GetEventByIdAdminQueryKey = 'get-event-by-id-admin'

export const useEventByIdAdminQuery = (eventId?: string) => {
  return useQuery<EventDetail>({
    queryKey: [GetEventByIdAdminQueryKey, eventId],
    queryFn: async () => {
      if (!eventId) return Promise.reject(new Error('Event ID is required'))
      const response = await adminEventApi.getEventById(eventId)
      return response.data
    },
    enabled: !!eventId,
    staleTime: 0, // Admin data should be fresh
    gcTime: 5 * 60 * 1000,
  })
}
