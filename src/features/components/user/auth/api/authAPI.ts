// authAPI.ts
import axios from 'axios'
import Cookies from 'js-cookie' // Keep this import for client-side cookie removal if needed

import { LoginData, SignupData, User } from '../../../../../shared/types/user'

// No default baseURL, use full URLs in each API call

export const loginAPI = async (data: LoginData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', data, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error
  }
}

export const signupAPI = async (data: SignupData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/signup', data, { withCredentials: true })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUserProfile = async () => {
  try {
    // Get token from cookies
    const token = Cookies.get('token') || Cookies.get('x-access-token')
    const headers: Record<string, string> = { }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await axios.get('http://localhost:5000/api/auth/me', {
      withCredentials: true,
      headers,
    })

    return response.data.data.user
  } catch (error) {
    throw error
  }
}

// *** NEW: Logout API Call ***
export const logoutAPI = async () => {
  try {
    // Make a POST request to your backend logout endpoint
    // It's good practice to send an empty body or simply make the request
    // The backend will handle clearing the cookie
    const response = await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
    // In many setups, you might also clear client-side visible cookies here,
    // though the backend clearing HttpOnly cookies is the main event.
    Cookies.remove('token'); // Clear 'token' cookie
    Cookies.remove('x-access-token'); // Clear 'x-access-token' cookie
    return response.data;
  } catch (error) {
    throw error;
  }
};