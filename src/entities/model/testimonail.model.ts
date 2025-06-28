import type { ApiContract } from './api-contract.model'

export interface Testimonial {
  _id: string
  name: string
  designation: string
  message: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

type Pagination = {
  count: number
  total: number
  currentPage: number
  totalPages: number
}

type TestimonialType = {
  testimonials: Testimonial[]
} & Pagination

export type TestimonialResponse = ApiContract<TestimonialType>
