import React, { useMemo, useState, useEffect } from 'react'
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
} from '@mui/material'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import {
  MenuItemsWrapperStyled,
  NavbarWrapperStyled,
  StartViewWrapperStyled,
} from './styles.component'

import { appPaths, type AppPathsName } from 'entities/config'
import { getUserId } from 'shared/data-providers'
import { UserProfile } from './UserProfile'
import { useMenuItems } from 'entities/hooks'
import { Logo } from 'shared/components'

const useScreenSize = () => {
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 960)

  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth < 960)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { smallScreen }
}

const smoothScroll = (element: string) => {
  setTimeout(() => {
    const targetElement = document.getElementById(element)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, 0)
}

export const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const menuItems = useMenuItems()

  // Use the authentication context

  const currentMenuItem = useMemo(() => {
    return menuItems.find((item) => {
      const itemPath = appPaths[item.value as AppPathsName] || item.value
      return (
        location.pathname === itemPath ||
        location.pathname.startsWith(itemPath + '/')
      )
    })
  }, [location, menuItems])

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  // Removed: handleLogout function as it's no longer needed in Navbar

  const { smallScreen } = useScreenSize()

  const user = !!getUserId() && getUserId() !== 'undefined'

  return (
    <NavbarWrapperStyled smallScreen={smallScreen}>
      <StartViewWrapperStyled>
        <Logo />
      </StartViewWrapperStyled>

      {!smallScreen && (
        <MenuItemsWrapperStyled>
          {menuItems.map(({ label, value }) => {
            const isSelected =
              (location.pathname.split('/')[1].length === 0 && value === '/') ||
              currentMenuItem?.value === value

            return (
              <NavLink
                key={value}
                to={appPaths[value as AppPathsName] || value}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  transition: 'background-color 0.3s ease',
                }}
                className={({ isActive }) =>
                  isActive ? 'active-nav-link' : ''
                }
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: isSelected ? 700 : 500,
                    color:
                      isSelected && value !== 'about'
                        ? 'primary.main'
                        : 'neutral.main',
                    '&:hover': {
                      color:
                        isSelected && value !== 'about'
                          ? 'primary.dark'
                          : 'primary.light',
                    },
                    transition: 'color 0.3s ease',
                  }}
                >
                  {label}
                </Typography>
              </NavLink>
            )
          })}
        </MenuItemsWrapperStyled>
      )}

      {!smallScreen && (
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {user ? (
            <UserProfile />
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
            <Stack
              sx={{
                justifyContent: 'space-between',
                height: '100%',
                padding: '16px',
              }}
            >
              <Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginBottom="16px"
                >
                  <Typography
                    variant="h6"
                    color="primary.main"
                    fontWeight={700}
                  >
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
                      (location.pathname.split('/')[1].length === 0 &&
                        value === '/') ||
                      currentMenuItem?.value === value
                    return (
                      <ListItem
                        key={value}
                        component={NavLink}
                        to={appPaths[value as AppPathsName] || value}
                        style={{ textDecoration: 'none' }}
                        sx={{
                          borderRadius: '8px',
                          marginBottom: '8px',
                          '&:hover': { backgroundColor: 'action.hover' },
                          backgroundColor: isSelected && value !== 'about'
                            ? 'action.selected'
                            : 'transparent',
                        }}
                        onClick={() => {
                          setDrawerOpen(false)
                          if (
                            value === '/' &&
                            location.hash.includes('comingSoon')
                          ) {
                            smoothScroll('comingSoon')
                          }
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight:
                              isSelected && value !== 'about' ? 700 : 500,
                            color:
                              isSelected && value !== 'about'
                                ? 'primary.main'
                                : 'text.primary',
                          }}
                        >
                          {label}
                        </Typography>
                      </ListItem>
                    )
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
                {user ? (
                  <UserProfile />
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
                        navigate(appPaths.userLogin)
                        setDrawerOpen(false)
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
                        navigate(appPaths.userSignup)
                        setDrawerOpen(false)
                      }}
                    >
                      Signup
                    </Button>
                  </>
                )}
              </div>
            </Stack>
          </Drawer>
        </div>
      )}
    </NavbarWrapperStyled>
  )
}
