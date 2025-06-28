// src/features/schema/certificate.schema.ts
import * as yup from 'yup'

export const certificateSchema = yup.object().shape({
  certificatePdf: yup
    .mixed() // Retain mixed for file handling on frontend
    .test(
      'fileType',
      'Unsupported File Format. Only PDFs are allowed.',
      (value) => {
        if (!value) return true // Allows the field to be empty (e.g., for initial state)
        // If it's a File object, check its type
        return value instanceof File && value.type === 'application/pdf'
      }
    )
    .test('fileSize', 'PDF must be less than 10MB.', (value) => {
      if (!value) return true
      // If it's a File object, check its size
      return value instanceof File && value.size <= 10 * 1024 * 1024 // 10 MB
    })
    .required('Certificate PDF is required for creation'), // Required for creation
  email: yup.string().email('Invalid email').required('Email is required'),
})

export type CertificateSchema = yup.InferType<typeof certificateSchema>

// Schema for searching a certificate by key (public view)
export const searchCertificateSchema = yup.object().shape({
  searchKey: yup
    .string()
    .trim()
    .required('Please enter a certificate key to search')
    .min(5, 'Key must be at least 5 characters long'),
})

export type SearchCertificateSchema = yup.InferType<
  typeof searchCertificateSchema
>
