import React from 'react'
import { Stack, Typography } from '@mui/material'
import { ReversableSection } from 'entities/component'
import { publicImages } from 'shared/config'

export const Safe = () => {
  const TextSection = () => {
    return (
      <>
        <Stack spacing={'5px'}>
          <Typography variant="h5.700">Safe & Secure Rides</Typography>
          <Typography variant="body3.500">
            Your safety is our priority
          </Typography>
        </Stack>

        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>
            <Typography variant="body1" sx={{ display: 'inline' }}>
              Thoroughly vetted drivers to provide you with a safe and
              professional ride.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ display: 'inline' }}>
              Regularly inspected vehicles to ensure every ride is smooth and
              secure.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ display: 'inline' }}>
              Real-time tracking for peace of mind as you travel to your
              destination.
            </Typography>
          </li>
        </ul>
      </>
    )
  }
  return (
    <ReversableSection
      imgUrl={publicImages.safeAndSecure}
      textSection={<TextSection />}
    />
  )
}
