import React from 'react'
import { HeroSection } from './hero'
import { HelpAndSupportWrapperStyled } from './styles.component'
import EventsShowcase from './EventsShowcase/EventsShowcase'
import EventDetails from './EventDetails'
import EventTestimonials from './EventTestimonials/EventTestimonials'

export const HelpAndSupport = () => {
  return (
    <div style={{ gap: '100px', display: 'flex', flexDirection: 'column' }}>
      <HeroSection />
      <HelpAndSupportWrapperStyled>
        <EventsShowcase />
        <EventTestimonials />
      </HelpAndSupportWrapperStyled>
    </div>
  )
}

export { EventDetails }
