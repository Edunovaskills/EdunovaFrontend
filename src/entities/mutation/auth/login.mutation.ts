import { useMutation } from '@tanstack/react-query'
import { authApi } from 'entities/api/Auth/auth.api'
import { useAppNavigate } from 'entities/state'
import { useSnackBar } from 'entities/state/snack-bar.state'
import type { LoginSchema } from 'features/schema'

export const useLoginMutation = () => {
  const { show } = useSnackBar()
  const { appNavigate } = useAppNavigate()
  return useMutation({
    mutationFn: async (loginPayload: LoginSchema) => {
      const response = await authApi.login(loginPayload)
      return response.data
    },
    onSuccess: () => {
      show({
        title: 'Login Successfully',
        color: 'Success',
      })
      appNavigate('/')
    },
  })
}
