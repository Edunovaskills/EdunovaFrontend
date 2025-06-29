import React from 'react'
import { HelpAndSupportWrapperStyled } from './styles.component'
import EventsShowcase from './EventsShowcase'
import EventDetails from './EventDetails'
import { EventTestimonials } from './EventTestimonials'
import { HeroSection } from './HeroSection'
import {CertificateViewer} from './CertificateViewer'

export const HelpAndSupport = () => {
  return (
    <div style={{ gap: '100px', display: 'flex', flexDirection: 'column' }}>
      <HeroSection />
      <HelpAndSupportWrapperStyled>
        <EventsShowcase />
        <CertificateViewer/>
        <EventTestimonials />
      </HelpAndSupportWrapperStyled>
    </div>
  )
}

export { EventDetails }
