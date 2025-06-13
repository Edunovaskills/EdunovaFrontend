import { styled } from '@mui/material'

export const NavbarWrapperStyled = styled('div')<{ smallScreen: boolean }>(
  ({ theme: { palette }, smallScreen }) => ({
    background: palette.neutral.white,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: smallScreen ? '1rem' : '1.25rem 4.375rem',
    paddingLeft: smallScreen ? '2rem' : '4.375rem',
    width: '100%',
  })
)

export const StartViewWrapperStyled = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '14px',
})

export const MenuItemsWrapperStyled = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '50px',
})
