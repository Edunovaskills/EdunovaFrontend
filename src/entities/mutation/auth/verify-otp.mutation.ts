import { useMutation } from '@tanstack/react-query'
import { authApi } from 'entities/api/Auth/auth.api'
import { useSnackBar } from 'entities/state'
import { ForgotPasswordSchema } from 'features/schema'

type VerifyOtpPayload = Pick<ForgotPasswordSchema, 'otp' | 'email'>

export const useVerifyOtpMutation = () => {
  const { show } = useSnackBar()
  return useMutation({
    mutationFn: async (verifyOtpPayload: VerifyOtpPayload) => {
      const response = await authApi.verifyForgotOtp(verifyOtpPayload)
      return response.data
    },
    onSuccess: () => {
      show({
        title: 'OTP verified successfully',
        color: 'Success',
      })
    },
  })
}
