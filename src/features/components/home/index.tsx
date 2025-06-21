import {
  ComingSoon,
  DownloadSection,
  HeroSection,
  WhyChooseUs,
} from 'entities/component'
import { Services } from './course'
import { BuzWorking } from './BuzWorking'
import { HomeWrapperStyled } from './styles.component'
import { OurPeopleSection } from './OurPeople'
import { ReferAndEarn } from './ReferAndEarn'
import { whyChooseUseCardData } from 'features/model'
import { useScreenSize } from 'shared/hooks'
import  EventsShowcase from '../events/EventsShowcase/EventsShowcase'

export const Home = () => {

  return (
    <div
      style={{
        gap: '100px',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
      }}
    >
      <HeroSection />
      <HomeWrapperStyled>
        <BuzWorking />
        <Services />
        <EventsShowcase />
        <WhyChooseUs data={whyChooseUseCardData} />
      </HomeWrapperStyled>
      {/* <DownloadSection /> */}
      <HomeWrapperStyled>
        <OurPeopleSection />
        {/* <ReferAndEarn />
        <ComingSoon /> */}
      </HomeWrapperStyled>
    </div>
  )
}
