import React from 'react';
import { Calendar, Users, Sparkles } from 'lucide-react';
import {
  HeroContainer,
  BackgroundPattern,
  PatternOverlay,
  FloatingElement,
  ContentContainer,
  ContentWrapper,
  IconContainer,
  Subtitle,
  Title,
  Description,
  DecorativeLine
} from './HeroSection.styles';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  type: 'events' | 'courses' | 'blogs';
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'events':
      return Calendar;
    case 'courses':
      return Users;
    case 'blogs':
      return Sparkles;
    default:
      return Calendar;
  }
};

export const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, description, type }) => {
  const IconComponent = getTypeIcon(type);

  return (
    <HeroContainer $type={type}>
      <BackgroundPattern>
        <PatternOverlay />
      </BackgroundPattern>

      <FloatingElement $position="top: 5rem; left: 2.5rem;" $size="5rem" />
      <FloatingElement $position="bottom: 5rem; right: 2.5rem;" $size="8rem" $delay="1s" />
      <FloatingElement $position="top: 50%; left: 25%;" $size="4rem" $delay="0.5s" />

      <ContentContainer>
        <ContentWrapper>
          <IconContainer $type={type}>
            <div>
              <IconComponent />
            </div>
          </IconContainer>

          <Subtitle $type={type}>{subtitle}</Subtitle>

          <Title>{title}</Title>

          <Description>{description}</Description>

          <DecorativeLine>
            <div />
          </DecorativeLine>
        </ContentWrapper>
      </ContentContainer>
    </HeroContainer>
  );
};