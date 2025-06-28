import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminEnquiryApi } from 'entities/api/admin/enquiry/enquiry.api'
import { AllEnquiryForAdminKey } from 'entities/query'
import { useSnackBar } from 'entities/state'

export const useMakeEnquiryResolvedMutation = () => {
  const { show } = useSnackBar()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await adminEnquiryApi.makeEnquiryResolved(id)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AllEnquiryForAdminKey],
      })
      show({
        title: 'Enquiry resolved successfully',
        color: 'Success',
      })
    },
    onError: () => {
      show({
        title: 'Failed to resolve enquiry',
        color: 'Error',
      })
    },
  })
}
