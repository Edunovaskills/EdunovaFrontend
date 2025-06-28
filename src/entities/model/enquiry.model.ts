import type { ApiContract } from './api-contract.model'

export type Enquiry = {
  _id: string
  userId: string
  fullName: string
  email: string
  phone: string
  message: string
  isResolved: boolean
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

type EnquiryData = {
  enquiries: Enquiry[]
} & Pagination

export type EnquiryResponse = ApiContract<EnquiryData>
