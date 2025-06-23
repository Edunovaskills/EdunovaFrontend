import { useMutation } from '@tanstack/react-query'
import { authApi } from 'entities/api/Auth/auth.api'
import { useAppNavigate, useSnackBar } from 'entities/state'
import { ForgotPasswordSchema } from 'features/schema'

export const useResetPasswordMutation = () => {
  const { show } = useSnackBar()
  const { appNavigate } = useAppNavigate()
  return useMutation({
    mutationFn: async (resetPasswordPayload: ForgotPasswordSchema) => {
      const response = await authApi.resetPassword(resetPasswordPayload)
      return response.data
    },
    onSuccess: () => {
      show({
        title: 'Password reset successfully',
        color: 'Success',
      })
      appNavigate('/')
    },
    onError: () => {
      show({
        title: 'Failed to reset password',
        color: 'Error',
      })
    },
  })
}
