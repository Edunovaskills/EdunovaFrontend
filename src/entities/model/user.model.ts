import type { ApiContract } from './api-contract.model'

export type User = {
  user: {
    _id: string
    name: string
    email: string
    role: string
    isActive: boolean
    isVerified: boolean
    createdAt: string
    updatedAt: string
    __v: number
    lastLogin: string
  }
}

export type LoginResponse = ApiContract<User> & {
  accessToken: string
}
export type UserResponse = ApiContract<User>
