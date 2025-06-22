import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import {
  verifyEmailSchema,
  type SignUpSchema,
  type VerifyEmailSchema,
} from 'features/schema'
import { useVerifyEmailMutation } from 'entities/mutation/auth/verify-email.schema'
import {
  FormWrapper,
  HeaderStyled,
  MuiOtpInputStyled,
} from './styled.component'
import { useResendOtpMutation } from 'entities/mutation'

type Props = {
  signUpPayload: SignUpSchema
}

export function VerifyEmailForm({ signUpPayload }: Props) {
  const { email } = signUpPayload

  const [timer, setTimer] = useState(30)
  const [isTimerActive, setIsTimerActive] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setIsTimerActive(false)
    }
    return () => clearInterval(interval)
  }, [isTimerActive, timer])

  const restartTimer = () => {
    setTimer(30)
    setIsTimerActive(true)
  }

  const {
    control,
    setError,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<VerifyEmailSchema>({
    defaultValues: { otp: '', email: signUpPayload.email },
    resolver: yupResolver(verifyEmailSchema),
  })

  const formRef = React.useRef<HTMLFormElement>(null)

  const { mutateAsync, isPending } = useVerifyEmailMutation()

  const { mutateAsync: resendVerificationEmail, isPending: isResendPending } =
    useResendOtpMutation()

  const onSubmit = (payload: VerifyEmailSchema) => {
    mutateAsync(payload)
  }

  const handleResend = () => {
    if (timer) return
    resendVerificationEmail({ email: signUpPayload.email })
    reset()
    restartTimer()
  }

  const matchIsNumeric = (text: string) => {
    return text !== '' && !Number.isNaN(Number(text))
  }

  const emailMasked = email.replace(/^(.*)(..)(@.*)$/, (_, ...p) => {
    const [p1, p2, p3] = p
    return '*'.repeat(p1.length) + p2 + p3
  })

  return (
    <FormWrapper
      component="form"
      ref={formRef}
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
    >
      <HeaderStyled>
        <Typography variant="h5.600">Verify Email</Typography>
        <Typography variant="body1.400" color="text.secondary">
          {` We have sent a verification code to ${emailMasked}. Please enter the code
          below.`}
        </Typography>
      </HeaderStyled>
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
              onComplete={() => {
                formRef.current?.requestSubmit()
              }}
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

      <Button
        loading={isPending || isResendPending}
        disabled={!isValid || isPending || isResendPending}
        type="submit"
      >
        Verify Email
      </Button>
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
    </FormWrapper>
  )
}

export default VerifyEmailForm
