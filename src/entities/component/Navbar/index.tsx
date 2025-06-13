import React, { useMemo, useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  Menu,
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
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
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
  value: AppPathsName
  subMenu?: MenuItem[]
  logo?: boolean
}

const menuItem: MenuItem[] = [
  { label: 'Home', value: '/' },
  { label: 'About', value: 'about' },
  {
    label: 'Services',
    value: 'services',
    logo: true,

    subMenu: [
      { label: 'Cab Service', value: 'cabServices' },
      { label: 'Ticket Service', value: 'bikeServices' },
      { label: 'Grocery Service', value: 'bikeServices' },
    ],
  },
  { label: 'Help & Support', value: 'helpAndSupport' },
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
    return menuItem.find((item) =>
      location.pathname.split('/')[1].includes(item.value)
    )
  }, [location, menuItem])

  const handleMenuClose = () => {
    setMenuOpen(false)
    setAnchorEl(null)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setMenuOpen(true)
  }
  const handleNavigateToComingSoon = (cab?: boolean) => {
    handleMenuClose()
    if (cab) {
      navigate(appPaths['services'] + '#cabService')
      smoothScroll('cabService')
    } else {
      navigate(appPaths['/'])
      smoothScroll('comingSoon')
    }
  }
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  const { smallScreen: smallscreen } = useScreenSize()
  
  const renderSubMenu = (subMenu?: MenuItem[]) =>
    subMenu?.map((subItem) => {
      const isSubMenuSelected = location.hash.includes(
        subItem.value.slice(1, -1)
      )
      return (
        <MenuItem
          key={subItem.value}
          onClick={() => {
            handleNavigateToComingSoon(subItem.value === 'cabServices')
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
       <div style={{display:'flex',gap:'0.75rem',width:'75px',height:'20px',transform:'scale(1.5)'}}>
       <img src={publicImages.academixLog} alt="brand-logo" style={{width:'100%', height:'100%', transform:'scale(1.9)'}} />
       <img src={publicImages.acdemixLogoText} alt="brand-logo" style={{width:'100%', height:'100%', transform:'scale(1)'}} />
       </div>
        {/* <Typography variant="h6.700" color="neutral.black">
          BuzzCabs
        </Typography> */}
      </StartViewWrapperStyled>

      {!smallscreen && (
        <MenuItemsWrapperStyled>
          {menuItem.map(({ label, value, subMenu, logo }) => {
            const isSelected =
              (location.pathname.split('/')[1].length === 0 && value === '/') ||
              currentMenuItem?.value === value
            const hasSubMenu = Boolean(subMenu)
            return (
              <>
                <NavLink
                  key={value}
                  to={appPaths[value]}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    variant="body1.700"
                    color={isSelected ? 'primary.main' : 'neutral.black'}
                  >
                    {label}
                  </Typography>
                  {logo && (
                    <IconButton
                      onClick={handleMenuOpen}
                      onMouseEnter={handleMenuOpen}
                    >
                      <ExpandMoreIcon
                        sx={{
                          color: 'neutral.black',
                          ['&:hover']: { color: 'neutral.black !important' },
                        }}
                      />
                    </IconButton>
                  )}
                </NavLink>
                {hasSubMenu && (
                  <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleMenuClose}
                    MenuListProps={{
                      onMouseLeave: handleMenuClose,
                      onMouseEnter: () => setMenuOpen(true),
                    }}
                  >
                    {subMenu?.map((subItem) => {
                      const isSubMenuSelected = location.hash.includes(
                        subItem.value.slice(1, -1)
                      )
                      return (
                        <MenuItem
                          key={subItem.value}
                          onClick={() =>
                            handleNavigateToComingSoon(
                              subItem.value === 'cabServices'
                            )
                          }
                          sx={{
                            backgroundColor: isSubMenuSelected
                              ? 'sky.200'
                              : 'neutral.white',
                            '&:hover': {
                              backgroundColor: isSubMenuSelected
                                ? 'sky.200'
                                : 'default',
                            },
                          }}
                        >
                          <Box key={value}>
                            <Typography
                              variant="body1.700"
                              color={
                                isSelected ? 'primary.main' : 'neutral.black'
                              }
                              component={'p'}
                            >
                              {subItem.label}
                            </Typography>
                          </Box>
                        </MenuItem>
                      )
                    })}
                  </Menu>
                )}
              </>
            )
          })}
        </MenuItemsWrapperStyled>
      )}

      {!smallscreen && (
        <div>
          <Button variant="contained">GET STARTED</Button>
        </div>
      )}

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
                {/* Drawer Header */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" color="primary">
                    BuzzCabs
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
                        {!subMenu ? (
                          <ListItem
                            component={NavLink}
                            to={appPaths[value]}
                            style={{ textDecoration: 'none' }}
                            sx={{
                              ['&:hover']: {
                                backgroundColor: 'state.hover',
                              },
                            }}
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
                          <Accordion
                            sx={{
                              border: 'none',
                              ['& .MuiAccordionSummary-root']: {
                                minHeight: '32px !important',
                                maxHeight: '32px !important',

                                ['&:hover']: {
                                  backgroundColor: 'state.hover',
                                },
                              },
                              ['& .MuiMenuItem-root']: {
                                padding: '10px',
                              },
                            }}
                          >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography
                                component={NavLink}
                                to={appPaths[value]}
                                color={
                                  isSelected ? 'primary.main' : 'neutral.white'
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
              <div style={{ padding: '16px' }}>
                <Button variant="text">GET STARTED</Button>
              </div>
            </Stack>
          </Drawer>
        </>
      )}
    </NavbarWrapperStyled>
  )
}
