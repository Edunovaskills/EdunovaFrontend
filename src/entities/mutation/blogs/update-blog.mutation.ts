// src/entities/mutation/update-blog.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminBlogApi } from 'entities/api/admin/blogs/blogs.api'
import type { ErrorResponse } from 'entities/definitions'
import { AllBlogsForAdminQueryKey } from 'entities/query/blogs/get-all-blogs-for-admin.query'
import { useSnackBar } from 'entities/state'
import type { BlogSchema } from 'features/schema/blogSchema'

type UpdateBlogPayload = {
  blogId: string
  blogPayload: Partial<Omit<BlogSchema, 'image'> & { isActive?: boolean }>
  imageFile?: File
}

export const useUpdateBlogMutation = () => {
  const { show } = useSnackBar()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      blogId,
      blogPayload,
      imageFile,
    }: UpdateBlogPayload) => {
      const response = await adminBlogApi.updateBlog({
        blogId,
        blogPayload,
        imageFile,
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AllBlogsForAdminQueryKey],
      })
      show({
        title: 'Blog updated successfully',
        color: 'Success',
      })
    },
    onError: (error: ErrorResponse) => {
      show({
        title: error.response?.data.error || 'Failed to update blog',
        color: 'Error',
      })
    },
  })
}
