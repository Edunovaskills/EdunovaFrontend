import { styled } from '@mui/material'

export const WrapperStyled = styled('div')<{
  iconBackgroundColor?: string
  size?: number
}>(({ theme: { palette }, iconBackgroundColor, size }) => ({
  background: iconBackgroundColor ?? palette.secondary.main,
  minWidth: size ? `${size}px` : '44px',
  minHeight: size ? `${size}px` : '44px',
  maxWidth: size ? `${size}px` : '44px',
  maxHeight: size ? `${size}px` : '44px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: palette.common.white,
}))
