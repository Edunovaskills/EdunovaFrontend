import React from 'react'
import { HeroSection } from './hero'
//import { HelpFAQ } from './FAQ'
import { HelpAndSupportWrapperStyled } from './styles.component'
import  EventsShowcase from './EventsShowcase/EventsShowcase'

export const HelpAndSupport = () => {
  return (
    <div style={{ gap: '100px', display: 'flex', flexDirection: 'column' }}>
      <HeroSection />
      <HelpAndSupportWrapperStyled>
        <EventsShowcase/>
        
      </HelpAndSupportWrapperStyled>
    </div>
  )
}
