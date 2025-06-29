import React from 'react';
import { Star, Quote } from 'lucide-react';
import {
  TestimonialContainer,
  TestimonialHeader,
  QuoteIcon,
  RatingContainer,
  FeedbackText,
  UserInfo,
  UserAvatar,
  AvatarFallback,
  UserDetails
} from './TestimonialCard.styles';

interface TestimonialCardProps {
  name: string;
  feedback: string;
  avatar?: string;
  rating?: number;
  role?: string;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  feedback,
  avatar,
  rating = 5,
  role,
  className = ""
}) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <TestimonialContainer className={className}>
      <TestimonialHeader>
        <QuoteIcon>
          <Quote />
        </QuoteIcon>
        <RatingContainer>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={index < rating ? 'filled' : 'empty'}
              style={{
                color: index < rating ? '#fbbf24' : '#d1d5db',
                fill: index < rating ? 'currentColor' : 'none'
              }}
            />
          ))}
        </RatingContainer>
      </TestimonialHeader>

      <FeedbackText>{feedback}</FeedbackText>

      <UserInfo>
        <UserAvatar>
          {avatar ? (
            <img src={avatar} alt={name} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </UserAvatar>
        <UserDetails>
          <h4>{name}</h4>
          {role && <p>{role}</p>}
        </UserDetails>
      </UserInfo>
    </TestimonialContainer>
  );
};