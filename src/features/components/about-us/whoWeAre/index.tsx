import React from 'react'
import { Stack, Typography } from '@mui/material'
import { BuzInfoSection } from 'entities/component'

const TopView = () => {
  return (
    <>
      <Typography variant="h5.700">
        Who{' '}
        <Typography variant="h5.700" color="primary.main">
          We Are?
        </Typography>
      </Typography>

      <Typography variant="body2">
        Your Trusted Partner in Lifelong Learning
      </Typography>
    </>
  )
}

const BottomView = () => {
  // const images = [
  //   publicImages.aboutImg1,
  //   publicImages.aboutImg2,
  //   publicImages.aboutImg3,
  //   publicImages.aboutImg4,
  //   publicImages.aboutImg5,
  // ]

  return (
    <Stack gap={'50px'}>
      <Typography variant="body3" textAlign={'center'}>
        At Edunova Academic, we are passionate about transforming education
        through innovation. Our platform offers a student-centric, seamless way
        to access courses and resources for any learning journey—whether it's
        academic growth or professional development. We strive to provide an
        educational experience that is engaging, reliable, and accessible to
        all.
      </Typography>
      {/* <ImagesWrapperStyled issmall={smallScreen}>
        {images.map((url) => (
          <img
            src={url}
            key={url}
            alt="img"
            width={smallScreen ? '100%' : 'unset'}
          />
        ))}
      </ImagesWrapperStyled> */}
    </Stack>
  )
}
export const WhoWeAre = () => {
  return (
    <BuzInfoSection topInfo={<TopView />} showcaseSection={<BottomView />} />
  )
}
