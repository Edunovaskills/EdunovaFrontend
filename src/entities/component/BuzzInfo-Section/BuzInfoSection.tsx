import React, { ReactNode } from 'react'
import { BuxInfoSectionWrapperStyled, TopViewStyled } from './styles.component'
import type { SxProps } from '@mui/material'

type Args = {
  topInfo: ReactNode
  showcaseSection: ReactNode
  wrapperStyle?: SxProps
}

export const BuzInfoSection = ({
  topInfo,
  showcaseSection,
  wrapperStyle,
}: Args) => {
  return (
    <BuxInfoSectionWrapperStyled sx={wrapperStyle}>
      <TopViewStyled>{topInfo}</TopViewStyled>

      {showcaseSection}
    </BuxInfoSectionWrapperStyled>
  )
}
