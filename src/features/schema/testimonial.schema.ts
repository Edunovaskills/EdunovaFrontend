import * as yup from 'yup'

export const testimonialSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  designation: yup.string().required('Designation is required'),
  message: yup.string().required('Message is required'),
})

export type TestimonialSchema = yup.InferType<typeof testimonialSchema>
