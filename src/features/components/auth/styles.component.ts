import styled from '@emotion/styled'
import { Box, Typography, Button, TextField, Paper } from '@mui/material'

export const FormContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
`

export const FormCard = styled(Paper)`
  padding: 3rem 2.5rem;
  max-width: 500px;
  width: 100%;
  border-radius: 1rem;
  background-color: #ffffff;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.1);
  }
`

export const FormTitle = styled(Typography)`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  color: #0f172a;
`

export const StyledTextField = styled(TextField)`
  margin-bottom: 1.25rem;

  & label.Mui-focused {
    color: #2563eb;
  }

  & .MuiOutlinedInput-root {
    border-radius: 0.75rem;

    & fieldset {
      border-color: #cbd5e1;
    }

    &:hover fieldset {
      border-color: #94a3b8;
    }

    &.Mui-focused fieldset {
      border-color: #2563eb;
    }
  }
`

export const SubmitButton = styled(Button)`
  margin-top: 1.5rem;
  padding: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  background-color: #2563eb;
  border-radius: 0.75rem;
  text-transform: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #1d4ed8;
  }
`

export const ErrorText = styled(Typography)`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: center;
`
