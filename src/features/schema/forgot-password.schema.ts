import * as yup from 'yup'

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  isEmailSent: yup.boolean().required('Email is sent'),
  otp: yup.string().when('isEmailSent', (isEmailSent, schema) => {
    const switchOIsEmailSent = Array.isArray(isEmailSent)
      ? isEmailSent[0]
      : isEmailSent
    if (switchOIsEmailSent) {
      return schema.required()
    }
    return schema.optional()
  }),
})

export type ForgotPasswordSchema = yup.InferType<typeof forgotPasswordSchema>
