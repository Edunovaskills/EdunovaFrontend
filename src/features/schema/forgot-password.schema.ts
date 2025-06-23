import * as yup from 'yup'

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  isEmailSent: yup.boolean().required('Email is sent'),
  otp: yup.string().when('isEmailSent', (isEmailSent, schema) => {
    if (isEmailSent) {
      return schema.required()
    }
    return schema.optional()
  }),
  isOtpVerified: yup.boolean(),
  password: yup.string().when('isOtpVerified', (isOtpVerified, schema) => {
    if (isOtpVerified) {
      return schema.required()
    }
    return schema.optional()
  }),
  confirmPassword: yup
    .string()
    .when('isOtpVerified', (isOtpVerified, schema) => {
      if (isOtpVerified) {
        return schema
          .required()
          .oneOf([yup.ref('password')], 'Passwords must match')
      }
      return schema.optional()
    }),
})

export type ForgotPasswordSchema = yup.InferType<typeof forgotPasswordSchema>
