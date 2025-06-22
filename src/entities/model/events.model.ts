import { ApiContract, type PaginatedResponse } from './api-contract.model'

export type Event = {
  _id: string
  title: string
  description: string
  price: number
  paymentUrl: string
  image: string
  createdBy: string
  isActive: true
  createdAt: string
  updatedAt: string
  __v: number
}
export type EventResponse = ApiContract<{
  events: Event[]
}> &
  PaginatedResponse

export type EventDetail = ApiContract<{
  event: Event
}>
