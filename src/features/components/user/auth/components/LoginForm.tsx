import React, { useState } from 'react';
import {
  FormContainer,
  FormCard,
  FormTitle,
  StyledTextField,
  SubmitButton,
  ErrorText,
} from './AuthForm.styles';
import { useLogin } from '../hooks/useLogin'; // This hook handles email/password login
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material'; // Import Button from MUI
import GoogleIcon from '@mui/icons-material/Google'; // Import a Google icon
import { appPaths } from 'entities/config';
import { auth, googleProvider } from '../../../../../firebaseConfig'; // Adjust path as needed for your Firebase setup
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Import GoogleAuthProvider

export const LoginForm = () => {
  const { login, loading, error } = useLogin(); // This hook handles email/password login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // To show success messages

  // Handles traditional email/password login submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null); // Clear previous messages
    try {
      await login({ email, password });
      setSuccessMessage('Logged in successfully!');
      console.log('Traditional login successful!');
      // Optionally, navigate to a dashboard or home page
      // For example, if you have 'useNavigate' from 'react-router-dom':
      // navigate(appPaths.dashboard);
    } catch (err) {
      // Error is already handled by useLogin hook, it will update the `error` state.
      console.error('Traditional login failed:', err);
    }
  };

  // Handles Google login using Firebase signInWithPopup
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setGoogleError(null);
    setSuccessMessage(null); // Clear previous messages
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // You can access user information from 'result.user'.
      // For example: result.user.uid, result.user.email, result.user.displayName, result.user.photoURL
      console.log('Signed in with Google successfully! User:', result.user);

      // If you need to send this user data to your own backend
      // for additional processing (e.g., storing in your database,
      // linking with existing accounts, setting up custom claims),
      // you would do it here using result.user.uid or result.user.email.
      // Example: await yourBackendApi.post('/api/auth/google-login', { firebaseUid: result.user.uid });

      setSuccessMessage('Signed in with Google successfully!');
      // Optionally, navigate to a dashboard or home page
      // For example, if you have 'useNavigate' from 'react-router-dom':
      // navigate(appPaths.dashboard);
    } catch (error) {
      // Handle Firebase Auth errors during Google sign-in
      if (error instanceof Error) {
        const firebaseError = error as any; // Cast to any to access specific Firebase error properties
        const errorCode = firebaseError.code;
        const errorMessage = firebaseError.message;
        const email = firebaseError.customData?.email; // Email of the account used
        const credential = GoogleAuthProvider.credentialFromError(firebaseError); // The AuthCredential type that was used.

        console.error("Google Sign-in Error Code:", errorCode);
        console.error("Google Sign-in Error Message:", errorMessage);
        console.error("Google Sign-in Email (if available):", email);
        console.error("Google Sign-in Credential (if available):", credential);

        setGoogleError(errorMessage || 'Failed to sign in with Google.');
      } else {
        setGoogleError('An unknown error occurred during Google sign-in.');
        console.error("Unknown Google Sign-in Error:", error);
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormCard elevation={3}>
        <FormTitle>Login to Edunova</FormTitle>
        {/* Display errors from traditional login */}
        {error && <ErrorText>{error}</ErrorText>}
        {/* Display errors from Google login */}
        {googleError && <ErrorText>{googleError}</ErrorText>}
        {/* Display success messages */}
        {successMessage && <Typography color="success" align="center" sx={{ mb: 2 }}>{successMessage}</Typography>}

        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <StyledTextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <SubmitButton
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{ mb: 2 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </SubmitButton>
        </form>

        <Typography variant="body2" align="center" sx={{ marginTop: 2, marginBottom: 2 }}>
          OR
        </Typography>

        {/* Google Login Button using Material-UI Button */}
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          startIcon={<GoogleIcon />}
          sx={{
            py: 1.5, // Padding vertical
            borderRadius: '8px', // Rounded corners
            borderColor: '#db4437', // Google red border
            color: '#db4437', // Google red text
            '&:hover': {
              backgroundColor: 'rgba(219, 68, 55, 0.04)', // Light red hover
              borderColor: '#db4437',
            },
            '&:disabled': {
              borderColor: 'rgba(0, 0, 0, 0.26)',
              color: 'rgba(0, 0, 0, 0.26)',
            },
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          {googleLoading ? 'Signing in with Google...' : 'Login with Google'}
        </Button>


        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          New user?{' '}
          <Link
            to={appPaths.userSignup}
            style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}
          >
            Sign up
          </Link>
        </Typography>
      </FormCard>
    </FormContainer>
  );
};
