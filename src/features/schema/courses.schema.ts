// src/features/schema/courseSchema.ts
import * as yup from 'yup';

export const courseSchema = yup.object().shape({
  title: yup.string().trim().min(3, 'Title must be at least 3 characters').max(100, 'Title cannot exceed 100 characters').required('Title is required'),
  description: yup.string().trim().min(10, 'Description must be at least 10 characters').max(1000, 'Description cannot exceed 1000 characters').required('Description is required'),
  // price: yup.number()
  //   .typeError('Price must be a number')
  //   .min(0, 'Price cannot be negative')
  //   .required('Price is required'),
  // For file uploads, we generally don't validate the 'File' object itself in Yup as strictly.
  // The backend will handle the actual image URL validation after upload.
  // 'mixed' is appropriate here as it can be a File object on client-side,
  // or a string (URL) if coming from an existing course.
  image: yup.mixed()
    .test(
      'fileType',
      'Unsupported File Format',
      (value) => {
        if (!value) return true; // Allows optional image
        if (typeof value === 'string') return true; // Allows existing image URL
        return value && (value as File).type.startsWith('image/');
      }
    )
    .test(
      'fileSize',
      'Image must be less than 10MB',
      (value) => {
        if (!value) return true; // Allows optional image
        if (typeof value === 'string') return true; // Allows existing image URL
        return value && (value as File).size <= 10 * 1024 * 1024; // 10 MB
      }
    )
    .optional(), // Image is optional for updates, but required for create (handled in form logic)
});

export type CourseSchema = yup.InferType<typeof courseSchema>;