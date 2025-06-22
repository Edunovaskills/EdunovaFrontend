import {
  appPathParams,
  appPaths,
  appSearchParams,
  type AppPathParams,
  type AppPathParamsName,
  type AppPathsName,
  type AppRouteStateValue,
  type AppSearchParamsName,
} from 'entities/config'
import { useCallback, useMemo } from 'react'
import type { NavigateOptions } from 'react-router-dom'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import type {
  AtLeastOneRequiredProperty,
  PartialRecord,
} from 'shared/typescript'

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

type UseAppRouteParams<
  TParamName extends AppPathParamsName,
  TSearchParamName extends AppSearchParamsName,
> = AtLeastOneRequiredProperty<{
  params: TParamName | TParamName[]
  searchParams: TSearchParamName | TSearchParamName[]
}>

/**
 * Hook to get the app route params from the URL
 */
export const useAppRouteParams = <
  TParamName extends AppPathParamsName,
  TSearchParamName extends AppSearchParamsName,
>({
  params,
  searchParams,
}: UseAppRouteParams<TParamName, TSearchParamName>) => {
  const pathParamsObj = useParams<AppPathParams[AppPathParamsName]>()

  const paramsValue = useMemo(() => {
    let paramArray: TParamName[] = []
    if (Array.isArray(params)) {
      paramArray = params
    } else if (params) {
      paramArray = [params]
    }

    const paramsValue = paramArray.reduce(
      (acc, param) => ({
        ...acc,
        [param]: pathParamsObj[appPathParams[param]],
      }),
      {} as Record<TParamName, string | undefined>
    )

    return paramsValue
  }, [params, pathParamsObj])

  const [searchParamsObj] = useSearchParams()

  const searchParamsValue = useMemo(() => {
    let searchParamArray: TSearchParamName[] = []
    if (Array.isArray(searchParams)) {
      searchParamArray = searchParams
    } else if (searchParams) {
      searchParamArray = [searchParams]
    }

    const paramsValue = searchParamArray.reduce(
      (acc, param) => ({
        ...acc,
        [param]: searchParamsObj.get(appSearchParams[param]),
      }),
      {} as Record<TSearchParamName, string | undefined>
    )

    return paramsValue
  }, [searchParams, searchParamsObj])

  // TODO: Implement search params
  // const getParam = (param: string) => searchParams.get(param)

  return {
    ...paramsValue,
    ...searchParamsValue,
  }
}
