import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ErrorResponse } from 'entities/definitions'
import { AllCertificatesForAdminQueryKey } from 'entities/query'
import { useSnackBar } from 'entities/state'
import { adminCertificateApi } from 'entities/api/admin/certificate/certificates.api'
import type { CertificationPayload } from 'entities/model'

export const useCreateCertificateMutation = () => {
  const { show } = useSnackBar()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: CertificationPayload) => {
      const response = await adminCertificateApi.createCertificate(payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AllCertificatesForAdminQueryKey],
      })
      show({
        title: 'Certificate created successfully',
        color: 'Success',
      })
    },
    onError: (error: ErrorResponse) => {
      show({
        title: error.response?.data?.message || 'Failed to create certificate.',
        color: 'Error',
      })
    },
  })
}
