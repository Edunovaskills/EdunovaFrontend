import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminEventApi } from 'entities/api/admin/events/events.api'
import { AllEventsForAdminQueryKey } from 'entities/query'
import { useSnackBar } from 'entities/state'
import type { ErrorResponse } from 'entities/definitions'

export const useDeleteEventMutation = () => {
  const queryClient = useQueryClient()
  const { show } = useSnackBar()
  return useMutation({
    mutationFn: async (eventId: string) => {
      const response = await adminEventApi.deleteEvent(eventId)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AllEventsForAdminQueryKey],
      })
      show({
        title: 'Event deleted successfully',
        color: 'Success',
      })
    },
    onError: (error: ErrorResponse) => {
      show({
        title:
          error.response?.data.message ||
          error.message ||
          'Failed to delete event',
        color: 'Error',
      })
    },
  })
}
