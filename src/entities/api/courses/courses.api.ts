import type { CourseResponse } from 'entities/model'
import { getClient, type IClient } from 'shared/data-providers/model/fetcher'

export class CoursesApi {
  client: IClient
  constructor(client: IClient) {
    this.client = client
  }

  async getCourses() {
    const response = await this.client.get<CourseResponse>('')
    return response
  }
}

export const coursesApi = new CoursesApi(getClient('courses'))
