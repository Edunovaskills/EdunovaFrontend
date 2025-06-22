import { useEffect, useState } from 'react'
import { getUserProfile } from '../components/auth/api/authAPI'

interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  role?: string
}

export const useUserProfile = () => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile()
        setUser(data)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  return { user, isLoading, error }
}
