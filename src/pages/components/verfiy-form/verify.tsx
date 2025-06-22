import { Navigate } from 'react-router-dom'

import { appPaths } from 'entities/config'
import { useAppRouteState } from 'entities/state'

import { VerifyEmailForm } from 'features/components'

export function VerifyEmailPage() {
  const { state } = useAppRouteState()

  if (!state.email || !state.password || !state.name) {
    return <Navigate to={appPaths.userLogin} />
  }

  return (
    <VerifyEmailForm
      signUpPayload={{
        email: state.email,
        password: state.password,
        name: `${state.firstName} ${state.lastName}`,
      }}
    />
  )
}
