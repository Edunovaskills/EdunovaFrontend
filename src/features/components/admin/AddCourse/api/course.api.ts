// src/features/components/admin/AddCourse/api/course.api.ts

import { fetchClient } from '../../../../../pages/components/services/fetchClient';

// Define the Course interface to match your backend Mongoose schema
export interface Course {
  id: string; // MongoDB's _id
  title: string;
  description: string;
  price: number;
  image: string; // This will be the Cloudinary URL
  createdAt?: string; // Optional: if you display creation date
  updatedAt?: string; // Optional: if you display update date
  isActive?: boolean; // Optional: for soft delete status
}

// Define the API response interface for fetching courses
interface CoursesApiResponse {
  data: {
    courses: Course[];
  };
  currentPage: number;
  totalPages: number;
  total: number;
}

/**
 * Fetches courses from the backend with offset-based pagination.
 * @param limit The maximum number of courses to return per page.
 * @param page The current page number to fetch.
 * @returns A promise that resolves to CoursesApiResponse.
 */
const fetchCoursesFromBackend = async (
  limit: number,
  page: number
): Promise<CoursesApiResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append('limit', String(limit));
  queryParams.append('page', String(page));

  try {
    const data = await fetchClient<CoursesApiResponse>(`/api/admin/courses?${queryParams.toString()}`, {
      method: 'GET',
    });
    // SAFEGURD: Ensure data.courses is always an array
    if (!Array.isArray(data.data.courses)) { // Adjusted for the nested 'data' object
        console.warn('Backend response for courses was not an array. Defaulting to empty array.', data);
        data.data.courses = [];
    }
    return data;
  } catch (error) {
    console.error('Error fetching courses from backend:', error);
    throw new Error(`Failed to fetch courses from backend: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Creates a new course on the backend.
 * This now takes FormData directly to handle file uploads.
 * @param formData FormData containing course data and the image file.
 * @returns A promise that resolves to the created Course object.
 */
const createCourseOnBackend = async (formData: FormData): Promise<Course> => {
  try {
    // fetchClient will automatically set 'Content-Type': 'multipart/form-data' when sending FormData
    const response = await fetchClient<{ success: boolean, data: { course: Course } }>(`/api/admin/courses`, {
      method: 'POST',
      body: formData, // Send FormData directly
    });
    if (!response.success) {
      throw new Error('Failed to create course: ' + JSON.stringify(response));
    }
    return response.data.course;
  } catch (error) {
    console.error('Error creating course on backend:', error);
    throw new Error(`Failed to create course on backend: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Updates an existing course on the backend.
 * This now takes FormData directly to handle file uploads, or Partial<Course> for non-file updates.
 * @param id The ID of the course to update.
 * @param formData FormData containing course data (including optional new image) or Partial<Course> object.
 * @returns A promise that resolves to the updated Course object.
 */
const updateCourseOnBackend = async (id: string, formData: FormData | Partial<Course>): Promise<Course> => {
  try {
    const options: RequestInit = {
      method: 'PUT',
    };

    if (formData instanceof FormData) {
      options.body = formData; // Send FormData if file is included
    } else {
      options.headers = {
        'Content-Type': 'application/json', // Send JSON if no file is included
      };
      options.body = JSON.stringify(formData);
    }

    const response = await fetchClient<{ success: boolean, data: { course: Course } }>(`/api/admin/courses/${id}`, options);
    if (!response.success) {
      throw new Error('Failed to update course: ' + JSON.stringify(response));
    }
    return response.data.course;
  } catch (error) {
    console.error(`Error updating course with ID ${id} on backend:`, error);
    throw new Error(`Failed to update course: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Deletes a course from the backend (soft delete, setting isActive to false).
 * @param id The ID of the course to delete.
 * @returns A promise that resolves when the course is successfully deleted.
 */
const deleteCourseOnBackend = async (id: string): Promise<void> => {
  try {
    await fetchClient<void>(`/api/admin/courses/${id}`, {
      method: 'DELETE',
    });
    console.log(`Course with ID ${id} deleted successfully from backend.`);
  } catch (error) {
    console.error(`Error deleting course with ID ${id} on backend:`, error);
    throw new Error(`Failed to delete course: ${error instanceof Error ? error.message : String(error)}`);
  }
};


export const courseApi = {
  fetchCourses: fetchCoursesFromBackend,
  createCourse: createCourseOnBackend,
  updateCourse: updateCourseOnBackend,
  deleteCourse: deleteCourseOnBackend,
};
