import React, { ReactNode } from 'react'
import { WrapperStyled } from './styles.component'
import { Divider } from '@mui/material'

export const ReversableSection = ({
  imgUrl,
  reverse = false,
  textSection,
}: {
  imgUrl: string
  textSection: ReactNode
  reverse?: boolean
}) => {
  return (
    <WrapperStyled reverse={reverse}>
      <img src={imgUrl} alt="wait for cab" />
      <div style={{ minWidth: '830px', alignSelf: 'center' }}>
        {textSection}
      </div>
    </WrapperStyled>
  )
}
