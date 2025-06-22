import * as yup from 'yup'

export const verifyEmailSchema = yup.object({
  otp: yup.string().length(6).required('Please provide a valid OTP'),
  email: yup
    .string()
    .email('Please provide a valid email')
    .required('Please provide a valid email'),
})

export type VerifyEmailSchema = yup.InferType<typeof verifyEmailSchema>
