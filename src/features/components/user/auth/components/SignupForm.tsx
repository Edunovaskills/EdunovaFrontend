import React, { useState } from 'react'
import {
  FormContainer,
  FormCard,
  FormTitle,
  StyledTextField,
  SubmitButton,
  ErrorText,
} from './AuthForm.styles'
import { useSignup } from 'features/hooks' // We'll modify this hook or create a new one
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material' // Import Button from MUI
import GoogleIcon from '@mui/icons-material/Google' // Import a Google icon
import { appPaths } from 'entities/config'
import { auth, googleProvider } from '../../../../../firebaseConfig' // Adjust path as needed
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export const SignupForm = () => {
  const { signup, loading, error } = useSignup() // This hook handles email/password signup
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [googleLoading, setGoogleLoading] = useState(false)
  const [googleError, setGoogleError] = useState(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signup(form)
      alert('Signup successful!')
    } catch (err) {
      // Error is already handled by useSignup hook, but you can add more here if needed
    }
  }

  const handleGoogleSignup = async () => {
    setGoogleLoading(true)
    setGoogleError(null)
    console.log('Google Signup started') // Add this line
    try {
      const result = await signInWithPopup(auth, googleProvider)
      // FIXME: Check this form where you need import this @Ashish
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      const user = result.user

      alert('Signed in with Google successfully!')
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData?.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      setGoogleError(errorMessage || 'Failed to sign in with Google.')
      console.error('Google Sign-in Error:', error)
    } finally {
      setGoogleLoading(false)
      console.log('Google Signup finished') // Add this line
    }
  }

  return (
    <FormContainer>
      <FormCard elevation={3}>
        <FormTitle>Create an Account</FormTitle>
        {error && <ErrorText>{error}</ErrorText>}
        {googleError && <ErrorText>{googleError}</ErrorText>}
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

        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: 2, marginBottom: 2 }}
        >
          OR
        </Typography>

        <SubmitButton
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleGoogleSignup}
          disabled={googleLoading}
          startIcon={<GoogleIcon />}
        >
          {googleLoading ? 'Signing in with Google...' : 'Sign up with Google'}
        </SubmitButton>

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
