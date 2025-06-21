import React, { useState, useEffect } from 'react'; // Import useEffect
import {
  FormContainer,
  FormCard,
  FormTitle,
  StyledTextField,
  SubmitButton,
  ErrorText, // You might choose to remove this if Snackbar is your only error display
} from './AuthForm.styles';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, TextField, Snackbar, Alert } from '@mui/material'; // Import Snackbar and Alert
import { appPaths } from 'entities/config';
import { useAuth } from '../../../../../app/providers/auth-management/AuthContext'; // Adjust the path based on your AuthContext location

export const LoginForm = () => {
  // Destructure `clearError` if your AuthContext provides a method to clear its error state
  const { login, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // States for the Snackbar notification
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info'); // Type for severity

  const navigate = useNavigate();

  // useEffect to watch for changes in the `error` state from AuthContext
  // and display them in the Snackbar
  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      // Optional: If your AuthContext has a `clearError` method, you might call it here
      // after a short delay or when the snackbar closes, to reset the context's error state.
      // For example: setTimeout(() => clearError(), 5000);
    }
  }, [error]); // Dependency array: run this effect when `error` from useAuth changes

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
    // Optional: Call clearError() here if you want to reset the context's error
    // when the user manually closes the snackbar.
    // if (clearError) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOpenSnackbar(false); // Close any existing snackbar before a new submission
    setSnackbarMessage(''); // Clear previous snackbar message
    setSnackbarSeverity('info'); // Reset severity to default

    // Optional: Clear error from AuthContext immediately before a new login attempt
    if (clearError) clearError();

    try {
      const userResponse = await login({ email, password });

      // On successful login, show success message in Snackbar
      // We expect the backend to send a `message` field in the response now
      setSnackbarMessage(userResponse?.message || 'Logged in successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      // Navigate based on user role
      const role = userResponse?.data?.user?.role; // Access user.role from the response data
      if (role === 'admin') {
        navigate(appPaths.admin);
      } else {
        navigate(appPaths['/']);
      }
    } catch (err) {
      // The `error` state from `useAuth` is updated by the AuthContext's `login` function
      // and the `useEffect` above will automatically trigger the Snackbar display.
      console.error('Login submission failed:', err); // Log for debugging purposes
    }
  };

  return (
    <FormContainer>
      <FormCard elevation={3}>
        <FormTitle>Login to Edunova</FormTitle>
        {/* The direct ErrorText can be removed if Snackbar is your primary notification method */}
        {/* {error && <ErrorText>{error}</ErrorText>} */}
        {/* Removed the successMessage Typography as it's now handled by Snackbar */}

        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            margin="normal" // Added for consistent spacing
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal" // Added for consistent spacing
          />
          <SubmitButton
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{ mb: 2, mt: 2 }} // Added margin-top for spacing
          >
            {loading ? 'Logging in...' : 'Login'}
          </SubmitButton>
        </form>

        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          New user?{' '}
          <Link
            to={appPaths.userSignup}
            style={{
              color: '#2563eb',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Sign up
          </Link>
        </Typography>
      </FormCard>

      {/* Snackbar component for notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // How long the snackbar stays open (in milliseconds)
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Position of the snackbar
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity} // 'success' or 'error'
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </FormContainer>
  );
};