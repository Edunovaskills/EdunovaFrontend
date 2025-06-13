import React from 'react'
import { Stack, Typography } from '@mui/material'
import { BuzInfoSection } from 'entities/component'
import { publicImages } from 'shared/config'
import {
  AutoImgStyled,
  BottomViewWrapperStyled,
  CardStyled,
  ScootyImgStyled,
  TaxyImgStyled,
} from './styles.component'

export const OurService = () => {
  const TopView = () => {
    return (
      <Stack spacing={'5px'} id="cabService">
        <Typography variant="h5.700" textAlign={'center'}>
          Our{' '}
          <Typography variant="h5.700" color="primary.main">
            Services
          </Typography>
        </Typography>

        <Typography variant="body3">
          At BuzzCabs, we provide a variety of vehicles to ensure you find the
          perfect ride for any journey.
        </Typography>
      </Stack>
    )
  }

  const BottomView = () => {
    return (
      <BottomViewWrapperStyled>
        <CardStyled color="sky">
          <Stack spacing={'14px'} maxWidth={'360px'}>
            <Typography variant="h6.700">Cab Booking</Typography>
            <Typography variant="body1.500" maxWidth={'236px'}>
              Enjoy a smooth ride in our well-maintained cars for any trip.
            </Typography>
          </Stack>
          <TaxyImgStyled
            src={publicImages.book}
            style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-15px',
              maxHeight: '250px',
              maxWidth: '250px',
            }}
          />
        </CardStyled>
        <CardStyled color="blue">
          <Stack spacing={'14px'} maxWidth={'360px'}>
            <Typography variant="h6.700">Auto Booking</Typography>
            <Typography variant="body1.500" maxWidth={'236px'}>
              Affordable and quick auto rides for your daily commutes.
            </Typography>
          </Stack>
          <AutoImgStyled src={publicImages.book} 
          style={{
            position: 'absolute',
            bottom: '-20px',
            right: '-15px',
            height: '250px',
            width: '250px',
          }}/>
        </CardStyled>
        <CardStyled color="neutral">
          <Stack spacing={'14px'} maxWidth={'360px'}>
            <Typography variant="h6.700">Bike Booking</Typography>
            <Typography variant="body1.500" maxWidth={'236px'}>
              Beat the traffic with fast and affordable bike rides for short
              trips.
            </Typography>
          </Stack>
          <ScootyImgStyled src={publicImages.book} 
          style={{
            position: 'absolute',
            bottom: '-20px',
            right: '-15px',
            height: '250px',
            width: '250px',
          }}/>
        </CardStyled>
      </BottomViewWrapperStyled>
    )
  }

  return (
    <BuzInfoSection topInfo={<TopView />} showcaseSection={<BottomView />} />
  )
}
