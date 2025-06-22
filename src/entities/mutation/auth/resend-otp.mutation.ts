import { useMutation } from '@tanstack/react-query'
import { authApi } from 'entities/api/Auth/auth.api'
import { useSnackBar } from 'entities/state/snack-bar.state'
import type { SignUpSchema } from 'features/schema'

export const useResendOtpMutation = () => {
  const { show } = useSnackBar()
  return useMutation({
    mutationFn: async (resendOtpPayload: Partial<SignUpSchema>) => {
      const response = await authApi.resendOtp(resendOtpPayload)
      return response.data
    },
    onSuccess: () => {
      show({
        title: 'OTP resent successfully',
        color: 'Success',
      })
    },
  })
}
