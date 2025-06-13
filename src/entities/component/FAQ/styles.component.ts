import { Accordion, Stack, styled } from '@mui/material'

export const StackStyled = styled(Stack)({
  gap: '32px',
  padding: '20px',
  maxWidth: '950px',
  margin: 'auto',
})

export const AccordionStyled = styled(Accordion)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  boxShadow: 'none',
  border: 'none !important',
  borderBottom: '1px solid !important',
  borderColor: theme.palette.border.main + '!important',
  ['&:before']: { display: 'none' },
  marginTop: 'unset !important',
}))
