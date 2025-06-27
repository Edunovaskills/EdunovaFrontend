// src/entities/mutation/delete-courses.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminCourseApi } from 'entities/api/admin/courses/courses.api'
import { AllCoursesForAdminQueryKey } from 'entities/query'
import { useSnackBar } from 'entities/state'
import type { ErrorResponse } from 'entities/definitions'

export const useDeleteCourseMutation = () => {
  const queryClient = useQueryClient()
  const { show } = useSnackBar()
  return useMutation({
    mutationFn: async (courseId: string) => {
      const response = await adminCourseApi.deleteCourse(courseId)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AllCoursesForAdminQueryKey],
      })
      show({
        title: 'Course deleted successfully',
        color: 'Success', // Use 'success'
      })
    },
    onError: (error: ErrorResponse) => {
      show({
        title:
          error.response?.data.message ||
          error.message ||
          'Failed to delete course',
        color: 'Error', // Use 'error'
      })
    },
  })
}
