// src/entities/query/get-course-by-id.query.ts
import { useQuery } from '@tanstack/react-query'
import { coursesApi } from 'entities/api/courses/courses.api'
import { adminCourseApi } from 'entities/api/admin/courses/courses.api' // Import admin API
import type { CourseDetails } from 'entities/model'

export const GetCourseByIdQueryKey = 'get-course-by-id'
export const GetCourseByIdAdminQueryKey = 'get-course-by-id-admin' // New key for admin view

// For public view
export const useCourseByIdQuery = (coursesId?: string) => {
  return useQuery<CourseDetails>({
    queryKey: [GetCourseByIdQueryKey, coursesId],
    queryFn: async () => {
      if (!coursesId) return Promise.reject(new Error('Course ID is required')) // Reject if no ID
      const response = await coursesApi.getCourseById(coursesId)
      return response.data
    },
    enabled: !!coursesId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

// For admin view (fetches inactive courses and potentially createdBy user)
export const useCourseByIdAdminQuery = (coursesId?: string) => {
  return useQuery<CourseDetails>({
    queryKey: [GetCourseByIdAdminQueryKey, coursesId],
    queryFn: async () => {
      if (!coursesId) return Promise.reject(new Error('Course ID is required'))
      const response = await adminCourseApi.getCourseById(coursesId)
      return response.data
    },
    enabled: !!coursesId,
    staleTime: 0, // Admin data should be fresh
    gcTime: 5 * 60 * 1000,
  })
}
