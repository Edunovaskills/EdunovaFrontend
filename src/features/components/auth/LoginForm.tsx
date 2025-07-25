import {
  FormContainer,
  FormCard,
  StyledTextField,
  SubmitButton,
} from './styles.component'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { Typography, TextField, IconButton, Button } from '@mui/material'
import { appPaths } from 'entities/config'
import { useForm } from 'react-hook-form'
import { loginSchema, type LoginSchema } from 'features/schema/login.schema'
import { useLoginMutation } from 'entities/mutation'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'

const RenderEndIcon = ({ toggleEye }: { toggleEye: boolean }) => {
  return toggleEye ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />
}

export const LoginForm = () => {
  const form = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  })

  const { mutate, isPending } = useLoginMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = form

  const onSubmit = (data: LoginSchema) => {
    mutate(data, {
      onError: (error: any) => {
        const message =
          error?.response?.data?.error || 'An unexpected error occurred.'
        setError('email', { type: 'custom' })
        setError('password', {
          type: 'custom',
          message,
        })
      },
    })
  }

  const [toggleEye, setToggleEye] = useState(false)

  // Clear custom password error when user starts typing
  const handleFieldChange = () => {
    if (errors.password?.type === 'custom') {
      clearErrors(['email', 'password'])
    }
  }

  return (
    <FormContainer>
      <FormCard elevation={3}>
        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
          <StyledTextField
            label="Email"
            placeholder="Email"
            fullWidth
            margin="normal"
            {...register('email', {
              onChange: () => handleFieldChange(),
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <div>
            <TextField
              label="Password"
              placeholder="Password"
              fullWidth
              margin="normal"
              type={toggleEye ? 'text' : 'password'}
              {...register('password', {
                onChange: () => handleFieldChange(),
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setToggleEye(!toggleEye)}>
                    <RenderEndIcon toggleEye={toggleEye} />
                  </IconButton>
                ),
              }}
            />
            <Typography
              variant="body2.500"
              component={Link}
              to={appPaths.forgotPassword}
              sx={{
                color: 'primary.main',
                textAlign: 'right',
                display: 'block',
              }}
            >
              Forgot Password?
            </Typography>
          </div>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mb: 2, mt: 3 }}
            loading={isPending}
            disabled={isPending || !isValid}
          >
            Login
          </Button>
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
    </FormContainer>
  )
}
