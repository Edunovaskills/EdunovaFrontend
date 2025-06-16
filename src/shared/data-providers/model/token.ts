import { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'

export const ACCESS_TOKEN = 'x-access-token'
export const REFRESH_TOKEN = 'x-access-refresh-token'
export const USER_ID_TOKEN = 'x-user-id'
export const COMPANY_ID_TOKEN = 'x-company-id'
export const ACCEPT_LANGUAGE_TOKEN = 'Accept-Language'
export const WORKSPACE_ID_TOKEN = 'x-workspace-id'
export const TEAM_ID_TOKEN = 'x-team-id'

const loginTokens = [
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  COMPANY_ID_TOKEN,
  USER_ID_TOKEN,
  WORKSPACE_ID_TOKEN,
  TEAM_ID_TOKEN,
] as const

// FIXME: Add as per your API endpoint or get them while creating instance
export const loginEndpoint = 'api/v1/users/login'
export const signUpEndpoint = 'api/v1/users/verify-email'
export const refreshTokenEndpoint = 'api/v1/users/refresh-token'
export const acceptInviteEndpoint = 'api/v1/users/accept-invitation'

export const userSessionActive = (headers: AxiosResponse['headers']) => {
  loginTokens.forEach((tokenName) => {
    // token name are converted to lowercase to match with the headers as they are case-insensitive
    Cookies.remove(tokenName)
    Cookies.set(tokenName, headers[tokenName.toLowerCase()])
  })
}

export const userSessionInactive = () => {
  loginTokens.forEach((tokenName) => {
    Cookies.remove(tokenName)
  })
  window.location.replace('/sign-in')
}

export const getUserId = () => Cookies.get(USER_ID_TOKEN) ?? ''
export const getAccessToken = () => Cookies.get(ACCESS_TOKEN) ?? ''
export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN) ?? ''
export const getCompanyId = () => Cookies.get(COMPANY_ID_TOKEN) ?? ''

export const getWorkspaceId = () => Cookies.get(WORKSPACE_ID_TOKEN) ?? ''
export const getTeamId = () => Cookies.get(TEAM_ID_TOKEN) ?? ''
