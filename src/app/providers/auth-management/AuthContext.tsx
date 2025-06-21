// AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { loginAPI, signupAPI, getUserProfile, logoutAPI } from '../../../features/components/user/auth/api/authAPI';
import { LoginData, SignupData, User } from 'shared/types/user';
import Cookies from 'js-cookie'; // Keep if you use client-side accessible cookies for other things, or a fallback

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<any>;
  signup: (data: SignupData) => Promise<any>;
  logout: () => void;
  fetchUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // **CRITICAL CHANGE HERE:**
      // If your main token is HttpOnly, Cookies.get will NOT find it.
      // We should rely primarily on the success/failure of getUserProfile
      // which will send the HttpOnly cookie automatically.

      const userData = await getUserProfile(); // This request *should* automatically send HttpOnly cookies

      if (userData) {
        // If userData is successfully returned, it means the HttpOnly token was valid
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        // If getUserProfile returns null/undefined but doesn't throw,
        // it means the backend implicitly indicates no valid session.
        console.warn('getUserProfile returned null/undefined user data. Assuming no active session.');
        setIsAuthenticated(false);
        setUser(null);
        // Ensure client-side cookies are also cleared if they were ever set for session tracking
        Cookies.remove('token');
        Cookies.remove('x-access-token');
      }
    } catch (err: any) {
      console.error('Failed to fetch user profile on app load or session invalid:', err);
      setIsAuthenticated(false);
      setUser(null);
      // Robust error handling for session expiration/invalidation
      if (err.response?.status === 401 || err.response?.status === 403 || err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
         // Clear client-side cookies if token is expired or invalid (fallback, HttpOnly handled by backend)
         Cookies.remove('token');
         Cookies.remove('x-access-token');
         setError('Your session has expired or is invalid. Please log in again.');
      } else {
         setError(err.response?.data?.message || err.message || 'Failed to fetch user session.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const login = async (data: LoginData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginAPI(data);
      // Assuming successful login sets an HttpOnly cookie on the backend
      // and potentially a client-side readable one if needed for other purposes.
      // If your backend sends a client-side token, you might set it here:
      // if (response.data.token) { Cookies.set('token', response.data.token); }

      // After successful login, immediately fetch profile to ensure state is synced
      // with what the backend considers the active user.
      await fetchUserProfile(); // This will update user and isAuthenticated based on the *new* valid session
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Login failed.');
      setLoading(false);
      throw err;
    }
  };

  const signup = async (data: SignupData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await signupAPI(data);
      // Often, signup might directly log the user in, or you'd prompt them to log in.
      // If signup also returns a token and logs them in, you might call fetchUserProfile here too.
      setLoading(false);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Signup failed.');
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await logoutAPI(); // This is crucial. The backend must clear the HttpOnly cookie.
      // After backend clears it, update client-side state.
      setIsAuthenticated(false);
      setUser(null);
      Cookies.remove('token'); // Clear any client-side cookies
      Cookies.remove('x-access-token');
    } catch (err: any) {
      console.error('Logout failed on API call:', err);
      setError(err.response?.data?.message || err.message || 'Logout failed.');
      // Even if API call fails, ensure client-side state is cleared for a consistent UX
      setIsAuthenticated(false);
      setUser(null);
      Cookies.remove('token');
      Cookies.remove('x-access-token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, error, login, signup, logout, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};