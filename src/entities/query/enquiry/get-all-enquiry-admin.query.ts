import { useQuery } from '@tanstack/react-query'
import { adminEnquiryApi } from 'entities/api/admin/enquiry/enquiry.api'
import type { PaginationParams } from 'entities/model'

export const AllEnquiryForAdminKey = 'all-enquiry-for-admin'
export const useAllEnquiryAdminQuery = (params: PaginationParams) => {
  return useQuery({
    queryKey: [AllEnquiryForAdminKey, params],
    queryFn: async () => {
      const response = await adminEnquiryApi.getAllEnquiries(params)
      return response.data
    },
  })
}
