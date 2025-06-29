import React, { ReactNode } from 'react'
import { WrapperStyled } from './styles.component'

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
      <img src={imgUrl} alt="wait for cab" width={300} height={300} />
      <div style={{ minWidth: '830px', alignSelf: 'center' }}>
        {textSection}
      </div>
    </WrapperStyled>
  )
}
