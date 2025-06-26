import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminCourseApi } from 'entities/api/admin/courses/courses.api'
import type { ErrorResponse } from 'entities/definitions'
import { AllCoursesForAdminQueryKey } from 'entities/query'
import { useSnackBar } from 'entities/state'
import type { CourseSchema } from 'features/schema'

export const useCreateCourseMutation = () => {
  const { show } = useSnackBar()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      course,
      imageFile,
    }: {
      course: CourseSchema
      imageFile?: File
    }) => {
      const response = await adminCourseApi.createCourse(course, imageFile)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AllCoursesForAdminQueryKey],
      })
      show({
        title: 'Course created successfully',
        color: 'Success',
      })
    },
    onError: (error: ErrorResponse) => {
      show({
        title: error.response?.data.error,
        color: 'Error',
      })
    },
  })
}
