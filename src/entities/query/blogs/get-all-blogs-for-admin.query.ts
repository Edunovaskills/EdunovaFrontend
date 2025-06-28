// src/entities/query/get-all-blogs-for-admin.query.ts
import { useQuery } from '@tanstack/react-query'
import { adminBlogApi } from 'entities/api/admin/blogs/blogs.api' // Ensure this path is correct
import type { BlogResponse } from 'entities/model/blog.model'

export const AllBlogsForAdminQueryKey = 'all-blogs-for-admin'

interface AllBlogsForAdminQueryParams {
  page?: number
  limit?: number
  search?: string
}

export const useAllBlogsForAdminQuery = (
  params: AllBlogsForAdminQueryParams = {}
) => {
  const { page = 1, limit = 10, search = '' } = params

  return useQuery({
    queryKey: [AllBlogsForAdminQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await adminBlogApi.getAllBlogs(page, limit, search)
      return response.data
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    gc: 5 * 60 * 1000, // 5 minutes
  })
}
