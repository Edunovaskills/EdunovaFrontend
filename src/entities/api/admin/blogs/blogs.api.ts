// src/entities/api/admin/blogs/blogs.api.ts
import { getClient, type IClient } from 'shared/data-providers/model/fetcher';
import type { BlogResponse, BlogDetails } from 'entities/model/blog.model';
import type { BlogSchema } from 'features/schema/blogSchema'; // This file needs to be created/updated by you

export class AdminBlogsApi {
  client: IClient;
  constructor(client: IClient) {
    this.client = client;
  }

  async getAllBlogs(page: number = 1, limit: number = 10, search: string = '') {
    const response = await this.client.get<BlogResponse>(
      `admin/blogs?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
    );
    return response;
  }

  async getBlogById(blogId: string) {
    const response = await this.client.get<BlogDetails>(`admin/blogs/${blogId}`);
    return response;
  }

  async createBlog(blog: Omit<BlogSchema, 'image'>, imageFile?: File) {
    const formData = new FormData();
    // Dynamically append all fields from blog
    Object.entries(blog).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });
    if (imageFile) {
      formData.append('image', imageFile);
    }
    const response = await this.client.post<BlogDetails>('admin/create-blog', formData);
    return response;
  }

  async updateBlog({
    blogId,
    blogPayload,
    imageFile,
  }: {
    blogId: string;
    blogPayload: Partial<Omit<BlogSchema, 'image'>>;
    imageFile?: File;
  }) {
    const formData = new FormData();
    // Dynamically append all fields from blogPayload
    Object.entries(blogPayload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });
    if (imageFile) {
      formData.append('image', imageFile);
    }
    const response = await this.client.patch<BlogDetails>(`admin/update-blog/${blogId}`, formData);
    return response;
  }

  async deleteBlog(blogId: string) {
    // Backend uses PATCH for soft delete
    const response = await this.client.patch<BlogDetails>(`admin/delete-blog/${blogId}`);
    return response;
  }
}

// Assuming your backend admin routes start with /api/v1/admin/
export const adminBlogApi = new AdminBlogsApi(getClient(''));