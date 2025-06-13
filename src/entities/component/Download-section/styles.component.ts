import { Button, styled } from '@mui/material'

export const WrapperStyled = styled('div')<{ issmall: boolean }>(
  ({
    theme: {
      palette: { sectionBackground },
    },
    issmall,
  }) => ({
    width: '100vw',
    background: sectionBackground,
    display: 'flex',
    flexDirection: issmall ? 'column' : 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: issmall ? '0.75rem' : 'unset',
    gap: issmall ? '10px' : 'unset',
  })
)

export const ButtonStyled = styled(Button)({
  textTransform: 'none',
  height: 'fit-content',
  ['& .MuiButton-startIcon > :nth-of-type(1)']: {
    fontSize: '32px',
  },
})
