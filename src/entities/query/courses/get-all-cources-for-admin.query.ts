import { useQuery } from '@tanstack/react-query'
import { adminCourseApi } from 'entities/api/admin/courses/courses.api'

export const AllCoursesForAdminQueryKey = 'all-courses-for-admin'
export const useAllCoursesForAdminQuery = () => {
  return useQuery({
    queryKey: [AllCoursesForAdminQueryKey],
    queryFn: async () => {
      const response = await adminCourseApi.getAllCourses()
      return response.data
    },
  })
}
