import { ApiContract, type PaginatedResponse } from './api-contract.model'

export type Course = {
  _id: string
  title: string
  description: string
  image: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export type CourseResponse = ApiContract<{ courses: Course[] }> &
  PaginatedResponse
