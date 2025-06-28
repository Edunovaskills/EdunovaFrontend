import { useMutation, useQueryClient } from '@tanstack/react-query'
import { testimonialApi } from 'entities/api/admin/testimonial/testimonial.api'
import { AllTestimonialForAdminQueryKey } from 'entities/query'
import { useSnackBar } from 'entities/state'

export const useDeleteTestimonialMutation = () => {
  const queryClient = useQueryClient()
  const { show } = useSnackBar()
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await testimonialApi.deleteTestimonial(id)
      return response.data
    },
    onSuccess: () => {
      show({
        title: 'Testimonial deleted successfully',
        color: 'Success',
      })
      queryClient.invalidateQueries({
        queryKey: [AllTestimonialForAdminQueryKey],
      })
    },
    onError: () => {
      show({
        title: 'Failed to delete testimonial',
        color: 'Error',
      })
    },
  })
}
