import type { UserResponse } from 'entities/model'
import type {
  LoginSchema,
  SignUpSchema,
  VerifyEmailSchema,
} from 'features/schema'
import { getClient, type IClient } from 'shared/data-providers/model/fetcher'

export class AuthApi {
  client: IClient
  constructor(client: IClient) {
    this.client = client
  }

  async refreshToken() {
    const response = await this.client.get('refresh-token')
    return response.data
  }

  async login(loginPayload: LoginSchema) {
    const response = await this.client.post('login', loginPayload)
    return response
  }

  async signup(signupPayload: SignUpSchema) {
    const response = await this.client.post('signup', signupPayload)
    return response
  }

  async verifyEmail(verifyEmailPayload: VerifyEmailSchema) {
    const response = await this.client.post<UserResponse>(
      'verify-otp',
      verifyEmailPayload
    )
    return response
  }

  async resendOtp(resendOtpPayload: Partial<SignUpSchema>) {
    const response = await this.client.post('send-otp', resendOtpPayload)
    return response
  }

  async getUser() {
    const response = await this.client.get<UserResponse>('me')
    return response
  }
}

export const authApi = new AuthApi(getClient('auth'))
