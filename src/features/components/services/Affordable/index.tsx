import React from 'react'
import { Stack, Typography } from '@mui/material'
import { ReversableSection } from 'entities/component'
import { publicImages } from 'shared/config'

export const Affordable = () => {
  const TextSection = () => {
    return (
      <>
        <Stack spacing={'5px'}>
          <Typography variant="h5.700">
            Affordable & Transparent Pricing
          </Typography>
          <Typography variant="body3.500">Affordable for your Life</Typography>
        </Stack>

        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>
            <Typography variant="body1" sx={{ display: 'inline' }}>
              We offer competitive, pocket-friendly pricing with no hidden fees.
              Know exactly what you’ll pay before you book, and enjoy fair rates
              for all your rides—whether short distances or longer trips.
            </Typography>
          </li>
        </ul>
      </>
    )
  }
  return (
    <ReversableSection
      imgUrl={publicImages.moneyCal}
      textSection={<TextSection />}
      reverse
    />
  )
}
