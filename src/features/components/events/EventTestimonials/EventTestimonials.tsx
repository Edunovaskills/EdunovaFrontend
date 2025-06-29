import React from 'react'
import {
  SectionWrapper,
  TitleStyled,
  TestimonialsStack,
  TestimonialCard,
  AvatarNameStack,
  AvatarStyled,
} from './styles.component'
import { Typography } from '@mui/material'

const testimonials = [
  {
    name: 'Amit Sharma',
    feedback: 'Amazing event! Learned a lot and met great people.',
    avatar: '',
  },
  {
    name: 'Priya Singh',
    feedback: 'Very well organized and insightful sessions.',
    avatar: '',
  },
  {
    name: 'Amit Sharma',
    feedback: 'Amazing event! Learned a lot and met great people.',
    avatar: '',
  },
  {
    name: 'Priya Singh',
    feedback: 'Very well organized and insightful sessions.',
    avatar: '',
  },
]

const EventTestimonials = () => (
  <SectionWrapper>
    <TitleStyled variant="h5">What Attendees Say</TitleStyled>
    <TestimonialsStack>
      {testimonials.map((t, i) => (
        <TestimonialCard key={i}>
          <AvatarNameStack>
            <AvatarStyled src={t.avatar}>{t.name[0]}</AvatarStyled>
            <Typography variant="body2.700">{t.name}</Typography>
          </AvatarNameStack>
          <Typography variant="body2" color="text.secondary">
            "{t.feedback}"
          </Typography>
        </TestimonialCard>
      ))}
    </TestimonialsStack>
  </SectionWrapper>
)

export default EventTestimonials
