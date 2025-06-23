import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminEventApi } from 'entities/api'
import { AllEventsQueryKey } from 'entities/query'
import { useSnackBar } from 'entities/state'
import type { EventSchema } from 'features/schema'

export const useCreateEventMutation = () => {
  const { show } = useSnackBar()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (body: EventSchema) => {
      const res = await adminEventApi.createEvent(body)
      return res.data
    },
    onSuccess: () => {
      show({
        title: 'Event created successfully',
        color: 'Success',
      })
      queryClient.invalidateQueries({ queryKey: [AllEventsQueryKey] })
    },
    onError: () => {
      show({
        title: 'Failed to create event',
        color: 'Error',
      })
    },
  })
}
