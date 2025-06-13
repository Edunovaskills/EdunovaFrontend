import React from 'react'
import { BuzInfoSection } from '../BuzzInfo-Section/BuzInfoSection'
import { Stack, TextField, Typography } from '@mui/material'
import { RoundedIcon } from 'shared/components'
import { publicImages } from 'shared/config'
import { Link } from 'react-router-dom'
import {
  BottomViewStyled,
  ButtonStyled,
  FieldsWrapperStyled,
  PaperStyled,
  RightViewWrapperStyled,
  StackStyled,
} from './styles.component'
import { useScreenSize } from 'shared/hooks'

export const GetInTouch = () => {
  const TopView = () => {
    return (
      <>
        <Typography variant="h5.700">
          GET IN{' '}
          <Typography variant="h5.700" color="primary.main">
            TOUCH
          </Typography>
        </Typography>

        <Typography variant="body2">
          Stay in Touch with us, We’re Here for You.
        </Typography>
      </>
    )
  }

  const BottomView = () => {
    const { smallScreen:smallscreen } = useScreenSize()

    return (
      <PaperStyled issmall={smallscreen}>
        <StackStyled component={'form'} issmall={smallscreen}>
          <TextField placeholder="Full Name" />
          <FieldsWrapperStyled>
            <TextField
              type="email"
              placeholder="Email Address"
              sx={{ flexBasis: '49%' }}
            />
            <TextField
              placeholder="+91 XXXXX XXXXX"
              type="number"
              sx={{ flexBasis: '49%' }}
            />
          </FieldsWrapperStyled>
          <TextField
            placeholder="Message"
            multiline
            rows={4}
            sx={{ width: '100%' }}
          />

          <ButtonStyled variant="contained" type="submit">
            SEND US AN ENQUIRY
          </ButtonStyled>
        </StackStyled>

        <BottomViewStyled>
          <RightViewWrapperStyled>
            <RoundedIcon
              content={<img src={publicImages.mail} alt="mail" />}
              size={40}
            />
            <Stack spacing={'10px'}>
              <Typography variant="body1.600" color="secondary.main">
                Email Us:{' '}
                <Link to="mailto:contact@buzzcabs.com" color="secondary.main">
                  <Typography variant="body1.600" color="secondary.main">
                    contact@buzzcabs.com
                  </Typography>
                </Link>
              </Typography>
              <Typography variant="body2">
                Send your enquiry, specifications, and/or RFP to
                contact@effortlessautomation.com
              </Typography>
            </Stack>
          </RightViewWrapperStyled>

          <RightViewWrapperStyled>
            <RoundedIcon
              content={<img src={publicImages.phone} alt="phone" />}
              size={40}
            />
            <Stack spacing={'10px'}>
              <Typography variant="body1.600" color="secondary.main">
                Call Us:{' '}
                <Link to="tel:+919876543210" color="secondary.main">
                  <Typography variant="body1.600" color="secondary.main">
                    +91 98765 43210
                  </Typography>
                </Link>
              </Typography>
              <Typography variant="body2">
                Reach out to one of our global office locations and let us know
                how we can assist you.
              </Typography>
            </Stack>
          </RightViewWrapperStyled>
        </BottomViewStyled>
      </PaperStyled>
    )
  }
  return (
    <BuzInfoSection topInfo={<TopView />} showcaseSection={<BottomView />} />
  )
}
