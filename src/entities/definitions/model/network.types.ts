import { AxiosError } from 'axios'

export enum ERROR_RESPONSE_TYPES {
  ConfigNotPreset = 'CONFIG_NOT_PRESENT',
  ConfigNotFound = 'CONFIG_NOT_FOUND',
  InvalidData = 'INVALID_DATA',
  ChatNotFound = 'CHAT_NOT_FOUND',
  ConversationNotFound = 'CONVERSATION_NOT_FOUND',
  MessageNotFound = 'MESSAGE_NOT_FOUND',
  UserNotFound = 'USER_NOT_FOUND',
  UserInactive = 'USER_IS_INACTIVE',
  ConnectionFailed = 'CONNECTION_FAILED',
  DatabaseOperationFailed = 'DATABASE_OPERATION_FAILED',
  ChatIdRequired = 'CHAT_ID_REQUIRED',
  ConfigAlreadyExists = 'CONFIG_ALREADY_PRESENT',
  ResetLinkExpired = 'RESET_PASSWORD_LINK_EXPIRE',
  WrongPassword = 'WRONG_PASSWORD',
  OTPExpired = 'OTP_EXPIRE',
  IncorrectOtp = 'INCORRECT_OTP',
  EmailNotFound = 'EMAIL_NOT_FOUND',
}

export type ErrorResponseCode = `COSTIMISER_${number}` | `COSTIMISER${number}`

export const noErrorMessageCodeList: ErrorResponseCode[] = ['COSTIMISER1001']

export type NetworkErrorResponse = {
  code: ErrorResponseCode
  message: string
  debugId: string
  type: ERROR_RESPONSE_TYPES
  error: string
}

export type ErrorResponse = AxiosError<NetworkErrorResponse>
