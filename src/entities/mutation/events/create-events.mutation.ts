import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminEventApi } from 'entities/api'
import type { ErrorResponse } from 'entities/definitions'
import { AllEventsQueryKey } from 'entities/query'
import { useSnackBar } from 'entities/state'
import type { EventSchema } from 'features/schema'

type CreateEventPayload = {
  data: EventSchema
  imageFile: File
}

export const useCreateEventMutation = () => {
  const { show } = useSnackBar()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ data, imageFile }: CreateEventPayload) => {
      const res = await adminEventApi.createEvent(data, imageFile)
      return res.data
    },
    onSuccess: () => {
      show({
        title: 'Event created successfully',
        color: 'Success',
      })
      queryClient.invalidateQueries({ queryKey: [AllEventsQueryKey] })
    },
    onError: (error: ErrorResponse) => {
      show({
        title: error.response?.data.error,
        color: 'Error',
      })
    },
  })
}
