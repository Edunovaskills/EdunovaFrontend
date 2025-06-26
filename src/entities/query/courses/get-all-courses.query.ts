// src/entities/query/get-all-courses.query.ts
import { useQuery } from '@tanstack/react-query'
import { coursesApi } from 'entities/api/courses/courses.api'
import type { CourseResponse } from 'entities/model'

export const getAllCoursesQueryKey = 'get-all-courses'

interface GetAllCoursesQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const useGetAllCoursesQuery = (params: GetAllCoursesQueryParams = {}) => {
  const { page = 1, limit = 10, search = '' } = params;

  return useQuery<CourseResponse>({ // Specify return type
    queryKey: [getAllCoursesQueryKey, page, limit, search], // Include params in queryKey
    queryFn: async () => {
      const response = await coursesApi.getCourses(page, limit, search);
      return response.data;
    },
  });
};