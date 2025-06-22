import { useMutation } from '@tanstack/react-query'
import { authApi } from 'entities/api/Auth/auth.api'
import { useAppNavigate } from 'entities/state'
import { useSnackBar } from 'entities/state/snack-bar.state'
import type { SignUpSchema } from 'features/schema'

export const useSignUpMutation = () => {
  const { show } = useSnackBar()
  const { appNavigate } = useAppNavigate()
  return useMutation({
    mutationFn: async (loginPayload: SignUpSchema) => {
      const response = await authApi.signup(loginPayload)
      return response.data
    },
    onSuccess: (_, body) => {
      show({
        title: 'OTP sent to your email',
        color: 'Success',
      })
      appNavigate('verifyEmail', {
        state: {
          ...body,
        },
      })
    },
    onError: () => {
      show({
        title: 'Sign up failed',
        color: 'Error',
      })
    },
  })
}
