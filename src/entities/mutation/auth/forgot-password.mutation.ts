import { useMutation } from '@tanstack/react-query'
import { authApi } from 'entities/api/Auth/auth.api'
import { useSnackBar } from 'entities/state'
import { ForgotPasswordSchema } from 'features/schema'

export const useForgotPasswordMutation = () => {
  const { show } = useSnackBar()
  return useMutation({
    mutationFn: async (
      forgotPasswordPayload: ForgotPasswordSchema['email']
    ) => {
      const response = await authApi.forgotPassword(forgotPasswordPayload)
      return response.data
    },
    onSuccess: () => {
      show({
        title: 'OTP sent successfully',
        color: 'Success',
      })
    },
  })
}
