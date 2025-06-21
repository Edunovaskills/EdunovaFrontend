import axios from 'axios'

// Set the base URL for all axios requests (do this once in your app, e.g., in a setup file)
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'

// Fetch courses from the public route (unauthenticated)
export async function getCourses(limit: number = 10) {
  const res = await axios.get(`/api/courses?limit=${limit}`)
  return res.data?.data?.courses || []
}

// Fetch courses from the authenticated user route
export async function getUserCourses(limit: number = 10) {
  const res = await axios.get(`/api/user/courses?limit=${limit}`)
  return res.data?.data?.courses || []
}

// Add more course-related API functions here as needed.
