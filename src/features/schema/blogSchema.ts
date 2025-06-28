// src/features/schema/blogSchema.ts
import * as yup from 'yup'

export const blogSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title cannot exceed 200 characters')
    .required('Blog title is required'),
  description: yup
    .string()
    .trim()
    .min(3, 'Description must be at least 3 characters')
    .max(5000, 'Description cannot exceed 5000 characters')
    .required('Blog description is required'),
  image: yup
    .mixed()
    .test(
      'fileType',
      'Unsupported File Format. Only images are allowed.',
      (value) => {
        if (!value) return true
        if (typeof value === 'string') return true
        return value && (value as File).type.startsWith('image/')
      }
    )
    .test('fileSize', 'Image must be less than 10MB.', (value) => {
      if (!value) return true
      if (typeof value === 'string') return true
      return value && (value as File).size <= 10 * 1024 * 1024 // 10 MB
    })
    .optional(),
})

export type BlogSchema = yup.InferType<typeof blogSchema>
