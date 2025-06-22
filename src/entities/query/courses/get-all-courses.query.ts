import { useQuery } from '@tanstack/react-query'
import { coursesApi } from 'entities/api/courses/courses.api'

export const getAllCoursesQueryKey = 'get-all-courses'

export const useGetAllCoursesQuery = () => {
  return useQuery({
    queryKey: [getAllCoursesQueryKey],
    queryFn: async () => {
      const response = await coursesApi.getCourses()
      return response.data
    },
  })
}
