// src/entities/mutation/update-courses.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminCourseApi } from 'entities/api/admin/courses/courses.api'
import { AllCoursesForAdminQueryKey } from 'entities/query'
import { useSnackBar } from 'entities/state'
import type { CourseSchema } from 'features/schema'
import type { ErrorResponse } from 'entities/definitions'

type Payload = {
  courseId: string;
  coursePayload: Partial<Omit<CourseSchema, 'image'>>; // Partial for updates, image is separate
  imageFile?: File;
};

export const useUpdateCourseMutation = () => {
  const queryClient = useQueryClient()
  const { show } = useSnackBar()
  return useMutation({
    mutationFn: async ({ courseId, coursePayload, imageFile }: Payload) => {
      const response = await adminCourseApi.updateCourses({
        courseId,
        coursePayload,
        imageFile,
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey[0] === AllCoursesForAdminQueryKey
        },
      })
      show({
        title: 'Course updated successfully',
        color: 'success', // Use 'success'
      })
    },
    onError: (error: ErrorResponse) => {
      show({
        title: error.response?.data.message || error.message || 'Failed to update course',
        color: 'error', // Use 'error'
      })
    },
  })
}