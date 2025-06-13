import React, { ReactNode } from 'react'
import { BuxInfoSectionWrapperStyled, TopViewStyled } from './styles.component'

type Args = {
  topInfo: ReactNode
  showcaseSection: ReactNode
}

export const BuzInfoSection = ({ topInfo, showcaseSection }: Args) => {
  return (
    <BuxInfoSectionWrapperStyled>
      <TopViewStyled>{topInfo}</TopViewStyled>

      {showcaseSection}
    </BuxInfoSectionWrapperStyled>
  )
}
