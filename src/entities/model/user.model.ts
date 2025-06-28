import type { ApiContract } from './api-contract.model'

export type UserRole = 'admin' | 'user'
export type User = {
  user: {
    _id: string
    name: string
    email: string
    role: string
    isActive: boolean
    isVerified: boolean
    createdAt: string // ISO timestamp
    updatedAt: string // ISO timestamp
    __v: number
    lastLogin: string // ISO timestamp
  }
}

export type LoginResponse = ApiContract<User> & {
  accessToken: string
}
export type UserResponse = ApiContract<User>

export type Pagination = {
  pagination: {
    totalUsers: number
    totalPages: number
    currentPage: number
    pageSize: number
  }
}

type AllUsersType = {
  users: User['user'][]
} & Pagination

export type UsersResponse = ApiContract<AllUsersType>
