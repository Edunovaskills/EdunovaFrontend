import { useMutation, useQueryClient } from '@tanstack/react-query'
import { testimonialApi } from 'entities/api'
import { TestimonialQueryKey } from 'entities/query'
import { useAppNavigate, useSnackBar } from 'entities/state'
import type { TestimonialSchema } from 'features/schema'

export const useCreateTestimonialMutation = () => {
  const { show } = useSnackBar()
  const queryClient = useQueryClient()
  const { appNavigate } = useAppNavigate()

  return useMutation({
    mutationFn: async (body: TestimonialSchema) => {
      const response = await testimonialApi.createTestimonial(body)
      return response.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TestimonialQueryKey],
      })
      show({
        title: 'Testimonial created successfully',
        color: 'Success',
      })
      appNavigate('/')
    },
    onError: () => {
      show({
        title: 'Failed to create testimonial',
        color: 'Error',
      })
    },
  })
}
