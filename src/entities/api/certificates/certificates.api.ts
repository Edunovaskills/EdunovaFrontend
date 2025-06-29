// src/entities/api/certificates/certificates.api.ts
import { getClient, type IClient } from 'shared/data-providers/model/fetcher'
import type { CertificateDetails } from 'entities/model/certificate.model'

export class CertificatesApi {
  client: IClient
  constructor(client: IClient) {
    this.client = client
  }

  async getCertificateByKey(key: string): Promise<CertificateDetails> {
    const response = await this.client.get<CertificateDetails>(`${key}`)
    return response.data
  }

  async downloadCertificate(key: string): Promise<Blob> {
    const response = await this.client.get<Blob>(`${key}/download`, {
      responseType: 'blob',
    })
    return response.data
  }
}

export const certificatesApi = new CertificatesApi(getClient('certificates'))
export const certificateDownloadApi = new CertificatesApi(
  getClient('certificate')
)
