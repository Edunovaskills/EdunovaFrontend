// UserProfile.tsx
import React from 'react'
import { Button, Box, Typography } from '@mui/material' // Removed 'styled' import here
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { useNavigate } from 'react-router-dom'
import { appPaths } from 'entities/config'

// Import styled components from the new file
import {
  ProfileCard,
  ProfileHeading,
  UserDetailsContainer,
  DetailLine,
  DetailLabel,
  LogoutButtonContainer,
} from './UserProfileStyles' // Adjust this import path based on where you save UserProfileStyles.ts

const UserProfile: React.FC = () => {
  return (
    // <ProfileCard>
    //   <ProfileHeading variant="h2">User Profile</ProfileHeading>
    //   <UserDetailsContainer>
    //     <DetailLine>
    //       <DetailLabel>Name:</DetailLabel> {user.name}
    //     </DetailLine>
    //     <DetailLine>
    //       <DetailLabel>Email:</DetailLabel> {user.email}
    //     </DetailLine>
    //     <DetailLine>
    //       <DetailLabel>Phone:</DetailLabel> {user.phone || 'N/A'}
    //     </DetailLine>
    //     {/* <DetailLine>
    //       <DetailLabel>Role:</DetailLabel> {user.role || 'User'}
    //     </DetailLine> */}
    //   </UserDetailsContainer>

    //   <LogoutButtonContainer>
    //     <Button
    //       variant="contained"
    //       sx={{
    //         backgroundColor: '#ef4444', // Red for logout
    //         color: '#fff',
    //         '&:hover': {
    //           backgroundColor: '#dc2626',
    //           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    //         },
    //         borderRadius: '12px',
    //         textTransform: 'none',
    //         fontWeight: 600,
    //         padding: '10px 20px',
    //       }}
    //       onClick={handleLogout}
    //       startIcon={<ExitToAppIcon />}
    //     >
    //       Logout
    //     </Button>
    //   </LogoutButtonContainer>
    // </ProfileCard>
    <div>UserProfile</div>
  )
}

export default UserProfile
