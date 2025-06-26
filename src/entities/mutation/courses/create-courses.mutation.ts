// src/entities/mutation/create-courses.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminCourseApi } from 'entities/api/admin/courses/courses.api'
import type { ErrorResponse } from 'entities/definitions' // Assuming you have this
import { AllCoursesForAdminQueryKey } from 'entities/query'
import { useSnackBar } from 'entities/state' // Assuming you have this
import type { CourseSchema } from 'features/schema'

export const useCreateCourseMutation = () => {
  const { show } = useSnackBar()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      course,
      imageFile,
    }: {
      course: Omit<CourseSchema, 'image'> // CourseSchema without image (File)
      imageFile?: File // The actual File object
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
        color: 'success', // Use 'success' for Material-UI color types
      })
    },
    onError: (error: ErrorResponse) => {
      show({
        title: error.response?.data.message || error.message || 'Failed to create course', // Use 'message' from backend error
        color: 'error', // Use 'error' for Material-UI color types
      })
    },
  })
}