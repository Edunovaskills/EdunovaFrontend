// src/entities/model/blog.model.ts
import { ApiContract, type PaginatedResponse } from './api-contract.model'; // Assuming api-contract.model exists

export type Blog = {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdBy?: { // Assuming you might populate this on fetch
    _id: string;
    name: string;
    email: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type BlogDetails = ApiContract<{ blog: Blog }>;
export type BlogResponse = ApiContract<{ blogs: Blog[] }> & PaginatedResponse;