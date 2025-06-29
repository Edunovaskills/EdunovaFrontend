import { IconButton } from '@mui/material'
import {
  FormCard,
  FormContainer,
  FormTitle,
  StyledTextField,
  SubmitButton,
} from '../styles.component'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { resetPasswordSchema, type ResetPasswordSchema } from 'features/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useResetPasswordMutation } from 'entities/mutation/auth/reset-user.mutation'
import { useAppNavigate } from 'entities/state'

const RenderEndIcon = ({ toggleEye }: { toggleEye: boolean }) => {
  return toggleEye ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />
}
export const ResetPassword = ({ email }: { email: string }) => {
  const [toggleEye, setToggleEye] = useState(false)
  const { mutateAsync, isPending } = useResetPasswordMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordSchema>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
      email,
    },
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onTouched',
  })
  const { appNavigate } = useAppNavigate()

  const onSubmit = async (data: ResetPasswordSchema) => {
    await mutateAsync(data)
    appNavigate('userLogin')
  }

  return (
    <FormContainer>
      <FormCard elevation={3}>
        <FormTitle>Reset Password</FormTitle>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <StyledTextField
            label="New Password"
            type={toggleEye ? 'text' : 'password'}
            fullWidth
            {...register('newPassword')}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setToggleEye(!toggleEye)}>
                  <RenderEndIcon toggleEye={toggleEye} />
                </IconButton>
              ),
            }}
          />
          <StyledTextField
            label="Confirm Password"
            type={toggleEye ? 'text' : 'password'}
            fullWidth
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
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
            loading={isPending}
            disabled={!isValid || isPending}
          >
            Reset Password
          </SubmitButton>
        </form>
      </FormCard>
    </FormContainer>
  )
}
