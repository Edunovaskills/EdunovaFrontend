import axios from 'axios'
import { LoginData, SignupData } from '../../../../../shared/types/user'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

export const loginAPI = async (data: LoginData) => {
  try {
    const response = await api.post('/auth/login', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const signupAPI = async (data: SignupData) => {
  try {
    const response = await api.post('/auth/signup', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUserProfile = async () => {
  try {
    const response = await api.get('/user/profile')
    return response.data
  } catch (error) {
    throw error
  }
}
