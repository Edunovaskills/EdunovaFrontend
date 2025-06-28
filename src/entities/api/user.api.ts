import { getClient, type IClient } from 'shared/data-providers/model/fetcher'
import { EnquirySchema } from 'features/schema'

export class UserApi {
  client: IClient
  constructor(client: IClient) {
    this.client = client
  }

  async createEnquiry(enquiry: EnquirySchema) {
    const response = await this.client.post('create-enquiry', enquiry)
    return response
  }
}

export const userApi = new UserApi(getClient('user'))
