// src/features/schema/blogSchema.ts
import * as yup from 'yup';

export const blogSchema = yup.object().shape({
  title: yup.string().trim().min(3, 'Title must be at least 3 characters').max(200, 'Title cannot exceed 200 characters').required('Blog title is required'),
  description: yup.string().trim().min(50, 'Description must be at least 50 characters').max(5000, 'Description cannot exceed 5000 characters').required('Blog description is required'),
  // Updated image validation for file upload
  image: yup.mixed()
    .test(
      'fileType',
      'Unsupported File Format. Only images are allowed.',
      (value) => {
        // Allow undefined/null (for optional updates), or a string (existing URL), or an image file
        if (!value) return true;
        if (typeof value === 'string') return true; // Allows existing image URL during updates
        return value && (value as File).type.startsWith('image/');
      }
    )
    .test(
      'fileSize',
      'Image must be less than 10MB.',
      (value) => {
        // Allow undefined/null, string, or file within size limit
        if (!value) return true;
        if (typeof value === 'string') return true;
        return value && (value as File).size <= 10 * 1024 * 1024; // 10 MB
      }
    )
    .optional() // Image is optional for updates. For creation, form logic will handle its necessity.
});

export type BlogSchema = yup.InferType<typeof blogSchema>;

