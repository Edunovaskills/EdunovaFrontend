import React, { useState } from 'react'
import {
  FormContainer,
  FormCard,
  FormTitle,
  StyledTextField,
  SubmitButton,
} from './styles.component'
import { Link } from 'react-router-dom' // Import useNavigate
import { IconButton, Typography } from '@mui/material'
import { appPaths } from 'entities/config'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpSchema, type SignUpSchema } from 'features/schema'
import { useSignUpMutation } from 'entities/mutation'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const RenderEndIcon = ({ toggleEye }: { toggleEye: boolean }) => {
  return toggleEye ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />
}

export const SignupForm = () => {
  const form = useForm<SignUpSchema>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onTouched',
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form

  const { mutateAsync, isPending } = useSignUpMutation()

  const onSubmit = async (data: SignUpSchema) => {
    await mutateAsync(data)
  }

  const [toggleEye, setToggleEye] = useState(false)

  return (
    <FormContainer>
      <FormCard elevation={3}>
        <FormTitle>Create an Account</FormTitle>
        <form
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e)
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <StyledTextField
            label="Name"
            fullWidth
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <StyledTextField
            label="Email"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <StyledTextField
            label="Password"
            type={toggleEye ? 'text' : 'password'}
            fullWidth
            {...register('password')}
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
          <SubmitButton
            variant="contained"
            color="success"
            fullWidth
            type="submit"
            disabled={!isValid}
            loading={isPending}
          >
            Signup
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
