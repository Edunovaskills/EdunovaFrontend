import React from 'react'
import { Typography, Button } from '@mui/material'
import { BuzInfoSection } from 'entities/component'
import { TestimonialSection } from '../Testimonial'
import { Link } from 'react-router-dom'

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
  return (
    <>
      <BuzInfoSection
        topInfo={<TopView />}
        showcaseSection={<TestimonialSection />}
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
        <Button
          component={Link}
          to="/testimonial/create"
          variant="contained"
          color="primary"
          size="large"
          sx={{ borderRadius: 8, fontWeight: 600, boxShadow: 3 }}
        >
          Share Your Testimonial
        </Button>
      </div>
    </>
  )
}
