import React from 'react'
import { Stack, Typography } from '@mui/material'
import { StackStyled, WrapperStyled } from './styles.component'

export const CareerHero = () => {
  return (
    <StackStyled>
      <WrapperStyled>
        <Stack>
          <Typography
            variant="body2.700"
            color="neutral.white"
            textAlign={'center'}
          >
            Help us transform transportation!
          </Typography>

          <Typography
            variant="h3.700"
            color="neutral.white"
            textAlign={'center'}
          >
            Join Our Team!
          </Typography>
        </Stack>

        <Typography
          variant="body1"
          color="neutral.white"
          textAlign={'center'}
          maxWidth={'1150px'}
        >
          Apply to Our Open Roles: Be a part of the change in Transportation
          Solutions
        </Typography>
      </WrapperStyled>
    </StackStyled>
  )
}
