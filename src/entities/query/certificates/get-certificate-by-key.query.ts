// src/entities/query/certificates/get-certificate-by-key.query.ts
import { useQuery } from '@tanstack/react-query'
import {
  certificateDownloadApi,
  certificatesApi,
} from 'entities/api/certificates/certificates.api'
import type { CertificateDetails } from 'entities/model/certificate.model'
import { useSnackBar } from 'entities/state'

export const GetCertificateByKeyQueryKey = 'get-certificate-by-key'

export const useCertificateByKeyQuery = (key?: string) => {
  return useQuery<CertificateDetails>({
    queryKey: [GetCertificateByKeyQueryKey, key],
    queryFn: async () => {
      if (!key) {
        return Promise.reject(new Error('Certificate key is required'))
      }
      const response = await certificatesApi.getCertificateByKey(key)
      return response // API already returns the full response object with data
    },
    enabled: !!key, // Only run the query if a key is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    placeholderData: (previousData) => previousData,
  })
}

// Hook for downloading a certificate (not a typical query, but a utility hook)
export const useDownloadCertificate = () => {
  const { show } = useSnackBar()

  const download = async (key: string) => {
    try {
      const blob = await certificateDownloadApi.downloadCertificate(key)
      // Create a temporary URL for the blob and trigger download
      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `certificate-${key}.pdf`) // Filename
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)
      window.URL.revokeObjectURL(url) // Clean up the URL

      show({
        title: 'Certificate download initiated!',
        color: 'Success',
      })
    } catch (error) {
      console.error('Failed to download certificate:', error)
      show({
        title:
          (error as any)?.response?.data?.message ||
          'Failed to download certificate.',
        color: 'Error',
      })
    }
  }

  return { download }
}
