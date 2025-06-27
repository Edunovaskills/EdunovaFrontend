// src/entities/query/get-all-cources-for-admin.query.ts
import { useQuery } from '@tanstack/react-query'
import { adminCourseApi } from 'entities/api/admin/courses/courses.api'
import type { CourseResponse } from 'entities/model' // Import CourseResponse

export const AllCoursesForAdminQueryKey = 'all-courses-for-admin'

interface AllCoursesForAdminQueryParams {
  page?: number
  limit?: number
  search?: string
}

export const useAllCoursesForAdminQuery = (
  params: AllCoursesForAdminQueryParams = {}
) => {
  const { page = 1, limit = 10, search = '' } = params

  return useQuery<CourseResponse>({
    // Specify the return type
    queryKey: [AllCoursesForAdminQueryKey, page, limit, search], // Include params in queryKey
    queryFn: async () => {
      const response = await adminCourseApi.getAllCourses(page, limit, search)
      return response.data
    },
  })
}
