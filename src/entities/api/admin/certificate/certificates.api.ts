// src/entities/api/admin/certificates/certificates.api.ts
import { getClient, type IClient } from 'shared/data-providers/model/fetcher'
import type {
  CertificateDetails,
  CertificateResponse,
} from 'entities/model/certificate.model'
import type { ApiContract } from 'entities/model/api-contract.model'

export class AdminCertificateApi {
  client: IClient
  constructor(client: IClient) {
    this.client = client
  }

  async createCertificate(pdfFile: File): Promise<CertificateDetails> {
    const formData = new FormData()
    formData.append('certificatePdf', pdfFile)

    const response = await this.client.post<CertificateDetails>('', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }

  async getAllCertificates(
    page: number = 1,
    limit: number = 10,
    search: string = ''
  ): Promise<CertificateResponse> {
    const response = await this.client.get<CertificateResponse>(
      `?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
    )
    return response.data
  }

  async getCertificateByCertificateKeyAdmin(certificateKey: string) {
    const response = await this.client.get<CertificateDetails>(
      `${certificateKey}`
    )
    return response.data
  }

  async softDeleteCertificate(certificateKey: string) {
    const response = await this.client.patch<CertificateDetails>(
      `${certificateKey}`,
      {}
    )
    return response.data
  }
}

export const adminCertificateApi = new AdminCertificateApi(
  getClient('admin/certificates')
)
