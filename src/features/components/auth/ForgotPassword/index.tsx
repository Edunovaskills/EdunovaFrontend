import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import { Typography, Button } from '@mui/material'
import { appPaths } from 'entities/config'
import { Controller, useForm } from 'react-hook-form'

import { useEffect, useState } from 'react'
import { FormCard, FormContainer, StyledTextField } from '../styles.component'
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from 'features/schema'
import { useForgotPasswordMutation } from 'entities/mutation/auth/forgot-password.mutation'
import { useAppNavigate } from 'entities/state'
import { useVerifyOtpMutation } from 'entities/mutation/auth/verify-otp.mutation'
import { useResendOtpMutation } from 'entities/mutation'
import { MuiOtpInputStyled } from '../VerifyEmailForm/styled.component'

export const ForgotPassword = () => {
  const form = useForm<ForgotPasswordSchema>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
      isEmailSent: false,
    },
    mode: 'onTouched',
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    getValues,
    control,
  } = form

  const [timer, setTimer] = useState(30)
  const [isTimerActive, setIsTimerActive] = useState(true)
  const email = watch('email')

  const { mutateAsync: resendVerificationEmail, isPending: isResendPending } =
    useResendOtpMutation()

  const handleResend = () => {
    if (timer) return
    resendVerificationEmail({ email })
    restartTimer()
  }
  const isEmailSent = watch('isEmailSent')

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerActive && timer > 0 && isEmailSent) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setIsTimerActive(false)
    }
    return () => clearInterval(interval)
  }, [isEmailSent, isTimerActive, timer])

  const restartTimer = () => {
    setTimer(30)
    setIsTimerActive(true)
  }

  const { mutateAsync, isPending } = useForgotPasswordMutation()

  const { mutateAsync: verifyMutation, isPending: verifyMutationPending } =
    useVerifyOtpMutation()

  const { appNavigate } = useAppNavigate()

  const onSubmit = async (data: ForgotPasswordSchema) => {
    await verifyMutation(data)
    appNavigate('resetPassword', {
      state: { email: data.email },
    })
  }

  const handleEmailSent = async () => {
    const email = getValues('email')
    await mutateAsync({ email })
    setValue('isEmailSent', true)
  }

  const matchIsNumeric = (text: string) => {
    return text !== '' && !Number.isNaN(Number(text))
  }

  // Clear custom password error when user starts typing

  return (
    <FormContainer>
      <FormCard elevation={3}>
        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
          <StyledTextField
            label="Email"
            placeholder="Email"
            fullWidth
            margin="normal"
            {...register('email')}
            InputProps={{
              readOnly: isEmailSent,
            }}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {isEmailSent ? (
            <>
              <Controller
                name="otp"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <Typography variant="caption1.400" color="text.secondary">
                      Enter the code sent to your email
                    </Typography>
                    <MuiOtpInputStyled
                      error={!!fieldState.error}
                      TextFieldsProps={{
                        disabled: isPending,
                        error: !!fieldState.error,
                      }}
                      autoFocus
                      value={field.value}
                      validateChar={matchIsNumeric}
                      onChange={(value: string) =>
                        field.onChange({ target: { value } })
                      }
                      length={6}
                    />
                    <Typography variant="caption1.400" color="error">
                      {fieldState.error?.message}
                    </Typography>
                  </div>
                )}
              />
              <Typography color="text.secondary" align="center" variant="body1">
                Did not receive code?{' '}
                <Typography
                  display="inline"
                  sx={{
                    textDecoration: !timer ? 'underline' : 'none',
                    fontWeight: 500,
                    cursor: !timer ? 'pointer' : 'default',
                  }}
                  onClick={handleResend}
                >
                  {timer ? `Resend code in ${timer} seconds` : 'Resend code'}
                </Typography>
              </Typography>
            </>
          ) : null}

          <Button
            variant="contained"
            fullWidth
            type={isEmailSent ? 'submit' : 'button'}
            onClick={isEmailSent ? undefined : handleEmailSent}
            sx={{ mb: 2, mt: 3 }}
            loading={isPending || verifyMutationPending || isResendPending}
            disabled={
              isPending || !isValid || verifyMutationPending || isResendPending
            }
          >
            {!isEmailSent ? 'Send otp' : 'Verify Email'}
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
