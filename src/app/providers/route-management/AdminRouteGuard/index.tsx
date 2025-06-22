import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { appPaths } from 'entities/config'
import { useUserSession } from 'entities/state/user-session/user-session.state'

type Props = {
  children: ReactNode
}

export function AdminRouteGuard({ children }: Props) {
  const { user } = useUserSession()

  if (user && user.data?.user.role !== 'admin') {
    return <Navigate to={appPaths['/']} replace />
  }

  return <>{children}</>
}
