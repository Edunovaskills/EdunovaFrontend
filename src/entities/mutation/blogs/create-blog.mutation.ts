import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminBlogApi } from 'entities/api/admin/blogs/blogs.api';
import type { ErrorResponse } from 'entities/definitions';
import { AllBlogsForAdminQueryKey } from 'entities/query/blogs/get-all-blogs-for-admin.query';
import { useSnackBar } from 'entities/state';
import type { BlogSchema } from 'features/schema/blogSchema';

export const useCreateBlogMutation = () => {
  const { show } = useSnackBar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      blog,
      imageFile,
    }: {
      blog: Omit<BlogSchema, 'image'>;
      imageFile?: File;
    }) => {
      const response = await adminBlogApi.createBlog(blog, imageFile);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [AllBlogsForAdminQueryKey],
      });
      show({
        title: 'Blog created successfully',
        color: 'success', // <-- lowercase
      });
    },
    onError: (error: ErrorResponse) => {
      console.error('Create blog error:', error); // Add this line
      show({
        title: error.response?.data.error || 'Failed to create blog',
        color: 'error',
      });
    },
  });
};