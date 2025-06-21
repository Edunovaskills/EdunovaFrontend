import { Stack, styled } from '@mui/material';

export const StackStyled = styled(Stack)(({ theme }) => ({
  width: '100vw',
  // Use responsive minHeight to ensure content visibility without being too tall on small screens
  minHeight: '400px', // A slightly more flexible minimum height
  [theme.breakpoints.up('md')]: {
    minHeight: '450px', // Standard height for medium and larger screens
  },
  [theme.breakpoints.up('lg')]: {
    minHeight: '500px', // Taller for large screens, providing more breathing room
  },
  display: 'flex', // Ensure flex container behavior
  flexDirection: 'column', // Stack children vertically
  justifyContent: 'center', // Center content vertically
  alignItems: 'center', // Center content horizontally
  padding: theme.spacing(4, 2), // Add responsive padding (top/bottom, left/right)
  gap: theme.spacing(4), // Use theme spacing for consistent gaps, slightly increased
  background: theme.palette.primary.dark, // Use theme's primary dark color for consistency
  // Consider a subtle gradient or pattern for more visual interest
  // background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,

  // For a more dynamic look, you might add a background image or pattern
  // background: `url('/path/to/your/pattern.svg'), ${theme.palette.primary.dark}`,
  // backgroundSize: 'cover',
  // backgroundPosition: 'center',
  // backgroundAttachment: 'fixed', // Optional: for parallax-like effect
}));

export const WrapperStyled = styled('div')(({ theme }) => ({
  width: '100%', // Take full width of parent (StackStyled's padding will constrain it)
  maxWidth: '1200px', // Optimal max-width for readability and content grouping
  padding: theme.spacing(0, 2), // Add horizontal padding to prevent content from touching edges
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4), // Consistent gap with StackStyled or slightly adjusted
  alignItems: 'center', // Center content horizontally within the wrapper
  justifyContent: 'center', // Center content vertically if wrapper has defined height

  // Adjustments for smaller screens
  [theme.breakpoints.down('md')]: {
    maxWidth: '90%', // Make it a bit narrower on medium screens
    gap: theme.spacing(3), // Slightly reduce gap
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '95%', // Even narrower on small screens to fit content
    gap: theme.spacing(2), // Further reduce gap for compact layout
  },
}));