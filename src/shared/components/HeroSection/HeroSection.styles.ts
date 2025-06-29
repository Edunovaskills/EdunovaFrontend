import styled from 'styled-components';
import { theme } from 'styles/theme';

export const HeroContainer = styled.div<{ $type: 'events' | 'courses' | 'blogs' }>`
  position: relative;
  min-height: 60vh;
  background: ${({ $type }) => {
    switch ($type) {
      case 'events':
        return `linear-gradient(135deg, ${theme.colors.purple[600]} 0%, ${theme.colors.primary[600]} 50%, #4338ca 100%)`;
      case 'courses':
        return `linear-gradient(135deg, ${theme.colors.green[600]} 0%, #0d9488 50%, #0891b2 100%)`;
      case 'blogs':
        return `linear-gradient(135deg, #0d9488 0%, ${theme.colors.gray[600]} 50%, #0891b2 100%)`;
      default:
        return `linear-gradient(135deg, ${theme.colors.purple[600]} 0%, ${theme.colors.primary[600]} 50%, #4338ca 100%)`;
    }
  }};
  overflow: hidden;
`;

export const BackgroundPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.1;
`;

export const PatternOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

export const FloatingElement = styled.div<{ $position: string; $size: string; $delay?: string }>`
  position: absolute;
  ${({ $position }) => $position};
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  filter: blur(20px);
  animation: pulse 2s infinite;
  animation-delay: ${({ $delay }) => $delay || '0s'};

  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }
`;

export const ContentContainer = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 0 ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: 0 ${theme.spacing.lg};
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 0 ${theme.spacing['2xl']};
  }
`;

export const ContentWrapper = styled.div`
  text-align: center;
  max-width: 64rem;
  margin: 0 auto;
`;

export const IconContainer = styled.div<{ $type: 'events' | 'courses' | 'blogs' }>`
  display: flex;
  justify-content: center;
  margin-bottom: ${theme.spacing.lg};

  div {
    padding: ${theme.spacing.md};
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    border-radius: ${theme.borderRadius['2xl']};
    border: 1px solid rgba(255, 255, 255, 0.2);

    svg {
      width: 3rem;
      height: 3rem;
      color: white;
    }
  }
`;

export const Subtitle = styled.p<{ $type: 'events' | 'courses' | 'blogs' }>`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $type }) => {
    switch ($type) {
      case 'events':
        return theme.colors.purple[200];
      case 'courses':
        return theme.colors.green[200];
      case 'blogs':
        return '#fed7aa';
      default:
        return theme.colors.purple[200];
    }
  }};
  margin-bottom: ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.base};
  }
`;

export const Title = styled.h1`
  font-size: ${theme.fontSizes['4xl']};
  font-weight: ${theme.fontWeights.bold};
  color: white;
  margin-bottom: ${theme.spacing.lg};
  line-height: ${theme.lineHeights.tight};

  @media (min-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['5xl']};
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    font-size: ${theme.fontSizes['6xl']};
  }
`;

export const Description = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: rgba(255, 255, 255, 0.9);
  max-width: 48rem;
  margin: 0 auto;
  line-height: ${theme.lineHeights.relaxed};

  @media (min-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.xl};
  }
`;

export const DecorativeLine = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${theme.spacing['2xl']};

  div {
    width: 6rem;
    height: 0.25rem;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent);
    border-radius: ${theme.borderRadius.full};
  }
`;