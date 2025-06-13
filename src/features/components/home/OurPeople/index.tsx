import React from 'react'
import { Typography } from '@mui/material'
import { BuzInfoSection } from 'entities/component'
import { TestimonialSection } from '../Testimonial'

const TopView = () => {
  return (
    <>
      <Typography variant="h5.700">
        HEAR FROM{' '}
        <Typography variant="h5.700" color="primary.main">
          OUR PEOPLE{' '}
        </Typography>
      </Typography>

      <Typography variant="body3">Explore What Our Students Say</Typography>
    </>
  )
}

export const OurPeopleSection = () => {
  return <BuzInfoSection topInfo={<TopView />} showcaseSection={<TestimonialSection />} />
}
