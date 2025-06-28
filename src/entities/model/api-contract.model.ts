export type ApiContract<T extends object> = {
  success: boolean
  message: string
  data?: T
}

export type PaginatedResponse = {
  total: number
  currentPage: number
  totalPages: number
}

export type PaginationParams = {
  page: number
  limit: number
}
