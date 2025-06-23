import { getClient, type IClient } from 'shared/data-providers/model/fetcher'
import { EventResponse, type EventDetail } from 'entities/model'
import type { EventSchema } from 'features/schema'

export class EventsApi {
  client: IClient
  constructor(client: IClient) {
    this.client = client
  }

  async getAllEvents() {
    const response = await this.client.get<EventResponse>('')
    return response
  }

  async getEventById(eventId: string) {
    const response = await this.client.get<EventDetail>(`${eventId}`)
    return response
  }
}

export const eventsApi = new EventsApi(getClient('events'))
