import { Stack, styled } from '@mui/material'

export const StackStyled = styled(Stack)(({ theme }) => ({
  width: '100vw',
  minHeight: '450px',
  justifyContent: 'center',
  gap: '30px',
  background: '#11104b',
}))

export const WrapperStyled = styled('div')({
  maxWidth: '1550px',
  display: 'flex',
  flexDirection: 'column',
  gap: '30px',
  alignItems: 'center',
  justifyContent: 'center',
})
