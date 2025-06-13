import React from 'react'
import { HeroSection } from './hero'
import { HelpFAQ } from './FAQ'
import { HelpAndSupportWrapperStyled } from './styles.component'
import { GetInTouch } from 'entities/component'

export const HelpAndSupport = () => {
  return (
    <div style={{ gap: '100px', display: 'flex', flexDirection: 'column' }}>
      <HeroSection />
      <HelpAndSupportWrapperStyled>
        <HelpFAQ />
        <GetInTouch />
      </HelpAndSupportWrapperStyled>
    </div>
  )
}
