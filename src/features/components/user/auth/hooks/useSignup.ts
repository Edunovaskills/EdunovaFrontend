import { useState } from 'react';
import { signupAPI } from '../api/authAPI';
import { SignupData } from '../../../../../types/user';

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (data: SignupData) => {
    setLoading(true);
    setError(null);
    console.log("Signup started");
    try {
      const response = await signupAPI(data);
      console.log("Signup successful");
      return response;
    } catch (err: any) {
      setError(err.message);
      console.error("Signup error:", err);
      throw err;
    } finally {
      setLoading(false);
      console.log("Signup finished");
    }
  };

  return { signup, loading, error };
};
