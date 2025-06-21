import React, { useState } from 'react'
import {
  FormContainer,
  FormCard,
  FormTitle,
  StyledTextField,
  SubmitButton,
  ErrorText,
} from './AuthForm.styles'
import { Link, useNavigate } from 'react-router-dom' // Import useNavigate
import { Typography } from '@mui/material'
import { appPaths } from 'entities/config'
import { useAuth } from '../../../../../app/providers/auth-management/AuthContext'; // Adjust the path based on your AuthContext location

export const SignupForm = () => {
  const { signup, loading, error } = useAuth(); // Use signup, loading, error from AuthContext
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signup(form) // Use signup from AuthContext
      alert('Signup successful! Please log in with your new account.'); // Inform user
      navigate(appPaths.userLogin); // Redirect to login page after successful signup
    } catch (err) {
      console.error('Signup failed:', err);
      // Error is now handled by the AuthContext, so `error` state will be updated there.
    }
  }

  return (
    <FormContainer>
      <FormCard elevation={3}>
        <FormTitle>Create an Account</FormTitle>
        {error && <ErrorText>{error}</ErrorText>}

        <form onSubmit={handleSubmit}>
          <StyledTextField
            label="Name"
            name="name"
            fullWidth
            value={form.name}
            onChange={handleChange}
            required
          />
          <StyledTextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
            required
          />
          <StyledTextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={form.password}
            onChange={handleChange}
            required
          />
          <SubmitButton
            variant="contained"
            color="success"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </SubmitButton>
        </form>

        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Already have an account?{' '}
          <Link
            to={appPaths.userLogin}
            style={{
              color: '#2563eb',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Login
          </Link>
        </Typography>
      </FormCard>
    </FormContainer>
  )
}