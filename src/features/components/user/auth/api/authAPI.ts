import axios from 'axios';
import { LoginData, SignupData } from '../../../../../types/user';

// Axios instance for reuse (optional but recommended)
const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // include cookies in all requests
});

// Login
export const loginAPI = async (data: LoginData) => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Signup
export const signupAPI = async (data: SignupData) => {
  try {
    const response = await api.post('/auth/signup', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get User Profile
export const getUserProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};
