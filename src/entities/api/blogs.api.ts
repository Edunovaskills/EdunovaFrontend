import type { BlogResponse } from 'entities/model/blog.model'
import { getClient, type IClient } from 'shared/data-providers/model/fetcher'

export class BlogsApi {
  client: IClient
  constructor(client: IClient) {
    this.client = client
  }

  async getBlogs() {
    return await this.client.get<BlogResponse>('')
  }
}

export const blogsApi = new BlogsApi(getClient('blogs'))
