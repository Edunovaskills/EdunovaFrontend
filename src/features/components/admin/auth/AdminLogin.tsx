import React, { useState } from 'react';
import { LoginForm } from '../../user/auth/components/LoginForm';
import { useLogin } from '../../user/auth/hooks/useLogin'; // We still import it, but won't call it if simulating
import { adminStyles } from '../AdminStyles';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

// Define constant admin credentials for development/testing
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'adminpassword'; // In a real app, never hardcode passwords!

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  // We still use useLogin to potentially get its error/loading state props for the LoginForm,
  // but we won't call its 'login' function if simulating.
  const { /* login, */ isLoading, error, setError } = useLogin(); // Destructure setError if available in useLogin

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null); // State for local error messages
  const [localIsLoading, setLocalIsLoading] = useState(false); // State for local loading

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null); // Clear previous errors
    setLocalIsLoading(true); // Set loading state for simulation

    // Simulate a delay to mimic network request
    await new Promise(resolve => setTimeout(resolve, 500));

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      console.log("Admin login successful (simulated)");
      onLoginSuccess();
    } else {
      console.error("Invalid admin credentials (simulated)");
      setLocalError("Invalid email or password."); // Set a user-friendly error message
    }
    setLocalIsLoading(false); // Clear loading state
  };

  return (
    <div style={adminStyles.loginContainer}>
      <h2 style={adminStyles.loginTitle}>Admin Login</h2>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleAdminLogin}
        isLoading={localIsLoading || isLoading} // Use local loading state, or useLogin's if available
        error={localError || error}             // Use local error, or useLogin's if available
        buttonText="Login as Admin"
      />
    </div>
  );
};