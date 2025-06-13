import React, { ReactNode } from 'react'
import { WrapperStyled } from './styles.component'

export const RoundedIcon = ({
  content,
  iconBackgroundColor,
  size,
}: {
  content: ReactNode
  iconBackgroundColor?: string
  size?: number
}) => {
  return (
    <WrapperStyled size={size} iconBackgroundColor={iconBackgroundColor}>
      {content}
    </WrapperStyled>
  )
}
