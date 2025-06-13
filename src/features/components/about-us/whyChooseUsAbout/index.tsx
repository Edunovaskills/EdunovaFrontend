import React from 'react'

import { WhyChooseUs } from 'entities/component'
import { whyChooseUseCardDataForAbout } from 'features/model'

export const WhyChooseUsAbout = () => {
  return (
    <WhyChooseUs
      data={whyChooseUseCardDataForAbout}
      cardBasis="24%"
      title="Why Choose"
      textPrimary="Us?"
      subTitle="Reliable, safe, and efficient rides—Your Comfort and Safety First"
    />
  )
}
