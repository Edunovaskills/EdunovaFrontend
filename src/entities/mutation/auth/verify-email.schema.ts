import { useMutation } from '@tanstack/react-query'
import { authApi } from 'entities/api/Auth/auth.api'
import { useAppNavigate, useSnackBar } from 'entities/state'
import type { VerifyEmailSchema } from 'features/schema'

export const useVerifyEmailMutation = () => {
  const { show } = useSnackBar()
  const { appNavigate } = useAppNavigate()
  return useMutation({
    mutationFn: async (verifyEmailPayload: VerifyEmailSchema) => {
      const response = await authApi.verifyEmail(verifyEmailPayload)
      return response.data
    },
    onSuccess: () => {
      show({
        title: 'Sign up successfully',
        color: 'Success',
      })
      appNavigate('/')
    },
  })
}
