import { Stack, styled } from '@mui/material'

export const InfoSectionWrapperStyled = styled('div')<{ smallscreen: boolean }>(
  () =>
    ({ smallscreen, theme: { palette } }) => ({
      display: 'flex',
      flexDirection: smallscreen ? 'column' : 'row',
      gap: '10px',
      background: palette.blue['100'],
      padding: smallscreen ? '1vw 3vw' : '1rem',
      borderRadius: '10px',
      width: smallscreen ? '100vw' : '100%',
      justifyContent: smallscreen ? 'center' : 'space-between',
    })
)

export const StackStyled = styled(Stack)<{ smallscreen: boolean }>(
  ({ smallscreen }) => ({
    flexDirection: smallscreen ? 'column' : 'row',
    alignItems: 'center',
    gap: smallscreen ? '66px' : 'none',
    marginTop: smallscreen ? '2rem' : 'none',
  })
)

export const WrapperStackStyled = styled(Stack)({
  gap: '12px',
  maxWidth: '250px',
  alignItems: 'center',
})
