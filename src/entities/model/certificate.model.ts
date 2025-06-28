// src/entities/model/certificate.model.ts
import { ApiContract, type PaginatedResponse } from './api-contract.model'
import { User } from './user.model'

export type Certificate = {
  _id: string
  certificateKey: string // Changed from 'key' to 'certificateKey' to match backend
  pdfUrl: string // Changed from 'certificatePdf' to 'pdfUrl' to match backend
  uploadedBy?: User // Optional: User who uploaded it (populated by backend)
  isActive: boolean // For soft delete
  createdAt: string
  updatedAt: string
  userEmail: string
  __v: number
}

export type CertificateDetails = ApiContract<{ certificate: Certificate }>
export type CertificateResponse = ApiContract<{ certificates: Certificate[] }> &
  PaginatedResponse

export type CertificationPayload = {
  email: string
  pdfFile: File
}
