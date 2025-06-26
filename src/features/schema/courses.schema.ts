import * as yup from 'yup'

export const courseSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  image: yup.mixed().optional(),
})

export type CourseSchema = yup.InferType<typeof courseSchema>
