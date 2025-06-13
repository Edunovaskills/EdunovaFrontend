import React from 'react'
import { Stack, Typography } from '@mui/material'
import { ReversableSection } from 'entities/component'
import { publicImages } from 'shared/config'

export const DoorToDoor = () => {
  const TextSection = () => {
    return (
      <>
        <Stack spacing={'5px'}>
          <Typography variant="h5.700">Door-to-Door Pickup & Drop</Typography>
          <Typography variant="body3.500">
            Ease & Efficient Ride for Your Comfort
          </Typography>
        </Stack>

        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>
            <Typography variant="body1" sx={{ display: 'inline' }}>
              Enjoy hassle-free travel with our door-to-door service. Whether
              it’s a quick run to the store or a pickup from your home, our
              drivers will meet you at your exact location and drop you off
              where you need to be.
            </Typography>
          </li>
        </ul>
      </>
    )
  }
  return (
    <ReversableSection
      imgUrl={publicImages.taxyPickUp}
      textSection={<TextSection />}
    />
  )
}
