import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminCourseApi } from 'entities/api/admin/courses/courses.api'
import { AllCoursesForAdminQueryKey } from 'entities/query'
import { useSnackBar } from 'entities/state'

type Payload = Parameters<typeof adminCourseApi.updateCourses>[0]
export const useUpdateCourseMutation = () => {
  const queryClient = useQueryClient()
  const { show } = useSnackBar()
  return useMutation({
    mutationFn: async ({ courseId, eventPayload, imageFile }: Payload) => {
      const response = await adminCourseApi.updateCourses({
        courseId,
        eventPayload,
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
        color: 'Success',
      })
    },
  })
}
