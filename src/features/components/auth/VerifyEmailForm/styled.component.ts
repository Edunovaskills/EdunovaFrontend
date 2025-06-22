import { Box, BoxProps, Button, inputBaseClasses, styled } from '@mui/material'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Link, LinkProps } from 'react-router-dom'

export const ResendButtonStyled = styled(Button)(({ theme }) => ({
  color: `${(theme.palette.secondary as unknown as { 700: string })[700]} !important`,
  background: 'none !important',
  border: 'none',
  display: 'inline-flex',
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.body1.fontSize,
  paddingBlock: 0,
  lineHeight: '1',
  height: 'auto',
  cursor: 'pointer',
  ':disabled': {
    cursor: 'not-allowed',
    color: theme.palette.text.disabled,
  },
}))

type Props = {
  error: boolean
}

export const MuiOtpInputStyled = styled(MuiOtpInput)<Props>(({ error }) => ({
  [` ${inputBaseClasses.root}`]: {
    borderWidth: error ? 'none' : '1px',
  },
  gap: '0.5rem',
}))

export const FormWrapper = styled(Box)<BoxProps>({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.3rem',
  justifyContent: 'center',
  width: '100%',
  flex: 1,
  maxWidth: '600px',
  padding: '1rem',
  margin: 'auto',
  marginTop: '5rem',
  boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
})

export const LinkStyled = styled(Link)<LinkProps>({
  textAlign: 'right',
  display: 'inline',
  fontSize: '0.875rem',
  fontWeight: 500,
  marginTop: '-1rem !important',
  '&:hover': {
    textDecoration: 'underline !important',
  },
})

export const HeaderStyled = styled('div')`
  display: flex;
  gap: 0.75rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
