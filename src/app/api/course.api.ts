import axios from 'axios';

// Define an interface for the course data received from the backend
export interface ICourse {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: string; // Assuming these come as strings from API
  updatedAt: string;
}

// Define an interface for the API response structure
interface GetCoursesResponse {
  success: boolean;
  count: number;
  total: number;
  currentPage: number;
  totalPages: number;
  data: {
    courses: ICourse[];
  };
}

const API_URL = 'http://localhost:5000/api/user/courses'; // Adjust if your API base URL is different

const getCourses = async (page: number = 1, limit: number = 10, search: string = ''): Promise<GetCoursesResponse> => {
  try {
    const response = await axios.get<GetCoursesResponse>(API_URL, {
      params: { page, limit, search }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching courses:', error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch courses');
    } else {
      console.error('An unexpected error occurred:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export { getCourses };