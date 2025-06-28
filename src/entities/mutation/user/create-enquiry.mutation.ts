import { useMutation } from '@tanstack/react-query'
import { userApi } from 'entities/api'
import type { ErrorResponse } from 'entities/definitions'
import { useSnackBar } from 'entities/state'
import { EnquirySchema } from 'features/schema'

export const useCreateEnquiryMutation = () => {
  const { show } = useSnackBar()
  return useMutation({
    mutationFn: async (enquiry: EnquirySchema) => {
      const response = await userApi.createEnquiry(enquiry)
      return response.data
    },
    onSuccess: () => {
      show({
        title: 'Enquiry created successfully',
        color: 'Success',
      })
    },
    onError: (error: ErrorResponse) => {
      show({
        title: error.message || 'Failed to create enquiry',
        color: 'Error',
      })
    },
  })
}
