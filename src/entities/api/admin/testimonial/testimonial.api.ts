import type { PaginationParams, TestimonialResponse } from 'entities/model'
import type { Testimonial } from 'entities/model/testimonail.model'
import { getClient, type IClient } from 'shared/data-providers/model/fetcher'

type UpdateTestimonialPayload = {
  body: Partial<Testimonial>
  id: string
}
export class TestimonialApi {
  client: IClient
  constructor(client: IClient) {
    this.client = client
  }

  async getTestimonials(params: PaginationParams) {
    return await this.client.get<TestimonialResponse>(`get-testimonials`, {
      params,
    })
  }

  async updateTestimonial({ id, body }: UpdateTestimonialPayload) {
    return await this.client.patch<TestimonialResponse>(
      `update-testimonial/${id}`,
      body
    )
  }

  async deleteTestimonial(id: string) {
    return await this.client.delete<TestimonialResponse>(
      `delete-testimonial/${id}`
    )
  }
}

export const testimonialApi = new TestimonialApi(getClient('admin'))
