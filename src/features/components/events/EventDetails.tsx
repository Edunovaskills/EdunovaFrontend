import React from 'react'
import { ArrowLeft, Calendar, Clock, ExternalLink, Share2 } from 'lucide-react'
import { LoadingSpinner } from 'shared/components/LoadingSpinner'
import {
  DetailsContainer,
  Header,
  HeaderContent,
  BackButton,
  MainContent,
  ContentGrid,
  LeftColumn,
  RightColumn,
  HeroImageContainer,
  HeroContent,
  BadgeContainer,
  Badge,
  HeroTitle,
  InfoCard,
  InfoGrid,
  InfoItem,
  InfoIcon,
  InfoDetails,
  SectionTitle,
  DescriptionText,
  SidebarCard,
  PriceSection,
  Price,
  PriceLabel,
  EnrollButton,
  ActionButtons,
  SecondaryButton,
  IncludedSection,
  IncludedList,
  IncludedItem,
  StatsCard,
  StatsList,
  StatItem,
} from './EventDetails.styles'
import { useEventByIdQuery } from 'entities/query'

interface EventDetailsProps {
  eventId?: string
  onBackToEvents?: () => void
}

const EventDetails: React.FC<EventDetailsProps> = ({
  eventId,
  onBackToEvents,
}) => {
  const { data, isLoading, isError } = useEventByIdQuery(eventId || '')
  const event = data?.data?.event

  const handleEnroll = () => {
    if (event?.paymentUrl) {
      window.open(event.paymentUrl, '_blank')
    }
  }

  const handleShare = () => {
    if (navigator.share && event) {
      navigator
        .share({
          title: event.title,
          text: event.description.substring(0, 100) + '...',
          url: window.location.href,
        })
        .catch((error) => console.error('Error sharing:', error))
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading event details..." />
  }

  if (isError || !event) {
    return (
      <DetailsContainer>
        <Header>
          <HeaderContent>
            <BackButton onClick={() => window.history.back()}>
              <ArrowLeft />
              Back to Events
            </BackButton>
          </HeaderContent>
        </Header>
        <MainContent>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60vh',
              flexDirection: 'column',
              gap: '1rem',
              textAlign: 'center',
            }}
          >
            <InfoCard style={{ maxWidth: '32rem', padding: '2rem' }}>
              <SectionTitle style={{ color: '#dc2626', marginBottom: '1rem' }}>
                Event Not Found
              </SectionTitle>
              <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                The event you're looking for doesn't exist or has been removed.
              </p>
              <EnrollButton
                $disabled={false}
                onClick={onBackToEvents}
                style={{ background: '#2563eb' }}
              >
                Back to Events
              </EnrollButton>
            </InfoCard>
          </div>
        </MainContent>
      </DetailsContainer>
    )
  }

  return (
    <DetailsContainer>
      <Header>
        <HeaderContent>
          <BackButton onClick={() => window.history.back()}>
            <ArrowLeft />
            Back to Events
          </BackButton>
        </HeaderContent>
      </Header>

      <MainContent>
        <ContentGrid>
          <LeftColumn>
            <HeroImageContainer>
              <img
                src={
                  event.image ||
                  'https://placehold.co/600x400/F0F0F0/333333?text=Event+Image'
                }
                alt={event.title}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src =
                    'https://placehold.co/600x400/F0F0F0/333333?text=Event+Image'
                }}
              />
              <HeroContent>
                <BadgeContainer>
                  <Badge $variant="price">
                    {event.price === 0 ? 'Free Event' : `₹${event.price}`}
                  </Badge>
                  {/* Removed enrollment badge as currentParticipants/maxParticipants are not available */}
                </BadgeContainer>
                <HeroTitle>{event.title}</HeroTitle>
              </HeroContent>
            </HeroImageContainer>

            <InfoCard>
              <InfoGrid>
                {/* Removed Duration, Location, and Participants InfoItems as their data is not available */}
                <InfoItem>
                  <InfoIcon $color="#dbeafe">
                    <Calendar />
                  </InfoIcon>
                  <InfoDetails>
                    <p>Created</p>
                    <p>{new Date(event.createdAt).toLocaleDateString()}</p>
                  </InfoDetails>
                </InfoItem>
                <InfoItem>
                  <InfoIcon $color="#dcfce7">
                    <Clock />
                  </InfoIcon>
                  <InfoDetails>
                    <p>Last Updated</p>
                    <p>{new Date(event.updatedAt).toLocaleDateString()}</p>
                  </InfoDetails>
                </InfoItem>
              </InfoGrid>

              {/* Removed ProgressSection as enrollment data is not available */}

              <div>
                <SectionTitle>About This Event</SectionTitle>
                <DescriptionText>
                  {event.description
                    .split('\n')
                    .map((paragraph: string, index: number) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </DescriptionText>
              </div>
            </InfoCard>

            {/* Removed Event Schedule and Meet Your Instructor sections as their data is not available */}
          </LeftColumn>

          <RightColumn>
            <SidebarCard>
              <PriceSection>
                <Price>{event.price === 0 ? 'Free' : `₹${event.price}`}</Price>
                <PriceLabel>One-time payment</PriceLabel>
              </PriceSection>

              <EnrollButton
                $disabled={!event.paymentUrl}
                onClick={handleEnroll}
                disabled={!event.paymentUrl}
              >
                {event.paymentUrl ? 'Enroll Now' : 'Enrollment Closed'}
              </EnrollButton>

              <ActionButtons>
                <SecondaryButton onClick={handleShare}>
                  <Share2 />
                  Share
                </SecondaryButton>
                <SecondaryButton>
                  <ExternalLink />
                  Details
                </SecondaryButton>
              </ActionButtons>

              <IncludedSection>
                <h3>What's Included</h3>
                <IncludedList>
                  <IncludedItem>Live interactive sessions</IncludedItem>
                  <IncludedItem>Hands-on projects</IncludedItem>
                  <IncludedItem>Certificate of completion</IncludedItem>
                  <IncludedItem>Lifetime access to materials</IncludedItem>
                  <IncludedItem>Community access</IncludedItem>
                </IncludedList>
              </IncludedSection>
            </SidebarCard>

            <StatsCard>
              <h3>Event Stats</h3>
              <StatsList>
                <StatItem>
                  <span>Created</span>
                  <span>{new Date(event.createdAt).toLocaleDateString()}</span>
                </StatItem>
                <StatItem>
                  <span>Last Updated</span>
                  <span>{new Date(event.updatedAt).toLocaleDateString()}</span>
                </StatItem>
                {/* Removed Difficulty and Language as their data is not available */}
              </StatsList>
            </StatsCard>
          </RightColumn>
        </ContentGrid>
      </MainContent>
    </DetailsContainer>
  )
}

export default EventDetails
