import styled from 'styled-components';
import { theme } from 'styles/theme';

export const DetailsContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray[50]};
`;

export const Header = styled.div`
  background: white;
  box-shadow: ${theme.shadows.sm};
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

export const HeaderContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: ${theme.spacing.md} ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md} ${theme.spacing.lg};
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing.md} ${theme.spacing['2xl']};
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray[600]};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.gray[900]};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const MainContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']} ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing['2xl']};
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing['2xl']};

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['2xl']};
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

export const HeroImageContainer = styled.div`
  position: relative;
  border-radius: ${theme.borderRadius['2xl']};
  overflow: hidden;

  img {
    width: 100%;
    height: 16rem;
    object-fit: cover;

    @media (min-width: ${theme.breakpoints.sm}) {
      height: 20rem;
    }
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
  }
`;

export const HeroContent = styled.div`
  position: absolute;
  bottom: ${theme.spacing.lg};
  left: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  z-index: 10;
`;

export const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
`;

export const Badge = styled.span<{ $variant: 'price' | 'enrollment' }>`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
  color: white;
  background: ${({ $variant }) => {
    switch ($variant) {
      case 'price':
        return theme.colors.purple[500];
      case 'enrollment':
        return theme.colors.primary[500];
      default:
        return theme.colors.gray[500];
    }
  }};
`;

export const HeroTitle = styled.h1`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  color: white;

  @media (min-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

export const InfoCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray[100]};
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};

  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

export const InfoIcon = styled.div<{ $color: string }>`
  padding: ${theme.spacing.sm};
  background: ${({ $color }) => $color};
  border-radius: ${theme.borderRadius.lg};

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${({ $color }) => {
      if ($color.includes('blue')) return theme.colors.primary[600];
      if ($color.includes('green')) return theme.colors.green[600];
      return theme.colors.purple[600];
    }};
  }
`;

export const InfoDetails = styled.div`
  p:first-child {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.gray[500]};
    margin: 0;
  }

  p:last-child {
    font-weight: ${theme.fontWeights.semibold};
    margin: 0;
  }
`;

export const ProgressSection = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray[600]};
  margin-bottom: ${theme.spacing.sm};
`;

export const ProgressBar = styled.div`
  width: 100%;
  background: ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.full};
  height: 0.5rem;
`;

export const ProgressFill = styled.div<{ $percentage: number }>`
  background: linear-gradient(to right, ${theme.colors.primary[500]}, ${theme.colors.purple[500]});
  height: 100%;
  border-radius: ${theme.borderRadius.full};
  width: ${({ $percentage }) => $percentage}%;
  transition: width 0.3s ease;
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.md};
`;

export const DescriptionText = styled.div`
  p {
    color: ${theme.colors.gray[700]};
    line-height: ${theme.lineHeights.relaxed};
    margin-bottom: ${theme.spacing.md};

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const ScheduleItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.xl};
`;

export const ScheduleIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: ${theme.colors.primary[100]};
  border-radius: ${theme.borderRadius.lg};

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${theme.colors.primary[600]};
  }
`;

export const ScheduleContent = styled.div`
  p:first-child {
    font-weight: ${theme.fontWeights.semibold};
    color: ${theme.colors.gray[900]};
    margin: 0;
  }

  p:last-child {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.gray[500]};
    margin: 0;
  }
`;

export const InstructorSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
`;

export const InstructorAvatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: ${theme.borderRadius.full};
  object-fit: cover;
`;

export const InstructorInfo = styled.div`
  h3 {
    font-weight: ${theme.fontWeights.semibold};
    color: ${theme.colors.gray[900]};
    font-size: ${theme.fontSizes.lg};
    margin: 0 0 ${theme.spacing.xs} 0;
  }

  p {
    color: ${theme.colors.gray[600]};
    margin: ${theme.spacing.xs} 0;
  }
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: ${theme.spacing.sm};

  svg {
    width: 1rem;
    height: 1rem;
  }

  span {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.gray[500]};
    margin-left: ${theme.spacing.sm};
  }
`;

export const SidebarCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray[100]};
  position: sticky;
  top: ${theme.spacing.lg};
`;

export const PriceSection = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
`;

export const Price = styled.div`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.sm};
`;

export const PriceLabel = styled.p`
  color: ${theme.colors.gray[500]};
  margin: 0;
`;

export const EnrollButton = styled.button<{ $disabled: boolean }>`
  width: 100%;
  background: ${({ $disabled }) => 
    $disabled 
      ? theme.colors.gray[300] 
      : `linear-gradient(135deg, ${theme.colors.purple[600]}, ${theme.colors.primary[600]})`
  };
  color: ${({ $disabled }) => ($disabled ? theme.colors.gray[500] : 'white')};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.xl};
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.lg};
  border: none;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;

  ${({ $disabled }) => !$disabled && `
    &:hover {
      box-shadow: ${theme.shadows.lg};
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  `}
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

export const SecondaryButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.xl};
  background: white;
  color: ${theme.colors.gray[700]};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray[50]};
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const IncludedSection = styled.div`
  margin-top: ${theme.spacing.lg};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray[200]};

  h3 {
    font-weight: ${theme.fontWeights.semibold};
    color: ${theme.colors.gray[900]};
    margin-bottom: ${theme.spacing.sm};
  }
`;

export const IncludedList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const IncludedItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray[600]};

  &::before {
    content: '';
    width: 0.375rem;
    height: 0.375rem;
    background: ${theme.colors.green[500]};
    border-radius: ${theme.borderRadius.full};
    flex-shrink: 0;
  }
`;

export const StatsCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray[100]};

  h3 {
    font-weight: ${theme.fontWeights.semibold};
    color: ${theme.colors.gray[900]};
    margin-bottom: ${theme.spacing.md};
  }
`;

export const StatsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const StatItem = styled.div`
  display: flex;
  justify-content: space-between;

  span:first-child {
    color: ${theme.colors.gray[600]};
  }

  span:last-child {
    font-weight: ${theme.fontWeights.medium};
  }
`;