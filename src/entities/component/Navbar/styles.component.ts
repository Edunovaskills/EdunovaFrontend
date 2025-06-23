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
  gap: '30px', // Reduced gap for better fit on wider screens
  marginLeft: '-200px',
})

// Note: The `.active-nav-link` CSS class for active links
// should ideally be handled in a global stylesheet or integrated into your Material-UI theme.
// For example, if you have a global CSS file, you would add:
/*
.active-nav-link .MuiTypography-root {
  font-weight: 700 !important;
  color: #2563eb !important; // Or theme.palette.primary.main
}
*/
// Or you can achieve it via `sx` prop directly on NavLink's Typography component
// by checking `isActive` prop from NavLink's render prop.
