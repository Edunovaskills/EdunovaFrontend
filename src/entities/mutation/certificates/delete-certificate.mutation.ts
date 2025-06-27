// src/entities/mutation/certificates/delete-certificate.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminCertificateApi } from 'entities/api/admin/certificate/certificates.api';
import type { ErrorResponse } from 'entities/definitions';
import { AllCertificatesForAdminQueryKey } from 'entities/query'; // We'll create this
import { useSnackBar } from 'entities/state';

export const useDeleteCertificateMutation = () => {
  const queryClient = useQueryClient();
  const { show } = useSnackBar();
  return useMutation({
    mutationFn: async (key: string) => {
      const response = await adminCertificateApi.softDeleteCertificate(key);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AllCertificatesForAdminQueryKey],
      });
      show({
        title: 'Certificate deleted successfully',
        color: 'success',
      });
    },
    onError: (error: ErrorResponse) => {
      show({
        title: error.response?.data?.message || 'Failed to delete certificate.',
        color: 'error',
      });
    },
  });
};

