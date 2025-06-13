import React, { PropsWithChildren } from 'react'
import { LogoWrapperStyled } from './styles.component'


type Props = PropsWithChildren<{url?:string}>
export const Logo = ({ url,children }: Props) => {
  return (
    <LogoWrapperStyled>
      {url ? <img src={url} alt="company promises" />:children}
    </LogoWrapperStyled>
  )
}
