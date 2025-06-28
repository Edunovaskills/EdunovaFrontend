import type {
  ApiContract,
  Enquiry,
  EnquiryResponse,
  PaginationParams,
} from 'entities/model'
import { getClient, type IClient } from 'shared/data-providers/model/fetcher'

export class AdminEnquiryApi {
  client: IClient

  constructor(client: IClient) {
    this.client = client
  }

  async getAllEnquiries(params: PaginationParams) {
    return await this.client.get<EnquiryResponse>('get-enquiry', {
      params,
    })
  }

  async makeEnquiryResolved(id: string) {
    return await this.client.patch<EnquiryResponse>(`enquiry-status/${id}`, {})
  }

  async getEnquiryById(id: string) {
    return await this.client.get<ApiContract<{ enquiryById: Enquiry }>>(
      `get-enquiry/${id}`
    )
  }
}

export const adminEnquiryApi = new AdminEnquiryApi(getClient('admin'))
