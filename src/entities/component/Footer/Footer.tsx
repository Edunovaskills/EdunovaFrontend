import React, { useMemo } from 'react'
import {
  Stack,
  Typography,
  Box,
  IconButton,
  Link as MuiLink,
  useTheme,
  Fab,
} from '@mui/material'
import { AppPathsName, appPaths } from 'entities/config'
import { NavLink, useLocation } from 'react-router-dom'
import {
  DividerStyled,
  NavigationWrapperStyled,
  StackStyled,
  StackWrapperStyled,
} from './styles.component'
import { useScreenSize } from 'shared/hooks'
import { useMenuItems } from 'entities/hooks'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Logo } from 'shared/components'
import { publicImages } from 'shared/config'
import { whatsAppLink } from 'shared/environment/model/environment.model'

export const Footer = () => {
  const location = useLocation()
  const menuItem = useMenuItems()
  const theme = useTheme()

  const currentMenuItem = useMemo(() => {
    return menuItem.find((item) => {
      const itemPath = appPaths[item.value as AppPathsName] || item.value
      return (
        location.pathname === itemPath ||
        location.pathname.startsWith(itemPath + '/')
      )
    })
  }, [location, menuItem])

  const mainMenuItems = menuItem.slice(0, 4)
  const secondaryMenuITems = menuItem.slice(4)
  const { smallScreen: smallscreen } = useScreenSize()

  // Scroll to top handler
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: 'neutral.black',
        color: 'neutral.white',
        padding: smallscreen ? '2rem' : '32px 70px 70px 70px',
        marginTop: '100px ',
      }}
    >
      <StackStyled issmall={smallscreen} sx={{ p: 0 }}>
        <Stack gap={'40px'}>
          {/* Sectioned Footer */}
          <NavigationWrapperStyled>
            <StackWrapperStyled
              issmall={smallscreen}
              style={{ gap: smallscreen ? 20 : 40 }}
            >
              {/* About Section */}
              <Box sx={{ minWidth: 220, maxWidth: 320 }}>
                <Typography variant="h6" gutterBottom>
                  ABOUT EDUNOVA
                </Typography>
                <Typography variant="body2" color="neutral.white">
                  Edunova is your trusted platform for learning, certification,
                  and innovation. Kickstart your journey by exploring trending
                  technologies and preparing for the future. Stand out from the
                  crowd with Edunova's vision and resources.
                </Typography>
              </Box>
              {/* Quick Links */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  QUICK LINKS
                </Typography>
                <div style={{ display: 'flex', gap: 64 }}>
                  <Stack>
                    {mainMenuItems.map(({ label, value }, ind) => {
                      const isSelected = currentMenuItem?.value === value
                      return (
                        <NavLink
                          key={value}
                          to={appPaths[value as keyof typeof appPaths]}
                          style={{ textDecoration: 'none' }}
                        >
                          <Typography
                            key={ind}
                            variant="body2"
                            color={
                              isSelected ? 'primary.main' : 'neutral.white'
                            }
                          >
                            {label}
                          </Typography>
                        </NavLink>
                      )
                    })}
                  </Stack>
                  <Box>
                    <Stack>
                      {secondaryMenuITems.map(({ label, value }, ind) => {
                        const isSelected = currentMenuItem?.value === value
                        return (
                          <NavLink
                            key={value}
                            to={appPaths[value as keyof typeof appPaths]}
                            style={{ textDecoration: 'none' }}
                          >
                            <Typography
                              key={ind}
                              variant="body2"
                              color={
                                isSelected ? 'primary.main' : 'neutral.white'
                              }
                            >
                              {label}
                            </Typography>
                          </NavLink>
                        )
                      })}
                    </Stack>
                  </Box>
                </div>
              </Box>
              {/* We're Section */}

              {/* Keep in Touch */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  KEEP IN TOUCH
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <IconButton
                    color="inherit"
                    href="https://facebook.com"
                    target="_blank"
                  >
                    <FacebookIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    href="https://instagram.com"
                    target="_blank"
                  >
                    <InstagramIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    href="https://linkedin.com"
                    target="_blank"
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    href="https://youtube.com"
                    target="_blank"
                  >
                    <YouTubeIcon />
                  </IconButton>
                </Stack>
              </Box>
            </StackWrapperStyled>
          </NavigationWrapperStyled>
          {/* divider */}
          <DividerStyled />
          {/* Bottom bar */}
          <Stack
            direction={smallscreen ? 'column-reverse' : 'row'}
            alignItems={smallscreen ? 'center' : 'center'}
            justifyContent="space-between"
            spacing={smallscreen ? 3 : 2}
            sx={smallscreen ? { textAlign: 'center', width: '100%' } : {}}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={
                smallscreen ? { justifyContent: 'center', width: '100%' } : {}
              }
            >
              <Logo noText />
              <Typography
                variant="caption1"
                color="neutral.white"
                alignSelf="end"
              >
                &copy; 2024 Edunova. All Rights Reserved.
              </Typography>
            </Stack>
            {/* Policy Links: stack vertically on mobile, row on desktop */}
            <Stack
              direction={smallscreen ? 'column' : 'row'}
              spacing={smallscreen ? 1 : 2}
              flexWrap={smallscreen ? undefined : 'wrap'}
              justifyContent={smallscreen ? 'center' : 'flex-start'}
              alignItems={'flex-start'}
              sx={{
                width: smallscreen ? '100%' : 'auto',
                mt: smallscreen ? 2 : 0,
              }}
            >
              <MuiLink
                component={NavLink}
                to={appPaths.privacyPolicy}
                color="neutral.white"
                underline="hover"
                sx={{ cursor: 'pointer', fontSize: 16, py: 0.5 }}
              >
                Privacy Policy
              </MuiLink>
              {!smallscreen && <Typography color="neutral.white">|</Typography>}
              <MuiLink
                component={NavLink}
                to={appPaths.termsAndConditions}
                color="neutral.white"
                underline="hover"
                sx={{ cursor: 'pointer', fontSize: 16, py: 0.5 }}
              >
                Terms & Conditions
              </MuiLink>
              {!smallscreen && <Typography color="neutral.white">|</Typography>}
              <MuiLink
                component={NavLink}
                to={appPaths.RefundCancellationPolicy}
                color="neutral.white"
                underline="hover"
                sx={{ cursor: 'pointer', fontSize: 16, py: 0.5 }}
              >
                Refund & Cancellation Policy
              </MuiLink>
              {!smallscreen && <Typography color="neutral.white">|</Typography>}
              <MuiLink
                component={NavLink}
                to={appPaths.ShippingDeliveryPolicy}
                color="neutral.white"
                underline="hover"
                sx={{ cursor: 'pointer', fontSize: 16, py: 0.5 }}
              >
                Shipping & Delivery Policy
              </MuiLink>
            </Stack>
          </Stack>
        </Stack>
      </StackStyled>
      {/* Back to Top Floating Button */}
      {/* WhatsApp Floating Button */}
      <a
        href={whatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: smallscreen ? 80 : 100,
          right: smallscreen ? 16 : 32,
          zIndex: 1200,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: theme.shadows[4],
        }}
        aria-label="WhatsApp Chat"
      >
        <img
          src={publicImages.whatsapp}
          alt="WhatsApp"
          style={{ width: 32, height: 32 }}
        />
      </a>
      <Fab
        color="primary"
        size="medium"
        aria-label="back to top"
        onClick={handleScrollTop}
        sx={{
          position: 'fixed',
          bottom: smallscreen ? 16 : 32,
          right: smallscreen ? 16 : 32,
          zIndex: 1200,
          boxShadow: theme.shadows[4],
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Box>
  )
}
