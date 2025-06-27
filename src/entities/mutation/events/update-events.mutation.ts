import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminEventApi } from 'entities/api/admin/events/events.api'
import { AllEventsForAdminQueryKey } from 'entities/query'
import { useSnackBar } from 'entities/state'
import type { ErrorResponse } from 'entities/definitions'
import type { EventSchema } from 'features/schema'

type UpdateEventPayload = {
  eventId: string
  data: EventSchema
  imageFile?: File
}

export const useUpdateEventMutation = () => {
  const queryClient = useQueryClient()
  const { show } = useSnackBar()
  return useMutation({
    mutationFn: async ({ eventId, data, imageFile }: UpdateEventPayload) => {
      const response = await adminEventApi.updateEvent(eventId, data, imageFile)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AllEventsForAdminQueryKey],
      })
      show({
        title: 'Event updated successfully',
        color: 'Success',
      })
    },
    onError: (error: ErrorResponse) => {
      show({
        title:
          error.response?.data.message ||
          error.message ||
          'Failed to update event',
        color: 'Error',
      })
    },
  })
}
