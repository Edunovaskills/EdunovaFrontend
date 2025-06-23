import type { EventDetail } from 'entities/model'
import type { EventSchema } from 'features/schema'
import { getClient, type IClient } from 'shared/data-providers/model/fetcher'

export class AdminEventApi {
  client: IClient
  constructor(client: IClient) {
    this.client = client
  }

  async createEvent(eventPayload: EventSchema) {
    const response = await this.client.post<EventDetail>('events', eventPayload)
    return response
  }
}

export const adminEventApi = new AdminEventApi(getClient('admin'))
