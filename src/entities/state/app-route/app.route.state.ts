import {
  appPathParams,
  appPaths,
  type AppPathParamsName,
  type AppPathsName,
  type AppRouteStateValue,
} from 'entities/config'
import { useCallback } from 'react'
import type { NavigateOptions } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import type { PartialRecord } from 'shared/typescript'

export const getAppPath = (
  path: AppPathsName,
  params?: PartialRecord<AppPathParamsName, string>
): string => {
  return Object.entries(params ?? []).reduce((path, [key, value]) => {
    return path.replace(`:${appPathParams[key as AppPathParamsName]}`, value)
  }, appPaths[path] as string)
}
type GetAppPathArgs = Parameters<typeof getAppPath>
type PartialAppRouteState = Partial<AppRouteStateValue>

export const useAppRouteState = () => {
  const { pathname, state } = useLocation()

  const isRouteActive = useCallback(
    (routeName: AppPathsName) => {
      return pathname === appPaths[routeName]
    },
    [pathname]
  )

  const getAppRoute = useCallback((routeName: AppPathsName) => {
    return appPaths[routeName]
  }, [])

  return {
    isRouteActive,
    getAppRoute,
    state: (state ?? {}) as PartialAppRouteState,
  }
}

export const useAppNavigate = () => {
  const navigate = useNavigate()

  const appNavigate = useCallback(
    (
      path: GetAppPathArgs[0],
      navOptions?: Omit<NavigateOptions, 'state'> &
        GetAppPathArgs[1] & { state?: PartialAppRouteState }
    ) => {
      navigate(
        {
          pathname: getAppPath(path, navOptions),
          search: new URLSearchParams().toString(),
        },
        navOptions
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate]
  )

  return { appNavigate }
}
