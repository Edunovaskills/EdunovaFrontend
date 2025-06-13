import { styled } from '@mui/material'

export const LogoWrapperStyled = styled('div')(({ theme: { palette } }) => ({
  background: palette.primary.main,
  height: '40px',
  width: '40px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))
