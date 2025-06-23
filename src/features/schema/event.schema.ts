import * as yup from 'yup'

export const eventSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().required('Price is required'),
  paymentUrl: yup.string().required('Payment URL is required'),
  image: yup.string().required('Image is required'),
})

export type EventSchema = yup.InferType<typeof eventSchema>
