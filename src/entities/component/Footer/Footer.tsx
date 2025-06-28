import React, { useMemo } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { publicImages } from 'shared/config'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { AppPathsName, appPaths } from 'entities/config'
import { NavLink, useLocation } from 'react-router-dom'
import {
  DividerStyled,
  NavigationWrapperStyled,
  StackStyled,
  StackWrapperStyled,
  SubscribeStyled,
  TextFieldStyled,
  TopViewWrapperStyled,
} from './styles.component'
import { useScreenSize } from 'shared/hooks'
import { useMenuItems } from 'entities/hooks'

type MenuItem = {
  label: string
  value: AppPathsName
}
// const mainMenuItems: MenuItem[] = [
//   { label: 'Home', value: '/' },
//   { label: 'About Us', value: 'about' },
//   { label: 'Contact Us', value: 'contact-us' },
//   { label: 'Career', value: 'career' },
// ]
// const secondaryMenuITems: MenuItem[] = [
//   { label: 'Download App', value: 'download' },
//   { label: 'Help & Support', value: 'events' },
//   { label: 'Privacy Policy', value: 'privacy-policy' },
//   { label: 'Terms of Services', value: 'terms-of-services' },
// ]

export const Footer = () => {
  const location = useLocation()
  const menuItem = useMenuItems()

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

  return (
    <StackStyled issmall={smallscreen}>
      {/* <TopViewWrapperStyled>
        <div style={{display:'flex',gap:'0.75rem',width:'75px',height:'20px',transform:'scale(1.5)'}}>
               <img src={publicImages.EdunovaLog} alt="brand-logo" style={{width:'100%', height:'100%', transform:'scale(1.9)'}} />
               <img src={publicImages.acdemixLogoText} alt="brand-logo" style={{width:'100%', height:'100%', transform:'scale(1)'}} />
               </div>
      </TopViewWrapperStyled> */}

      <Stack gap={'20px'}>
        <Stack>
          <Typography variant="body3.500" color="neutral.white">
            Subscribe for Latest Updates
          </Typography>
          <Typography variant="body2" color="neutral.500">
            Join our community to recieve updates.
          </Typography>
        </Stack>
        <SubscribeStyled issmall={smallscreen}>
          <TextFieldStyled
            name="email"
            placeholder="Enter your email address"
            fullWidth={false}
          />
          <Button
            variant="contained"
            color="secondary"
            endIcon={<ArrowForwardIcon fontSize="extraSmall" />}
            sx={{ borderRadius: '130px' }}
          >
            <Typography variant="body2.700">SUBSCRIBE</Typography>
          </Button>
        </SubscribeStyled>
      </Stack>

      <Stack gap={'30px'}>
        {/* navigation links */}
        <NavigationWrapperStyled>
          <StackWrapperStyled issmall={smallscreen}>
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
                      color={isSelected ? 'primary.main' : 'neutral.white'}
                    >
                      {label}
                    </Typography>
                  </NavLink>
                )
              })}
            </Stack>
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
                      color={isSelected ? 'primary.main' : 'neutral.white'}
                    >
                      {label}
                    </Typography>
                  </NavLink>
                )
              })}
            </Stack>
          </StackWrapperStyled>
        </NavigationWrapperStyled>

        {/* divider */}
        <DividerStyled />
        <Typography variant="caption1" color="neutral.white">
          &copy; 2024 Edunova. All Rights Reserved.
        </Typography>
      </Stack>
    </StackStyled>
  )
}
