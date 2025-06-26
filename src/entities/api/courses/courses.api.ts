<<<<<<< Updated upstream
import type { CourseResponse } from 'entities/model'
=======
// src/entities/api/courses/courses.api.ts
import type { CourseDetails, CourseResponse } from 'entities/model'
>>>>>>> Stashed changes
import { getClient, type IClient } from 'shared/data-providers/model/fetcher'

export class CoursesApi {
  client: IClient
  constructor(client: IClient) {
    this.client = client
  }

  async getCourses(page: number = 1, limit: number = 10, search: string = '') {
    const response = await this.client.get<CourseResponse>(
      `courses?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
    )
    return response
  }
<<<<<<< Updated upstream
=======

  async getCourseById(coursesId: string) {
    const response = await this.client.get<CourseDetails>(`courses/${coursesId}`)
    return response
  }
>>>>>>> Stashed changes
}

export const coursesApi = new CoursesApi(getClient('')); // Adjust base URL if needed