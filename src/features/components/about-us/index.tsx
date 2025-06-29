import React from 'react'
import { AboutUsWrapperStyled } from './styles.component'
import { WhoWeAre } from './whoWeAre'
import { GetInTouch } from 'entities/component'
import{CompanyOverview} from './CompanyOverview'
import {WhyChooseUs} from './WhyChooseUs'

export const AboutUs = () => {
  return (
    <div style={{ gap: '100px', display: 'flex', flexDirection: 'column' }}>
      <AboutUsWrapperStyled>
        <WhoWeAre />
       <CompanyOverview/>
       <WhyChooseUs/>
        <GetInTouch />
      </AboutUsWrapperStyled>
    </div>
  )
}
