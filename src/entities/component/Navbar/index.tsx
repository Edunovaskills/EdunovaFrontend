import React, { useMemo, useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Typography,
  Drawer,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  Stack,
} from '@mui/material'
import { AppPathsName, appPaths } from 'entities/config'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { publicImages } from 'shared/config'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  MenuItemsWrapperStyled,
  NavbarWrapperStyled,
  StartViewWrapperStyled,
} from './styles.component'
import { useScreenSize } from 'shared/hooks'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

type MenuItem = {
  label: string
  value: AppPathsName | string
  subMenu?: MenuItem[]
  logo?: boolean
}

const menuItem: MenuItem[] = [
  { label: 'Home', value: '/' },
  { label: 'About', value: 'about' },
  {
    label: 'Courses',
    value: 'services',
    logo: true,
    // subMenu: [ // Commented out subMenu to disable dropdown
    //   { label: 'UG Courses', value: 'ugCourses' },
    //   { label: 'PG Courses', value: 'pgCourses' },
    //   { label: 'Certification Courses', value: 'certificationCourses' },
    // ],
  },
  { label: 'Events', value: 'helpAndSupport' },
]

const smoothScroll = (element: string) => {
  setTimeout(() => {
    const comingSoonElement = document.getElementById(element)
    if (comingSoonElement) {
      comingSoonElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, 0)
}

export const Navbar = () => {
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const currentMenuItem = useMemo(() => {
    return menuItem.find((item) => {
      // Handle string comparison properly
      const pathSegment = location.pathname.split('/')[1] || '/'
      return (
        pathSegment === item.value || (pathSegment === '' && item.value === '/')
      )
    })
  }, [location])

  const handleMenuClose = () => {
    setMenuOpen(false)
    setAnchorEl(null)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setMenuOpen(true)
  }

  const handleNavigateToComingSoon = () => {
    handleMenuClose()
    navigate(appPaths['/'])
    smoothScroll('comingSoon')
  }

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  const { smallScreen: smallscreen } = useScreenSize()

  // Check if current page is login or signup
  const isAuthPage =
    location.pathname === appPaths.userLogin ||
    location.pathname === appPaths.userSignup

  const renderSubMenu = (subMenu?: MenuItem[]) =>
    subMenu?.map((subItem) => {
      const isSubMenuSelected = location.hash.includes(
        subItem.value.toString().slice(1, -1)
      )
      return (
        <MenuItem
          key={subItem.value}
          onClick={() => {
            handleNavigateToComingSoon()
            setDrawerOpen(false)
          }}
          sx={{
            backgroundColor: isSubMenuSelected ? 'sky.200' : '#FFFAF0',
            '&:hover': {
              backgroundColor: isSubMenuSelected ? 'sky.200' : 'default',
            },
          }}
        >
          {subItem.label}
        </MenuItem>
      )
    })

  return (
    <NavbarWrapperStyled smallScreen={smallscreen}>
      <StartViewWrapperStyled>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            transform: 'scale(1.5)',
            marginLeft: '0rem',
          }}
        >
          {/* Logo Image */}
          <Link
            to={appPaths['/']}
            style={{ textDecoration: 'none', display: 'flex' }}
          >
            <img
              src={publicImages.EdunovaLog}
              alt="brand-logo"
              style={{
                width: 'auto',
                height: '40px',
                objectFit: 'contain',
                display: 'block',
                opacity: 1,
                visibility: 'visible',
              }}
              onError={(e) => {
                console.error('Logo failed to load:', publicImages.EdunovaLog)
                // Fallback handling if needed
              }}
            />

            {/* Text next to Logo */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: '"Georgia", "Times New Roman", serif',
                  fontWeight: 'bold',
                  fontSize: '23px',
                  color: '#000',
                  marginTop: '10px',
                  display: 'block',
                  width: '100%',
                }}
              >
                Edunova
              </span>
              <span
                style={{
                  fontFamily: '"Georgia", "Times New Roman", serif',
                  fontWeight: 'bold',
                  fontSize: '3.5px',
                  color: '#000',
                  marginTop: '-8px',
                  marginLeft: '2.1px',
                  display: 'block',
                  width: '100%',
                }}
              >
                UPGRADE YOUR SKILLS, UPGRADE YOUR FUTURE
              </span>
            </div>
          </Link>
        </div>
      </StartViewWrapperStyled>

      {!smallscreen && (
        <MenuItemsWrapperStyled>
          {menuItem.map(({ label, value, subMenu, logo }) => {
            const isSelected =
              (location.pathname.split('/')[1].length === 0 && value === '/') ||
              currentMenuItem?.value === value
            // const hasSubMenu = Boolean(subMenu) // hasSubMenu will now always be false for "Courses"

            return (
              <React.Fragment key={value}>
                <NavLink
                  to={appPaths[value] || value}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="body1.700"
                    color={isSelected ? 'primary.main' : 'neutral.black'}
                  >
                    {label}
                  </Typography>
                </NavLink>
                {/* Commented out the dropdown specific UI */}
                {/* {logo && hasSubMenu && (
                  <>
                    <IconButton
                      onClick={handleMenuOpen}
                      onMouseEnter={handleMenuOpen}
                    >
                      <ExpandMoreIcon sx={{ color: 'neutral.black' }} />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={menuOpen}
                      onClose={handleMenuClose}
                      MenuListProps={{
                        onMouseLeave: handleMenuClose,
                        onMouseEnter: () => setMenuOpen(true),
                      }}
                    >
                      {renderSubMenu(subMenu)}
                    </Menu>
                  </>
                )} */}
              </React.Fragment>
            )
          })}
        </MenuItemsWrapperStyled>
      )}

      <div style={{ display: 'flex', gap: '12px' }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#2563eb',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#1d4ed8',
            },
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
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
              backgroundColor: 'rgba(37, 99, 235, 0.04)',
            },
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
          }}
          onClick={() => navigate(appPaths.userSignup)}
        >
          Signup
        </Button>
      </div>

      {smallscreen && (
        <>
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon sx={{ color: 'neutral.black' }} fontSize="large" />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            <Stack sx={{ justifyContent: 'space-between', height: '100%' }}>
              <Box sx={{ width: 250, padding: 2 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" color="primary">
                    Edunova
                  </Typography>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ marginY: 1 }} />

                <List>
                  {menuItem.map(({ label, value, subMenu }) => {
                    const isSelected =
                      (location.pathname.split('/')[1].length === 0 &&
                        value === '/') ||
                      currentMenuItem?.value === value
                    return (
                      <React.Fragment key={value}>
                        {!subMenu ? ( // This condition will now always be true for "Courses"
                          <ListItem
                            component={NavLink}
                            to={appPaths[value] || value}
                            style={{ textDecoration: 'none' }}
                            sx={{
                              '&:hover': { backgroundColor: 'state.hover' },
                            }}
                            onClick={() => setDrawerOpen(false)}
                          >
                            <Typography
                              variant="body1"
                              color={
                                isSelected ? 'primary.main' : 'neutral.black'
                              }
                            >
                              {label}
                            </Typography>
                          </ListItem>
                        ) : (
                          // This Accordion section will now not be rendered for "Courses"
                          <Accordion
                            sx={{
                              border: 'none',
                              '& .MuiAccordionSummary-root': {
                                minHeight: '32px !important',
                                maxHeight: '32px !important',
                                '&:hover': { backgroundColor: 'state.hover' },
                              },
                            }}
                          >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography
                                component={NavLink}
                                to={appPaths[value] || value}
                                color={
                                  isSelected ? 'primary.main' : 'neutral.black'
                                }
                                style={{ textDecoration: 'none' }}
                              >
                                {label}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {renderSubMenu(subMenu)}
                            </AccordionDetails>
                          </Accordion>
                        )}
                      </React.Fragment>
                    )
                  })}
                </List>
              </Box>

              <div
                style={{
                  padding: '16px',
                  display: 'flex',
                  gap: '8px',
                  flexDirection: 'column',
                }}
              >
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
                  }}
                  onClick={() => {
                    navigate(appPaths.userSignup)
                    setDrawerOpen(false)
                  }}
                >
                  Signup
                </Button>
              </div>
            </Stack>
          </Drawer>
        </>
      )}
    </NavbarWrapperStyled>
  )
}
