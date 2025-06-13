import { OurService } from './OurService'
import { HeroSection } from './heroSection'
import { StackStyled } from './styles.component'
import { OnDemand } from './OnDemand'
import { DoorToDoor } from './DoorToDoor'
import { Affordable } from './Affordable'
import { Safe } from './Safe'
import { Divider } from '@mui/material'
import { GetInTouch } from 'entities/component'

export const Services = () => {
  return (
    <>
      <HeroSection />

      <StackStyled>
        <OurService />
        <OnDemand />
        <DoorToDoor />
        <Affordable />
        <Safe />
        <Divider />
        <GetInTouch />
      </StackStyled>
    </>
  )
}
