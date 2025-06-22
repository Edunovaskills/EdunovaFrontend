// UserProfileStyles.ts
import { Box, Typography, styled } from '@mui/material';

// Main container for the profile card
export const ProfileCard = styled(Box)(({ theme }) => ({
  maxWidth: '448px', // Equivalent to max-width for md breakpoint, you can also use theme.breakpoints.up('md') for responsive
  margin: theme.spacing(10, 'auto', 0, 'auto'), // mt-10, mx-auto
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.background.paper, // bg-white dark:bg-gray-800
  boxShadow: theme.shadows[2], // shadow-md
  borderRadius: theme.shape.borderRadius, // rounded-lg
  padding: theme.spacing(3), // p-6
}));

// Heading for the profile
export const ProfileHeading = styled(Typography)(({ theme }) => ({
  fontSize: '2rem', // text-2xl
  fontWeight: theme.typography.fontWeightBold, // font-bold
  marginBottom: theme.spacing(2), // mb-4
  textAlign: 'center', // text-center
}));

// Container for user detail lines
export const UserDetailsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5), // space-y-3 (assuming 1.5 * 8px = 12px for space-y-3)
}));

// Individual detail line (e.g., Name, Email)
export const DetailLine = styled(Typography)(({ theme }) => ({
  fontSize: '1rem', // default body1 font size
}));

// Span for labels (e.g., "Name:")
export const DetailLabel = styled('span')(({ theme }) => ({
  fontWeight: theme.typography.fontWeightSemiBold, // font-semibold
  marginRight: theme.spacing(1), // Optional: Add some space after label
}));

// Container for the logout button
export const LogoutButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4), // mt-4
  textAlign: 'center', // text-center
}));