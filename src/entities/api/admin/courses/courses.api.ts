// src/entities/api/admin/courses/courses.api.ts
import { getClient, type IClient } from 'shared/data-providers/model/fetcher';
import type { CourseResponse, CourseDetails } from 'entities/model';
import type { CourseSchema } from 'features/schema'; // Ensure CourseSchema is updated to not include price

export class AdminCoursesApi {
  client: IClient;
  constructor(client: IClient) {
    this.client = client;
  }

  async getAllCourses(page: number = 1, limit: number = 10, search: string = '') {
    const response = await this.client.get<CourseResponse>(
      `admin/courses?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
    );
    return response;
  }

  async getCourseById(courseId: string) {
    const response = await this.client.get<CourseDetails>(`admin/courses/${courseId}`);
    return response;
  }

  async createCourse(course: Omit<CourseSchema, 'image' | 'price'>, imageFile?: File) { // Updated Omit type
    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('description', course.description);
    // Removed: formData.append('price', course.price.toString());
    if (imageFile) {
      formData.append('image', imageFile);
    }
    const response = await this.client.post<CourseDetails>('admin/create-courses', formData);
    return response;
  }

  async updateCourses({
    courseId,
    coursePayload,
    imageFile,
  }: {
    courseId: string;
    coursePayload: Partial<Omit<CourseSchema, 'image' | 'price'>>; // Updated Omit type
    imageFile?: File;
  }) {
    const formData = new FormData();
    if (coursePayload.title) formData.append('title', coursePayload.title);
    if (coursePayload.description) formData.append('description', coursePayload.description);
    // Removed: if (coursePayload.price !== undefined) formData.append('price', coursePayload.price.toString());
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await this.client.patch<CourseDetails>(`admin/courses/${courseId}`, formData);
    return response;
  }

  async deleteCourse(courseId: string) {
    // Backend uses PATCH for soft delete
    const response = await this.client.patch<CourseDetails>(`admin/delete-courses/${courseId}`);
    return response;
  }
}

export const adminCourseApi = new AdminCoursesApi(getClient(''));