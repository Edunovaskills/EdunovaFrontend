import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import Cookies from 'js-cookie'

import { baseServerUrl } from 'shared/environment'
import { getTimezoneOffset } from 'shared/utils'

import {
  ACCESS_TOKEN,
  COMPANY_ID_TOKEN,
  REFRESH_TOKEN,
  ACCEPT_LANGUAGE_TOKEN,
  USER_ID_TOKEN,
  acceptInviteEndpoint,
  getRefreshToken,
  loginEndpoint,
  refreshTokenEndpoint,
  signUpEndpoint,
  userSessionActive,
  userSessionInactive,
  TEAM_ID_TOKEN,
  WORKSPACE_ID_TOKEN,
} from './token'

type FailedQueue = Omit<PromiseWithResolvers<unknown>, 'promise'>[]

/**
 * Client Instance
 * @description Main axios instance for API calls with interceptors
 */
const clientInstance = axios.create({
  baseURL: baseServerUrl,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * Additional Instance
 * @description Additional axios instance for API calls with interceptors
 */
const additionalInstance = axios.create({
  baseURL: baseServerUrl, // NOTE: Add your base URL and update the interceptor configuration
  headers: { 'Content-Type': 'application/json' },
})

let isRefreshing = false

const failedClientQueue: FailedQueue = []
const failedAdditionalQueue: FailedQueue = []

function handleRequest(req: InternalAxiosRequestConfig) {
  // if(req)
  ;[
    ACCESS_TOKEN,
    USER_ID_TOKEN,
    ACCEPT_LANGUAGE_TOKEN,
    COMPANY_ID_TOKEN,
    TEAM_ID_TOKEN,
    WORKSPACE_ID_TOKEN,
  ].forEach((token) => {
    const tokenValue = Cookies.get(token)
    const offset = getTimezoneOffset()

    req.headers['x-timezone'] = offset

    if (tokenValue && tokenValue !== 'undefined') {
      req.headers[token] = tokenValue
    }
  })

  return req
}

function processQueue(error: AxiosError | null, token = null) {
  // TODO: Can be combined into one queue
  ;[failedClientQueue, failedAdditionalQueue].forEach((failedQueue) => {
    failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error)
      } else {
        promise.resolve(token)
      }
    })
    // failedQueue.length = 0
  })
}

function handleSuccess(response: AxiosResponse) {
  /**
   * set token if user is verified
   */
  if (
    response.config.url &&
    [
      refreshTokenEndpoint,
      loginEndpoint,
      signUpEndpoint,
      acceptInviteEndpoint,
    ].includes(response.config.url)
  ) {
    userSessionActive(response.headers)
  }
  return response
}

function handleError(instance: AxiosInstance, failedQueue: FailedQueue) {
  return async (error: AxiosError<unknown>) => {
    const status = error.response?.status
    const originalRequest = error.config

    if (
      status === 401 &&
      originalRequest?.url &&
      ![refreshTokenEndpoint, loginEndpoint].includes(originalRequest.url)
    ) {
      /**
       * if access-token is expired, get new access-token from refresh-token and retry requests
       */
      if (isRefreshing) {
        /**
         * if refresh token api is pending, adding new request to failed queue
         */
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((accessToken) => {
            originalRequest.headers[ACCESS_TOKEN] = accessToken
            return instance(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      // Setting isRefreshing to true to prevent multiple requests
      isRefreshing = true

      return clientInstance
        .post(refreshTokenEndpoint, {
          [REFRESH_TOKEN]: getRefreshToken(),
        })
        .then(async (res) => {
          const accessToken = res.headers[ACCESS_TOKEN]
          userSessionActive(res.headers)
          originalRequest.headers[ACCESS_TOKEN] = accessToken

          /**
           * processing all the failed request with new access token
           */
          return instance(originalRequest)
            .then((originalResponse) => {
              processQueue(null, accessToken)
              return originalResponse
            })
            .catch((originalError) => {
              processQueue(originalError, null)
              return Promise.reject(originalError)
            })
        })
        .catch((err: AxiosError) => {
          userSessionInactive()
          return Promise.reject(err)
        })
        .finally(() => {
          isRefreshing = false
        })
    }
    return Promise.reject(error)
  }
}

clientInstance.interceptors.request.use(handleRequest)
clientInstance.interceptors.response.use(
  handleSuccess,
  handleError(clientInstance, failedClientQueue)
)

additionalInstance.interceptors.request.use(handleRequest)
additionalInstance.interceptors.response.use(
  handleSuccess,
  handleError(additionalInstance, failedAdditionalQueue)
)

const axiosInstance = {
  client: clientInstance,
  additional: additionalInstance,
}

export default axiosInstance
export type AxiosInstanceTypes = keyof typeof axiosInstance
