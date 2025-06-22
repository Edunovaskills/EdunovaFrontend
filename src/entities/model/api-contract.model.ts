export type ApiContract<T extends object> = {
  success: boolean
  message: string
  data?: T
}
