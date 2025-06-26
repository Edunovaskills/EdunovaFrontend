import type { CourseResponse } from 'entities/model'
import type { Course } from 'entities/model/courses.model'
import type { CourseSchema } from 'features/schema'
import { getClient, type IClient } from 'shared/data-providers/model/fetcher'

type UpdatePayload = {
  eventPayload: CourseSchema
  imageFile: File
  courseId: string
}
export class AdminCourseApi {
  client: IClient
  constructor(client: IClient) {
    this.client = client
  }

  async getAllCourses() {
    return await this.client.get<CourseResponse>('courses')
  }
  async createCourse(eventPayload: CourseSchema, imageFile: File) {
    const formData = new FormData()
    formData.append('title', eventPayload.title)
    formData.append('description', eventPayload.description)
    if (imageFile) {
      formData.append('image', imageFile)
    }
    const response = await this.client.post<Course>(
      'create-courses',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response
  }

  async updateCourses({ courseId, eventPayload, imageFile }: UpdatePayload) {
    const formData = new FormData()
    formData.append('title', eventPayload.title)
    formData.append('description', eventPayload.description)
    if (imageFile) {
      formData.append('image', imageFile)
    }
    const response = await this.client.patch<Course>(
      `courses/${courseId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response
  }

  async deleteCourse(courseId: string) {
    return this.client.patch(`courses/${courseId}`, {})
  }
}

export const adminCourseApi = new AdminCourseApi(getClient('admin'))
