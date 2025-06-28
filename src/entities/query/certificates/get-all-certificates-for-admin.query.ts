// src/entities/query/certificates/get-all-certificates-for-admin.query.ts
import { useQuery } from '@tanstack/react-query'
import { adminCertificateApi } from 'entities/api/admin/certificate/certificates.api'
import type { CertificateResponse } from 'entities/model/certificate.model'

export const AllCertificatesForAdminQueryKey = 'all-certificates-for-admin'

interface AllCertificatesForAdminQueryParams {
  page?: number
  limit?: number
  search?: string
}

export const useAllCertificatesForAdminQuery = (
  params: AllCertificatesForAdminQueryParams = {}
) => {
  const { page = 1, limit = 10, search = '' } = params

  return useQuery<CertificateResponse>({
    queryKey: [AllCertificatesForAdminQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await adminCertificateApi.getAllCertificates(
        page,
        limit,
        search
      )
      return response // API already returns the full response object with data
    },
    placeholderData: (previousData) => previousData, // Keep previous data while fetching new
  })
}
