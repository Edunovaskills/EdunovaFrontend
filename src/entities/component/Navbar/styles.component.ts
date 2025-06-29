import { styled } from '@mui/material'
import { STYLES_SIZE_CONSTANTS } from 'shared/utils'

// Styled component for the main Navbar container
export const NavbarWrapperStyled = styled('div')<{ smallScreen: boolean }>(
  ({ theme, smallScreen }) => ({
    // Assuming 'theme' is provided by Material-UI ThemeProvider
    // If not using ThemeProvider, replace `theme.palette.neutral.white` with a direct color like '#FFFFFF'
    background: theme?.palette?.neutral?.white || '#FFFFFF', // Use theme color for background, with fallback
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // Responsive padding based on screen size
    padding: smallScreen ? '1rem 1.5rem' : '1.25rem 4.375rem', // Adjusted padding for better aesthetics
    width: '100%',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)', // Subtle shadow for depth
    position: 'sticky', // Make navbar sticky at the top
    top: 0,
    zIndex: 1100, // Ensure it stays above other content
    height: STYLES_SIZE_CONSTANTS.headerHeight,
  })
)

// Styled component for the start section (logo and brand text)
export const StartViewWrapperStyled = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
})

// Styled component for the main menu items wrapper (desktop)
export const MenuItemsWrapperStyled = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  marginLeft: '-50px',
  maxWidth: '600px',
})
