import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { NoTrailingSegment, SuggestionString } from 'shared/typescript'

import axiosInstance, { AxiosInstanceTypes } from './axios'

type ParamConfig = Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>

type ClientOptions = {
  axiosInstanceType: AxiosInstanceTypes
  type: SuggestionString<'api'>
  version: `v${number}`
}

export function getClient<BaseSegment extends string>(
  baseSegment = '' as NoTrailingSegment<'/', BaseSegment>,
  options?: Partial<ClientOptions>
) {
  const {
    axiosInstanceType = 'client',
    type = 'api',
    version = 'v1',
  } = options || {}

  const instance = axiosInstance[axiosInstanceType]

  const getRequestConfig = ({ url, ...restConfig }: AxiosRequestConfig) => {
    return {
      // www.example.com/api/v1/...
      url: `${type}/${version}/${baseSegment}${url ? `/${url}` : ''}`,
      ...restConfig,
    }
  }

  return {
    /**
     * To fetch a resource
     * @param url api path
     * @param paramConfig axios parameters
     */
    get: async <TRes = unknown>(url: string, paramConfig: ParamConfig = {}) =>
      instance
        .request<unknown, AxiosResponse<TRes>>(
          getRequestConfig({ url, method: 'GET', ...paramConfig })
        )
        .then((response) => {
          return response
        })
        .catch((err) => {
          throw err
        }),

    /**
     * To create a resource
     * @param url api path
     * @param data Body to send
     * @param paramConfig axios parameters
     */
    post: async <TRes = unknown, TData = unknown>(
      url: string,
      data: TData,
      paramConfig: ParamConfig = {}
    ) =>
      instance
        .request<TData, AxiosResponse<TRes>>(
          getRequestConfig({ url, method: 'POST', data, ...paramConfig })
        )
        .then((response) => {
          return response
        })
        .catch((err) => {
          throw err
        }),

    postWithFilter: async <TRes = unknown, TData = unknown>(
      url: string,
      data: TData,
      paramConfig: ParamConfig = {}
    ) =>
      instance
        .request<TData, AxiosResponse<TRes>>(
          getRequestConfig({ url, method: 'POST', data, ...paramConfig })
        )
        .then((response) => {
          return response
        })
        .catch((err) => {
          throw err
        }),
    /**
     * To update a full data of resource
     * @param url api path
     * @param data Body to send
     * @param paramConfig axios parameters
     */
    put: async <TRes = unknown, TData = unknown>(
      url: string,
      data: TData,
      paramConfig: ParamConfig = {}
    ) =>
      instance
        .request<TData, AxiosResponse<TRes>>(
          getRequestConfig({ url, method: 'PUT', data, ...paramConfig })
        )
        .then((response) => {
          return response
        })
        .catch((err) => {
          throw err
        }),

    /**
     * To update partial data of a resource
     * @param url api path
     * @param data Body to send
     * @param paramConfig axios parameters
     */
    patch: async <TRes = unknown, TData = unknown>(
      url: string,
      data: TData,
      paramConfig: ParamConfig = {}
    ) =>
      instance
        .request<TData, AxiosResponse<TRes>>(
          getRequestConfig({ url, method: 'PATCH', data, ...paramConfig })
        )
        .then((response) => {
          return response
        })
        .catch((err) => {
          throw err
        }),

    /**
     * To delete the resource
     * @param url api path
     * @param paramConfig axios parameters
     */
    delete: async <TRes = unknown>(
      url: string,
      paramConfig: ParamConfig = {}
    ) =>
      instance
        .request<unknown, AxiosResponse<TRes>>(
          getRequestConfig({ url, method: 'DELETE', ...paramConfig })
        )
        .then((response) => {
          return response
        })
        .catch((err) => {
          throw err
        }),
  }
}

export type IClient = ReturnType<typeof getClient>
