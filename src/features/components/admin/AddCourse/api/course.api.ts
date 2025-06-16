// src/features/components/admin/AddCourse/api/course.api.ts

import { fetchClient } from '../../../../../pages/components/services/fetchClient';
import { Course, mockCourses } from '../mock/mockCourses';

interface CoursesApiResponse {
  courses: Course[]; // This explicitly states it should be an array
  nextCursor: string | null;
  hasMore: boolean;
}

// --- API Implementation (Backend) ---
const fetchCoursesFromBackend = async (
  limit: number,
  cursor: string | null
): Promise<CoursesApiResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append('limit', String(limit));
  if (cursor) {
    queryParams.append('cursor', cursor);
  }

  try {
    const data = await fetchClient<CoursesApiResponse>(`/courses?${queryParams.toString()}`, {
      method: 'GET',
    });
    // SAFEGURD: Ensure data.courses is always an array
    if (!Array.isArray(data.courses)) {
        console.warn('Backend response for courses was not an array. Defaulting to empty array.', data);
        data.courses = [];
    }
    return data;
  } catch (error) {
    console.error('Error fetching courses from backend:', error);
    throw new Error(`Failed to fetch courses from backend: ${error instanceof Error ? error.message : String(error)}`);
  }
};

const createCourseOnBackend = async (course: Omit<Course, 'id'>, image?: File | null): Promise<Course> => {
  const formData = new FormData();
  for (const key in course) {
    formData.append(key, String(course[key as keyof typeof course]));
  }
  if (image) {
    formData.append('thumbnail', image);
  }

  try {
    const createdCourse = await fetchClient<Course>('/courses', {
      method: 'POST',
      body: formData,
    });
    return createdCourse;
  } catch (error) {
    console.error('Error creating course on backend:', error);
    throw new Error(`Failed to create course on backend: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// --- Mock Implementation (Fallback) ---
const fetchCoursesFromMock = async (
  limit: number,
  cursor: string | null
): Promise<CoursesApiResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sortedCourses = [...mockCourses].sort((a, b) => a.id.localeCompare(b.id));

      let startIndex = 0;
      if (cursor) {
        const cursorIndex = sortedCourses.findIndex((c) => c.id === cursor);
        if (cursorIndex !== -1) {
          startIndex = cursorIndex + 1;
        } else {
          console.warn(`Mock API: Cursor '${cursor}' not found. Starting from beginning.`);
          startIndex = 0;
        }
      }

      const endIndex = startIndex + limit;
      const coursesSlice = sortedCourses.slice(startIndex, endIndex);

      const lastItemInSlice = coursesSlice[coursesSlice.length - 1];
      const nextCursor = (coursesSlice.length > 0 && endIndex < sortedCourses.length)
        ? lastItemInSlice.id
        : null;

      const hasMore = endIndex < sortedCourses.length;

      resolve({
        courses: coursesSlice, // This is already an array from .slice()
        nextCursor,
        hasMore,
      });
    }, 500);
  });
};

const createCourseOnMock = async (courseData: Omit<Course, 'id'>, image?: File | null): Promise<Course> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCourse: Course = {
        ...courseData,
        id: `mock-${mockCourses.length + 1}-${Date.now()}`,
      };
      mockCourses.push(newCourse);
      console.log('Mock: Course created:', newCourse);
      resolve(newCourse);
    }, 500);
  });
};

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

export const courseApi = {
  fetchCourses: USE_MOCK_API ? fetchCoursesFromMock : fetchCoursesFromBackend,
  createCourse: USE_MOCK_API ? createCourseOnMock : createCourseOnBackend,
};