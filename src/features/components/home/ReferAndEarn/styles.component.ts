import { Stack, styled } from '@mui/material'

export const BottomWrapperStyled = styled('div')<{ issmall: boolean }>(
  ({ theme, issmall }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    borderRadius: '10px',
    background: theme.palette.blue['100'],
    width: '100%',
    flexDirection: issmall ? 'column' : 'row',
    padding: issmall ? '2rem' : 'unset',
  })
)

export const ContainerStyled = styled(Stack)({
  alignItems: 'center',
  gap: '1rem',
})
