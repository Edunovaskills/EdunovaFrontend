import * as yup from 'yup'
import { loginSchema } from './login.schema'
import {
  LOWERCASE_LETTER_REGEX,
  PASSWORD_LENGTH_REGEX,
  SPECIAL_CHARACTER_REGEX,
  UPPERCASE_LETTER_REGEX,
} from 'shared/utils'

export const signUpSchema = loginSchema.shape({
  name: yup.string().required('Provide a valid name'),
  password: yup
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
})

export type SignUpSchema = yup.InferType<typeof signUpSchema>
