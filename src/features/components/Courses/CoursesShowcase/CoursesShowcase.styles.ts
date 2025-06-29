import styled from 'styled-components';
import { theme } from 'styles/theme';

export const ShowcaseContainer = styled.div`
  padding: ${theme.spacing['4xl']} ${theme.spacing.md} ${theme.spacing['4xl']} ${theme.spacing.md};
  background: white;

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing['4xl']} ${theme.spacing.lg} ${theme.spacing['4xl']} ${theme.spacing.lg};
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']} ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  }
`;

export const ShowcaseWrapper = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['3xl']};
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${theme.spacing.md};

  div {
    padding: ${theme.spacing.sm};
    background: ${theme.colors.green[100]};
    border-radius: ${theme.borderRadius['2xl']};

    svg {
      width: 2rem;
      height: 2rem;
      color: ${theme.colors.green[600]};
    }
  }
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

export const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing['3xl']} 0;

  svg {
    width: 4rem;
    height: 4rem;
    color: ${theme.colors.gray[300]};
    margin: 0 auto ${theme.spacing.md};
  }

  h3 {
    font-size: ${theme.fontSizes.xl};
    font-weight: ${theme.fontWeights.semibold};
    color: ${theme.colors.gray[600]};
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    color: ${theme.colors.gray[500]};
  }
`;

export const StatsSection = styled.div`
  margin-top: ${theme.spacing['4xl']};
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing['2xl']};

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatIconContainer = styled.div<{ $color: string }>`
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
  margin: 0;
`;

export const StatLabel = styled.p`
  color: ${theme.colors.gray[600]};
  margin: 0;
`;

// Course Card Styles
export const CourseCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius['2xl']};
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.gray[100]};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(0);
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: ${theme.shadows['2xl']};
    transform: translateY(-0.5rem);
  }
`;

export const CourseImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 12rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  .overlay {
    position: absolute;
    top: ${theme.spacing.md};
    left: ${theme.spacing.md};
    right: ${theme.spacing.md};
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .level-badge {
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    background: ${theme.colors.green[500]};
    color: white;
    border-radius: ${theme.borderRadius.full};
    font-size: ${theme.fontSizes.xs};
    font-weight: ${theme.fontWeights.semibold};
  }

  .duration-badge {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    background: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: ${theme.borderRadius.full};
    font-size: ${theme.fontSizes.xs};
    font-weight: ${theme.fontWeights.medium};
  }
`;

export const CourseContent = styled.div`
  padding: ${theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const CourseTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.sm};
  line-height: ${theme.lineHeights.tight};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s ease;

  ${CourseCard}:hover & {
    color: ${theme.colors.green[600]};
  }
`;

export const CourseDescription = styled.p`
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.sm};
  line-height: ${theme.lineHeights.relaxed};
  margin-bottom: ${theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

export const CourseInstructor = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.sm};

  svg {
    color: ${theme.colors.green[500]};
  }
`;

export const CourseMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

export const CourseMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.sm};

  svg {
    color: ${theme.colors.yellow[500]};
  }
`;

export const CoursePrice = styled.span<{ $isFree: boolean }>`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${({ $isFree }) => ($isFree ? theme.colors.green[600] : theme.colors.gray[900])};
`;

export const OriginalPrice = styled.span`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.gray[500]};
  text-decoration: line-through;
`;

export const EnrollButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.xl};
  font-weight: ${theme.fontWeights.semibold};
  font-size: ${theme.fontSizes.sm};
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  margin-top: auto;
  
  ${({ disabled }) => {
    if (disabled) {
      return `
        background: ${theme.colors.gray[100]};
        color: ${theme.colors.gray[400]};
      `;
    }
    
    return `
      background: linear-gradient(135deg, ${theme.colors.green[500]}, #0d9488);
      color: white;
      
      &:hover {
        box-shadow: ${theme.shadows.lg};
        transform: scale(1.05);
      }
      
      &:active {
        transform: scale(0.95);
      }
    `;
  }}

  svg {
    width: 1rem;
    height: 1rem;
  }
`;