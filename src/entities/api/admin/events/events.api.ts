import type { EventDetail } from 'entities/model'
import type { EventSchema } from 'features/schema'
import { getClient, type IClient } from 'shared/data-providers/model/fetcher'

export class AdminEventApi {
  client: IClient
  constructor(client: IClient) {
    this.client = client
  }

  async createEvent(eventPayload: EventSchema, imageFile?: File) {
    const formData = new FormData()
    formData.append('title', eventPayload.title)
    formData.append('description', eventPayload.description)
    formData.append('price', String(eventPayload.price))
    formData.append('paymentUrl', eventPayload.paymentUrl)
    if (imageFile) {
      formData.append('image', imageFile)
    }
    const response = await this.client.post<EventDetail>(
      'create-events',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response
  }

  async updateEvent(
    eventId: string,
    eventPayload: EventSchema,
    imageFile?: File
  ) {
    const formData = new FormData()
    formData.append('title', eventPayload.title)
    formData.append('description', eventPayload.description)
    formData.append('price', String(eventPayload.price))
    formData.append('paymentUrl', eventPayload.paymentUrl)
    if (imageFile) {
      formData.append('image', imageFile)
    }
    const response = await this.client.patch<EventDetail>(
      `update-events/${eventId}`,
      formData
    )
    return response
  }

  async deleteEvent(eventId: string) {
    const response = await this.client.patch<EventDetail>(
      `delete-events/${eventId}`,
      {}
    )
    return response
  }
}

export const adminEventApi = new AdminEventApi(getClient('admin'))
