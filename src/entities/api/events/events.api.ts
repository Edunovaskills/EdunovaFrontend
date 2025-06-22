import { getClient, type IClient } from 'shared/data-providers/model/fetcher'
import { EventResponse } from 'entities/model'

export class EventsApi {
  client: IClient
  constructor(client: IClient) {
    this.client = client
  }

  async getAllEvents() {
    const response = await this.client.get<EventResponse>('')
    return response
  }
}

export const eventsApi = new EventsApi(getClient('events'))
