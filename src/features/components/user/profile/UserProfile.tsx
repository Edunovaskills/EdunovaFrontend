// UserProfile.tsx
import React from 'react';
import { useAuth } from '../../../../app/providers/auth-management/AuthContext';
import { Button, Box, Typography } from '@mui/material'; // Removed 'styled' import here
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { appPaths } from 'entities/config';

// Import styled components from the new file
import {
  ProfileCard,
  ProfileHeading,
  UserDetailsContainer,
  DetailLine,
  DetailLabel,
  LogoutButtonContainer,
} from './UserProfileStyles'; // Adjust this import path based on where you save UserProfileStyles.ts


const UserProfile: React.FC = () => {
  const { user, loading, error, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(appPaths['/']);
  };

  if (loading) {
    return (
      <Box className="text-center py-6">
        <Typography className="text-gray-500">Loading profile...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="text-center py-6">
        <Typography className="text-red-500">
          Failed to load profile: {error instanceof Error ? error.message : String(error)}
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box className="text-center py-6">
        <Typography>No user data found. Please log in again or refresh the page.</Typography>
      </Box>
    );
  }

  return (
    <ProfileCard>
      <ProfileHeading variant="h2">User Profile</ProfileHeading>
      <UserDetailsContainer>
        <DetailLine>
          <DetailLabel>Name:</DetailLabel> {user.name}
        </DetailLine>
        <DetailLine>
          <DetailLabel>Email:</DetailLabel> {user.email}
        </DetailLine>
        <DetailLine>
          <DetailLabel>Phone:</DetailLabel> {user.phone || 'N/A'}
        </DetailLine>
        {/* <DetailLine>
          <DetailLabel>Role:</DetailLabel> {user.role || 'User'}
        </DetailLine> */}
      </UserDetailsContainer>
      
      <LogoutButtonContainer>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ef4444', // Red for logout
            color: '#fff',
            '&:hover': {
              backgroundColor: '#dc2626',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            },
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            padding: '10px 20px',
          }}
          onClick={handleLogout}
          startIcon={<ExitToAppIcon />}
        >
          Logout
        </Button>
      </LogoutButtonContainer>
    </ProfileCard>
  );
};

export default UserProfile;