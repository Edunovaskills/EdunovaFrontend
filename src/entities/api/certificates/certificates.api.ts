// src/entities/api/certificates/certificates.api.ts
import { getClient, type IClient } from 'shared/data-providers/model/fetcher';
import type { CertificateDetails } from 'entities/model/certificate.model';

export class CertificatesApi {
  client: IClient;
  constructor(client: IClient) {
    this.client = client;
  }

  async getCertificateByKey(key: string): Promise<CertificateDetails> {
    const response = await this.client.get<CertificateDetails>(`/certificate/${key}`);
    return response;
  }

  async downloadCertificate(key: string): Promise<Blob> {
    // This endpoint should return a PDF blob
    const response = await this.client.get<Blob>(`/certificate/${key}/download`, {
      responseType: 'blob', // Important for downloading files
    });
    return response;
  }
}

export const certificatesApi = new CertificatesApi(getClient('certificates'));

