import { useMutation, useQueryClient } from '@tanstack/react-query'
import { testimonialApi } from 'entities/api/admin/testimonial/testimonial.api'
import { AllTestimonialForAdminQueryKey } from 'entities/query'
import { useSnackBar } from 'entities/state'

type Args = Parameters<typeof testimonialApi.updateTestimonial>[0]
export const useUpdateTestimonialMutation = () => {
  const queryClient = useQueryClient()
  const { show } = useSnackBar()
  return useMutation({
    mutationFn: async (args: Args) => {
      const response = await testimonialApi.updateTestimonial(args)
      return response.data
    },
    onSuccess: () => {
      show({
        title: 'Testimonial updated successfully',
        color: 'Success',
      })
      queryClient.invalidateQueries({
        queryKey: [AllTestimonialForAdminQueryKey],
      })
    },
    onError: () => {
      show({
        title: 'Failed to update testimonial',
        color: 'Error',
      })
    },
  })
}
