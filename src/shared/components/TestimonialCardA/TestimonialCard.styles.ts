import styled from 'styled-components';
import { theme } from 'styles/theme';

export const TestimonialContainer = styled.div`
  background: white;
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.gray[100]};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${theme.shadows.xl};
  }
`;

export const TestimonialHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.md};
`;

export const QuoteIcon = styled.div`
  svg {
    width: 2rem;
    height: 2rem;
    color: ${theme.colors.primary[200]};
  }
`;

export const RatingContainer = styled.div`
  display: flex;
  gap: 0.25rem;

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const FeedbackText = styled.p`
  color: ${theme.colors.gray[700]};
  line-height: ${theme.lineHeights.relaxed};
  margin-bottom: ${theme.spacing.lg};
  font-style: italic;

  &::before {
    content: '"';
  }

  &::after {
    content: '"';
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

export const UserAvatar = styled.div`
  position: relative;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: ${theme.borderRadius.full};
    object-fit: cover;
  }
`;

export const AvatarFallback = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: ${theme.borderRadius.full};
  background: linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.purple[600]});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${theme.fontWeights.semibold};
`;

export const UserDetails = styled.div`
  h4 {
    font-weight: ${theme.fontWeights.semibold};
    color: ${theme.colors.gray[900]};
    margin: 0;
  }

  p {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.gray[500]};
    margin: 0;
  }
`;