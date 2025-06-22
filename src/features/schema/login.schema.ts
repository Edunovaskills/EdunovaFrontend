import * as yup from 'yup'

export const loginSchema = yup.object({
  email: yup.string().email().required('Provide a valid emails'),
  password: yup.string().required('provider a valid passwords'),
})

export type LoginSchema = yup.InferType<typeof loginSchema>
