import styled from 'styled-components';
import { theme } from 'styles/theme';

// Hero Section Styles
export const StackStyled = styled.div`
  position: relative;
  min-height: 60vh;
  background: linear-gradient(135deg, ${theme.colors.purple[600]} 0%, ${theme.colors.primary[600]} 50%, #4338ca 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
`;

export const WrapperStyled = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: 0 ${theme.spacing.lg};
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: 0 ${theme.spacing['2xl']};
  }
`;

// Event Details Styles
export const EventDetailsWrapper = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray[50]};
`;

export const EventImage = styled.div`
  position: relative;
  border-radius: ${theme.borderRadius['2xl']};
  overflow: hidden;
  box-shadow: ${theme.shadows.lg};

  img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
    transition: transform 0.3s ease;

    @media (min-width: ${theme.breakpoints.sm}) {
      height: 24rem;
    }

    @media (min-width: ${theme.breakpoints.md}) {
      height: 28rem;
    }
  }

  &:hover img {
    transform: scale(1.05);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export const EventContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.lg};
  }
`;

export const EnrollButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.xl};
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.lg};
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  
  background: ${({ disabled }) => 
    disabled 
      ? theme.colors.gray[300] 
      : `linear-gradient(135deg, ${theme.colors.purple[600]}, ${theme.colors.primary[600]})`
  };
  
  color: ${({ disabled }) => (disabled ? theme.colors.gray[500] : 'white')};

  ${({ disabled }) => !disabled && `
    &:hover {
      box-shadow: ${theme.shadows.lg};
      transform: scale(1.02);
    }

    &:active {
      transform: scale(0.98);
    }
  `}

  &:disabled {
    opacity: 0.6;
  }
`;

// Additional Event Card Styles
export const EventCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius['2xl']};
  box-shadow: ${theme.shadows.md};
  border: 1px solid ${theme.colors.gray[100]};
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${theme.shadows.xl};
    transform: translateY(-0.25rem);
  }
`;

export const EventCardContent = styled.div`
  padding: ${theme.spacing.lg};
`;

export const EventTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.sm};
  line-height: ${theme.lineHeights.tight};
`;

export const EventDescription = styled.p`
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.sm};
  line-height: ${theme.lineHeights.relaxed};
  margin-bottom: ${theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const EventMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};
`;

export const EventPrice = styled.span<{ $isFree?: boolean }>`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
  color: white;
  background: ${({ $isFree }) => 
    $isFree 
      ? theme.colors.green[500] 
      : `linear-gradient(135deg, ${theme.colors.purple[500]}, ${theme.colors.primary[500]})`
  };
`;

export const EventDate = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray[500]};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

// Stats Section Styles
export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing['3xl']};

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StatCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.lg};
  text-align: center;
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray[100]};
`;

export const StatIcon = styled.div<{ $color: string }>`
  display: flex;
  justify-content: center;
  margin-bottom: ${theme.spacing.sm};

  div {
    padding: ${theme.spacing.sm};
    background: ${({ $color }) => $color};
    border-radius: ${theme.borderRadius.full};

    svg {
      width: 1.5rem;
      height: 1.5rem;
      color: ${({ $color }) => {
        if ($color.includes('blue')) return theme.colors.primary[600];
        if ($color.includes('green')) return theme.colors.green[600];
        return theme.colors.purple[600];
      }};
    }
  }
`;

export const StatNumber = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.gray[900]};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

export const StatLabel = styled.p`
  color: ${theme.colors.gray[600]};
  margin: 0;
  font-size: ${theme.fontSizes.sm};
`;

// Loading and Error States
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['3xl']} 0;
  min-height: 20rem;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['3xl']} 0;
  text-align: center;

  svg {
    width: 4rem;
    height: 4rem;
    color: ${theme.colors.gray[300]};
    margin-bottom: ${theme.spacing.md};
  }

  h3 {
    font-size: ${theme.fontSizes.xl};
    font-weight: ${theme.fontWeights.semibold};
    color: ${theme.colors.gray[600]};
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    color: ${theme.colors.gray[500]};
    margin: 0;
  }
`;

// Responsive Grid Layout
export const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.lg};

  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// Section Headers
export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['4xl']};
  }
`;

export const SectionDescription = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.gray[600]};
  max-width: 48rem;
  margin: 0 auto;
  line-height: ${theme.lineHeights.relaxed};
`;