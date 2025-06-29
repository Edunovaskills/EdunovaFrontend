import { useQuery } from '@tanstack/react-query'
import { testimonialApi } from 'entities/api/admin/testimonial/testimonial.api'
import { userApi } from 'entities/api/user.api'
import { PaginationParams } from 'entities/model'

export const AllTestimonialForAdminQueryKey = 'all-testimonials-for-admin'
export const useTestimonialsForAdminQuery = (params: PaginationParams) => {
  return useQuery({
    queryKey: [AllTestimonialForAdminQueryKey, params],
    queryFn: async () => {
      const response = await testimonialApi.getTestimonials(params)
      return response.data
    },
  })
}

export const TestimonialQueryKey = 'testimonials-query'
export const useTestimonialsQuery = () => {
  return useQuery({
    queryKey: [TestimonialQueryKey],
    queryFn: async () => {
      const response = await userApi.getTestimonials()
      return response.data
    },
  })
}
