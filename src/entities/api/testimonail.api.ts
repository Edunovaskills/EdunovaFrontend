import type { TestimonialSchema } from 'features/schema'
import { getClient, type IClient } from 'shared/data-providers/model/fetcher'

class TestimonialApi {
  client: IClient
  constructor(client: IClient) {
    this.client = client
  }

  async createTestimonial(body: TestimonialSchema) {
    return await this.client.post('create-testimonial', body)
  }
}

export const testimonialApi = new TestimonialApi(getClient(''))
