import React from 'react'
import { Stack, Typography } from '@mui/material'
import { StackStyled, WrapperStyled } from './styles.component'

export const HeroSection = () => {
  return (
    <StackStyled>
      <WrapperStyled>
        <Stack>
          <Typography
            variant="body2.700"
            color="neutral.white"
            textAlign={'center'}
          >
            Welcome to BuzzCabs Support Hub
          </Typography>

          <Typography
            variant="h3.700"
            color="neutral.white"
            textAlign={'center'}
          >
            Hey, how can we help you Today?
          </Typography>
        </Stack>

        <Typography
          variant="body1"
          color="neutral.white"
          textAlign={'center'}
          maxWidth={'1150px'}
        >
          We know how important it is for your ride experience to be smooth.
          Whether you have a quick question or need assistance, we're here to
          help!
        </Typography>
      </WrapperStyled>
    </StackStyled>
  )
}
