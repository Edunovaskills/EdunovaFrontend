import { useState } from 'react'
import { loginAPI } from '../components/user/auth/api/authAPI'
import { LoginData } from '../../shared/types/user'

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (data: LoginData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await loginAPI(data)
      return response
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error, setError, isLoading: loading }
}
