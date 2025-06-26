// src/entities/query/get-blog-by-id-admin.query.ts
import { useQuery } from '@tanstack/react-query';
import { adminBlogApi } from 'entities/api/admin/blogs/blogs.api'; // Ensure this path is correct
import type { BlogDetails } from 'entities/model/blog.model';

export const GetBlogByIdAdminQueryKey = 'get-blog-by-id-admin';

export const useBlogByIdAdminQuery = (blogId?: string) => {
  return useQuery<BlogDetails>({
    queryKey: [GetBlogByIdAdminQueryKey, blogId],
    queryFn: async () => {
      if (!blogId) return Promise.reject(new Error('Blog ID is required'));
      const response = await adminBlogApi.getBlogById(blogId);
      return response.data;
    },
    enabled: !!blogId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};