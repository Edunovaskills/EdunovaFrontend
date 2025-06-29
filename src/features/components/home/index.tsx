import { HeroSection, WhyChooseUs } from 'entities/component'
import { Services } from './course'
import { HomeWrapperStyled } from './styles.component'
import { OurPeopleSection } from './OurPeople'
import EventsShowcase from '../events/EventsShowcase'
import { OurOffering } from './OurOffering'

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
        <OurOffering />
        <Services />
        <EventsShowcase onEventClick={() => {}} />
        <WhyChooseUs />
      </HomeWrapperStyled>
      <HomeWrapperStyled>
        <OurPeopleSection />
      </HomeWrapperStyled>
    </div>
  )
}
