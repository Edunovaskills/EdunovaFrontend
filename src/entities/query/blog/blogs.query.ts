import { blogsApi } from 'entities/api/blogs.api'
import { useQuery } from '@tanstack/react-query'

export const AllBlogsQueryKey = 'all-blogs'

export const useAllBlogsQuery = () => {
  return useQuery({
    queryKey: [AllBlogsQueryKey],
    queryFn: async () => {
      const response = await blogsApi.getBlogs()
      return response.data
    },
  })
}
