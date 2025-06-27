// src/entities/api/admin/certificates/certificates.api.ts
import { getClient, type IClient } from 'shared/data-providers/model/fetcher';
import type { CertificateDetails, CertificateResponse } from 'entities/model/certificate.model';
import type { ApiContract } from 'entities/model/api-contract.model';

export class AdminCertificateApi {
  client: IClient;
  constructor(client: IClient) {
    this.client = client;
  }

  async createCertificate(pdfFile: File): Promise<CertificateDetails> {
    const formData = new FormData();
    formData.append('certificatePdf', pdfFile);

    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await this.client.post<CertificateDetails>(
      '',
      formData,
      { headers }
    );
    return response;
  }

  async getAllCertificates(page: number = 1, limit: number = 10, search: string = ''): Promise<CertificateResponse> {
    const response = await this.client.get<CertificateResponse>(
      `?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
    );
    return response;
  }

  async getCertificateByCertificateKeyAdmin(certificateKey: string): Promise<CertificateDetails> {
    const response = await this.client.get<CertificateDetails>(`${certificateKey}`);
    return response;
  }

  async softDeleteCertificate(certificateKey: string): Promise<ApiContract<null>> {
    const response = await this.client.patch<ApiContract<{data:any}>>(`${certificateKey}`,{});
    return response;
  }
}

export const adminCertificateApi = new AdminCertificateApi(getClient('admin/certificates'));
