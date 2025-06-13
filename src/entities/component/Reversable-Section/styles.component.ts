import { styled } from '@mui/material'

export const WrapperStyled = styled('div')<{ reverse?: boolean }>(
  ({ reverse }) => ({
    display: 'flex',
    gap: '120px',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: reverse ? 'row-reverse' : 'row',
  })
)
