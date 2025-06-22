import { useQuery } from '@tanstack/react-query'
import { coursesApi } from 'entities/api/courses/courses.api'

export const GetCourseByIdQueryKey = 'get-course-by-id'

export const useCourseByIdQuery = (coursesId?: string) => {
  return useQuery({
    queryKey: [GetCourseByIdQueryKey, coursesId],
    queryFn: async () => {
      if (!coursesId) return
      const response = await coursesApi.getCourseById(coursesId)
      return response.data
    },
    enabled: !!coursesId,
  })
}
