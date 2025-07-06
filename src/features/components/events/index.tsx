import React from 'react'
import { HelpAndSupportWrapperStyled } from './styles.component'
import EventsShowcase from './EventsShowcase'
import EventDetails from './EventDetails'
import { EventTestimonials } from './EventTestimonials'
import { HeroSection } from './HeroSection'

export const HelpAndSupport = () => {
  return (
    <div style={{ gap: '100px', display: 'flex', flexDirection: 'column' }}>
      <HeroSection />
      <HelpAndSupportWrapperStyled>
        <EventsShowcase />
        {/* FIXME: uncomment it when it is required @Aditya  */}
        {/* <CertificateViewer/> */}
        <EventTestimonials />
      </HelpAndSupportWrapperStyled>
    </div>
  )
}

export { EventDetails }
