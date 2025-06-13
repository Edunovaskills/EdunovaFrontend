import React from 'react'
import { AboutUsWrapperStyled } from './styles.component'
import { WhoWeAre } from './whoWeAre'
import { WhyChooseUsAbout } from './whyChooseUsAbout'
import { GetInTouch } from 'entities/component'

export const AboutUs = () => {
  return (
    <div style={{ gap: '100px', display: 'flex', flexDirection: 'column' }}>
      <AboutUsWrapperStyled>
        <WhoWeAre />
        <WhyChooseUsAbout />
        <GetInTouch />
      </AboutUsWrapperStyled>
    </div>
  )
}
