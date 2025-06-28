import { useQuery } from '@tanstack/react-query'
import { adminEnquiryApi } from 'entities/api/admin/enquiry/enquiry.api'

export const EnquiryByIdKey = 'enquiry-by-id'

export const useEnquiryByIdQuery = (id?: string) => {
  return useQuery({
    queryKey: [EnquiryByIdKey, id],
    queryFn: async () => {
      if (!id) return
      const response = await adminEnquiryApi.getEnquiryById(id)
      return response.data
    },
  })
}
