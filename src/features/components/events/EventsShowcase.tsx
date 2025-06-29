import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Card } from 'shared/components/card';
import { Carousel } from 'shared/components/Carousel';
import { LoadingSpinner } from 'shared/components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import {
  ShowcaseContainer,
  ShowcaseWrapper,
  SectionHeader,
  IconContainer,
  SectionTitle,
  SectionDescription,
  EmptyState,
  StatsSection,
  StatItem,
  StatIconContainer,
  StatNumber,
  StatLabel
} from './EventsShowcase.styles';
import { useAllEventsQuery } from 'entities/query';
import { useAppNavigate } from 'entities/state';

interface EventsShowcaseProps {

  onEventClick: (eventId: string) => void;
}

const EventsShowcase: React.FC<EventsShowcaseProps> = () => {
  const { data, isLoading, isError } = useAllEventsQuery();
  const events = data?.data?.events || [];
  const {appNavigate} = useAppNavigate()


  const handleEventClick = (eventId: string) => {
    appNavigate('eventDetail',{eventId}); // Update this line
  };

  const handleEnrollClick = (e: React.MouseEvent, paymentUrl: string) => {
    e.stopPropagation();
    if (paymentUrl) {
      window.open(paymentUrl, '_blank');
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading exciting events..." />;
  }

  return (
    <ShowcaseContainer>
      <ShowcaseWrapper>
        <SectionHeader>
          <IconContainer>
            <div>
              <Calendar />
            </div>
          </IconContainer>
          <SectionTitle>Our Events</SectionTitle>
          <SectionDescription>
            Join our community of learners in exciting workshops, seminars, and networking events 
            designed to accelerate your professional growth.
          </SectionDescription>
        </SectionHeader>

        {isError ? (
          <EmptyState>
            <Calendar />
            <h3>Unable to Load Events</h3>
            <p>Please try again later. We're working to resolve this issue.</p>
          </EmptyState>
        ) : events.length > 0 ? (
          <Carousel
            slidesToShow={3}
            autoPlay={true}
            autoPlayInterval={5000}
            showNavigation={true}
            showPagination={true}
          >
            {events.map((event) => (
              <Card
                key={event._id}
                title={event.title}
                description={event.description}
                image={event.image}
                price={event.price}
                isFree={event.price === 0}
                onClick={() => handleEventClick(event._id)}
                onActionClick={(e) => handleEnrollClick(e, event.paymentUrl)}
                actionText="Enroll Now"
                actionDisabled={!event.paymentUrl}
                type="event"
              />
            ))}
          </Carousel>
        ) : (
          <EmptyState>
            <Calendar />
            <h3>No Events Available</h3>
            <p>Check back soon for exciting upcoming events!</p>
          </EmptyState>
        )}

        <StatsSection>
          <StatItem>
            <StatIconContainer $color="#dbeafe">
              <div>
                <Users />
              </div>
            </StatIconContainer>
            <StatNumber>500+</StatNumber>
            <StatLabel>Active Participants</StatLabel>
          </StatItem>
          <StatItem>
            <StatIconContainer $color="#dcfce7">
              <div>
                <Calendar />
              </div>
            </StatIconContainer>
            <StatNumber>50+</StatNumber>
            <StatLabel>Events Completed</StatLabel>
          </StatItem>
          <StatItem>
            <StatIconContainer $color="#f3e8ff">
              <div>
                <MapPin />
              </div>
            </StatIconContainer>
            <StatNumber>10+</StatNumber>
            <StatLabel>Cities Covered</StatLabel>
          </StatItem>
        </StatsSection>
      </ShowcaseWrapper>
    </ShowcaseContainer>
  );
};

export default EventsShowcase;