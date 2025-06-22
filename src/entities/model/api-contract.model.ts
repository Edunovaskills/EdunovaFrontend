export type ApiContract<T extends object> = {
  success: boolean
  message: string
  data?: T
}

export type PaginatedResponse = {
  total: 0
  currentPage: 1
  totalPages: 0
}
