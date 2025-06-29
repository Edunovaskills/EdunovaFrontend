import {
  LOWERCASE_LETTER_REGEX,
  PASSWORD_LENGTH_REGEX,
  SPECIAL_CHARACTER_REGEX,
  UPPERCASE_LETTER_REGEX,
} from 'shared/utils'
import * as yup from 'yup'

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required('Provide a valid password')
    .matches(
      PASSWORD_LENGTH_REGEX,
      'Password must be between 8 and 16 characters'
    )
    .matches(
      SPECIAL_CHARACTER_REGEX,
      'Password must contain at least one special character'
    )
    .matches(
      UPPERCASE_LETTER_REGEX,
      'Password must contain at least one uppercase letter'
    )
    .matches(
      LOWERCASE_LETTER_REGEX,
      'Password must contain at least one lowercase letter'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
  email: yup.string().email().required('Email is required'),
})

export type ResetPasswordSchema = yup.InferType<typeof resetPasswordSchema>
