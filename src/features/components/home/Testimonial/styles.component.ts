import { Card, styled, Typography } from '@mui/material'

export const CardStyled = styled(Card)<{ isNext: boolean }>(
  ({ theme, isNext }) => ({
    textAlign: 'left',
    p: 1,
    minHeight: '285px',
    maxWidth: '420px',
    maxHeight: '285px',
    display: 'flex',
    gap: '40px',
    background: isNext ? theme.palette.action.hover : 'unset',
    boxShadow: isNext ? '0px 8px 16px rgba(0, 0, 0, 0.2)' : 'unset',

    transition: 'background 0.3s ease',
  })
)

export const CardContentWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
})
export const TypographyStyled = styled(Typography)({
  mt: 1,
  fontStyle: 'italic',
  color: 'grey.600',
})
