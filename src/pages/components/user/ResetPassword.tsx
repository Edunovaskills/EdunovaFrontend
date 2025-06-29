import { useAppRouteState } from 'entities/state'
import { ResetPassword } from 'features/components'

export const ResetPasswordPage = () => {
  const { state } = useAppRouteState()
  const { email } = state
  return (
    <div className="min-h-screen flex items-center justify-center">
      <ResetPassword email={email ?? ''} />
    </div>
  )
}
