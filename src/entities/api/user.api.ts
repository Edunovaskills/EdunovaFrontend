import { getClient, type IClient } from 'shared/data-providers/model/fetcher'
import { EnquirySchema } from 'features/schema'
import type { TestimonialResponse } from 'entities/model'

export class UserApi {
  client: IClient
  constructor(client: IClient) {
    this.client = client
  }

  async createEnquiry(enquiry: EnquirySchema) {
    const response = await this.client.post('create-enquiry', enquiry)
    return response
  }

  async getTestimonials() {
    const response =
      await this.client.get<TestimonialResponse>('get-testimonials')
    return response
  }
}

export const userApi = new UserApi(getClient('user'))
