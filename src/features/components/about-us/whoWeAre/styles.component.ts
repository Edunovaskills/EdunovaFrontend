import { styled } from '@mui/material'

export const ImagesWrapperStyled = styled('div')<{ issmall: boolean }>(
  ({ issmall }) => ({
    display: 'flex',
    width: '100%',
    gap: '8px',
    flexWrap: 'wrap',
    justifyContent: issmall ? 'center' : 'space-between',
  })
)
