// src/entities/mutation/delete-blog.mutation.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminBlogApi } from 'entities/api/admin/blogs/blogs.api';
import { AllBlogsForAdminQueryKey } from 'entities/query/blogs/get-all-blogs-for-admin.query';
import { useSnackBar } from 'entities/state'; // Assuming this path exists

export const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient();
  const { show } = useSnackBar();
  return useMutation({
    mutationFn: async (blogId: string) => {
      const response = await adminBlogApi.deleteBlog(blogId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AllBlogsForAdminQueryKey],
      });
      show({
        title: 'Blog deleted successfully',
        color: 'Success',
      });
    },
    onError: (error: any) => { // Use 'any' or define a more specific ErrorResponse type if available
      show({
        title: error.response?.data.error || 'Failed to delete blog',
        color: 'Error',
      });
    },
  });
};