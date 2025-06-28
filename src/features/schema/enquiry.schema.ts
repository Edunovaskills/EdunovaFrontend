import * as yup from 'yup'

export const enquirySchema = yup.object().shape({
  fullName: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Invalid phone number')
    .required('Phone is required'),
  message: yup.string().required('Message is required'),
})

export type EnquirySchema = yup.InferType<typeof enquirySchema>
