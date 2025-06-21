import React, { useMemo, useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  Stack,
} from '@mui/material';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person'; // Import for profile icon
// Removed: ExitToAppIcon // Not needed here anymore
import { publicImages } from 'shared/config';
import {
  MenuItemsWrapperStyled,
  NavbarWrapperStyled,
  StartViewWrapperStyled,
} from './styles.component';

// --- Mocking External Dependencies for compilation ---
import { appPaths } from 'entities/config'

const useScreenSize = () => {
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 960);

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth < 960);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { smallScreen };
};
// --- End Mocking ---

// Import useAuth hook
import { useAuth } from '../../../app/providers/auth-management/AuthContext';

// Define the type for menu items
type MenuItem = {
  label: string;
  value: AppPathsName | string; // Assuming AppPathsName is defined elsewhere
};

// Define the main menu items for the navigation bar
const menuItems: MenuItem[] = [
  { label: 'Home', value: '/' },
  { label: 'About', value: 'about' },
  { label: 'Courses', value: 'services' },
  { label: 'Events', value: 'helpAndSupport' },
];

const smoothScroll = (element: string) => {
  setTimeout(() => {
    const targetElement = document.getElementById(element);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, 0);
};

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Use the authentication context
  const { isAuthenticated /* Removed: logout */ } = useAuth(); // Logout is no longer called here

  const currentMenuItem = useMemo(() => {
    return menuItems.find((item) => {
      const pathSegment = location.pathname.split('/')[1] || '/';
      return (
        pathSegment === item.value || (pathSegment === '' && item.value === '/')
      );
    });
  }, [location]);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  // Removed: handleLogout function as it's no longer needed in Navbar

  const { smallScreen } = useScreenSize();

  return (
    <NavbarWrapperStyled smallScreen={smallScreen}>
      <StartViewWrapperStyled>
        <Link
          to={appPaths['/']}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        >
          <img
            src={publicImages.EdunovaLog}
            alt="brand-logo"
            style={{
              width: 'auto',
              height: '48px',
              objectFit: 'contain',
              marginRight: '8px',
            }}
            onError={(e) => {
              console.error('Logo failed to load:', publicImages.EdunovaLog);
              e.currentTarget.src = 'https://placehold.co/48x48/eeeeee/000000?text=Error';
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Georgia", "Times New Roman", serif',
                fontWeight: 'bold',
                color: '#000',
                lineHeight: 1.2,
              }}
            >
              Edunova
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: '"Georgia", "Times New Roman", serif',
                fontWeight: 'bold',
                color: '#000',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              UPGRADE YOUR SKILLS, UPGRADE YOUR FUTURE
            </Typography>
          </div>
        </Link>
      </StartViewWrapperStyled>

      {!smallScreen && (
        <MenuItemsWrapperStyled>
          {menuItems.map(({ label, value }) => {
            const isSelected =
              (location.pathname.split('/')[1].length === 0 && value === '/') ||
              currentMenuItem?.value === value;

            return (
              <NavLink
                key={value}
                to={appPaths[value] || value}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  transition: 'background-color 0.3s ease',
                }}
                className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? 'primary.main' : 'neutral.main',
                    '&:hover': {
                      color: isSelected ? 'primary.dark' : 'primary.light',
                    },
                    transition: 'color 0.3s ease',
                  }}
                >
                  {label}
                </Typography>
              </NavLink>
            );
          })}
        </MenuItemsWrapperStyled>
      )}

      {!smallScreen && (
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#2563eb',
                  color: '#2563eb',
                  '&:hover': {
                    borderColor: '#1d4ed8',
                    backgroundColor: 'rgba(37, 99, 235, 0.08)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  padding: '10px 20px',
                }}
                onClick={() => navigate(appPaths.userProfile)} // Assuming appPaths.userProfile exists
                startIcon={<PersonIcon />}
              >
                Profile
              </Button>
              {/* Removed Logout Button */}
            </>
          ) : (
            <>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#2563eb',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#1d4ed8',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  padding: '10px 20px',
                }}
                onClick={() => navigate(appPaths.userLogin)}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#2563eb',
                  color: '#2563eb',
                  '&:hover': {
                    borderColor: '#1d4ed8',
                    backgroundColor: 'rgba(37, 99, 235, 0.08)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  padding: '10px 20px',
                }}
                onClick={() => navigate(appPaths.userSignup)}
              >
                Signup
              </Button>
            </>
          )}
        </div>
      )}

      {smallScreen && (
        <>
          <IconButton onClick={toggleDrawer(true)} sx={{ marginLeft: 'auto' }}>
            <MenuIcon sx={{ color: 'neutral.black' }} fontSize="large" />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: { width: 280, borderRadius: '8px 0 0 8px' },
            }}
          >
            <Stack sx={{ justifyContent: 'space-between', height: '100%', padding: '16px' }}>
              <Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginBottom="16px"
                >
                  <Typography variant="h6" color="primary.main" fontWeight={700}>
                    Edunova
                  </Typography>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ marginY: 1 }} />

                <List>
                  {menuItems.map(({ label, value }) => {
                    const isSelected =
                      (location.pathname.split('/')[1].length === 0 && value === '/') ||
                      currentMenuItem?.value === value;
                    return (
                      <ListItem
                        key={value}
                        component={NavLink}
                        to={appPaths[value] || value}
                        style={{ textDecoration: 'none' }}
                        sx={{
                          borderRadius: '8px',
                          marginBottom: '8px',
                          '&:hover': { backgroundColor: 'action.hover' },
                          backgroundColor: isSelected ? 'action.selected' : 'transparent',
                        }}
                        onClick={() => {
                          setDrawerOpen(false);
                          if (value === '/' && location.hash.includes('comingSoon')) {
                            smoothScroll('comingSoon');
                          }
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: isSelected ? 700 : 500,
                            color: isSelected ? 'primary.main' : 'text.primary',
                          }}
                        >
                          {label}
                        </Typography>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>

              <div
                style={{
                  paddingTop: '16px',
                  display: 'flex',
                  gap: '12px',
                  flexDirection: 'column',
                }}
              >
                {isAuthenticated ? (
                  <>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        borderColor: '#2563eb',
                        color: '#2563eb',
                        '&:hover': {
                          borderColor: '#1d4ed8',
                          backgroundColor: 'rgba(37, 99, 235, 0.04)',
                        },
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 600,
                        padding: '10px 20px',
                      }}
                      onClick={() => {
                        navigate(appPaths.userProfile);
                        setDrawerOpen(false);
                      }}
                      startIcon={<PersonIcon />}
                    >
                      Profile
                    </Button>
                    {/* Removed Logout Button from Drawer */}
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: '#1d4ed8',
                        },
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 600,
                        padding: '10px 20px',
                      }}
                      onClick={() => {
                        navigate(appPaths.userLogin);
                        setDrawerOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        borderColor: '#2563eb',
                        color: '#2563eb',
                        '&:hover': {
                          borderColor: '#1d4ed8',
                          backgroundColor: 'rgba(37, 99, 235, 0.04)',
                        },
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 600,
                        padding: '10px 20px',
                      }}
                      onClick={() => {
                        navigate(appPaths.userSignup);
                        setDrawerOpen(false);
                      }}
                    >
                      Signup
                    </Button>
                  </>
                )}
              </div>
            </Stack>
          </Drawer>
        </>
      )}
    </NavbarWrapperStyled>
  );
};