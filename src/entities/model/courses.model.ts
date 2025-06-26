// src/entities/model/courses.model.ts
import { ApiContract, type PaginatedResponse } from './api-contract.model'

// Define the User portion that might be populated
export type CreatedByUser = {
  _id: string;
  name: string;
  email: string;
};

export type Course = {
  _id: string
  title: string
  description: string
<<<<<<< Updated upstream
=======
  //price: number // Added price as per backend model
>>>>>>> Stashed changes
  image: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  __v: number
  createdBy?: string | CreatedByUser; // Added createdBy, can be string (ID) or populated object
}

export type CourseResponse = ApiContract<{ courses: Course[] }> &
  PaginatedResponse