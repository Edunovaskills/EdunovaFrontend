import React from 'react'
import { MessageSquare } from 'lucide-react'
import { TestimonialCard } from 'shared/components/TestimonialCardA'
import { Carousel } from 'shared/components/Carousel'
import {
  TestimonialsContainer,
  TestimonialsWrapper,
  SectionHeader,
  IconContainer,
  SectionTitle,
  SectionDescription,
  CallToActionContainer,
  CTACard,
  CTATitle,
  CTADescription,
  CTAButton,
} from './EventTestimonials.styles'
import { useTestimonialsQuery } from 'entities/query'
import { LoadingSpinner } from 'shared/components'

export const EventTestimonials = () => {
  const { data, isLoading } = useTestimonialsQuery()
  const testimonials = data?.data?.testimonials || []

  if (isLoading) {
    return <LoadingSpinner message="Loading testimonials..." />
  }

  return (
    <TestimonialsContainer>
      <TestimonialsWrapper>
        <SectionHeader>
          <IconContainer>
            <div>
              <MessageSquare />
            </div>
          </IconContainer>
          <SectionTitle>What Our Attendees Say</SectionTitle>
          <SectionDescription>
            Don't just take our word for it. Here's what our community members
            have to say about their learning experience with us.
          </SectionDescription>
        </SectionHeader>

        <Carousel
          slidesToShow={3}
          autoPlay={true}
          autoPlayInterval={6000}
          showNavigation={true}
          showPagination={true}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              feedback={testimonial.message}
              rating={5}
              role={testimonial.designation}
            />
          ))}
        </Carousel>

        <CallToActionContainer>
          <CTACard>
            <CTATitle>Ready to Join Our Community?</CTATitle>
            <CTADescription>
              Be part of our growing community of learners and professionals.
              Register for upcoming events and start your learning journey
              today.
            </CTADescription>
            <CTAButton>View All Events</CTAButton>
          </CTACard>
        </CallToActionContainer>
      </TestimonialsWrapper>
    </TestimonialsContainer>
  )
}
