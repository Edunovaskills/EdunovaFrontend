import styled from 'styled-components';
import { theme } from 'styles/theme';

export const FeaturesContainer = styled.div`
  padding: ${theme.spacing['4xl']} ${theme.spacing.md};
  background: white;

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  }
`;

export const FeaturesWrapper = styled.div`
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

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing['2xl']};

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const FeatureCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing['2xl']};
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.gray[100]};
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    box-shadow: ${theme.shadows['2xl']};
    transform: translateY(-0.5rem);
  }
`;

export const FeatureIconContainer = styled.div<{ $color: string }>`
  display: flex;
  justify-content: center;
  margin-bottom: ${theme.spacing.lg};

  div {
    padding: ${theme.spacing.lg};
    background: ${({ $color }) => $color};
    border-radius: ${theme.borderRadius['2xl']};

    svg {
      width: 2.5rem;
      height: 2.5rem;
      color: ${({ $color }) => {
        if ($color.includes('blue')) return theme.colors.primary[600];
        if ($color.includes('green')) return theme.colors.green[600];
        if ($color.includes('purple')) return theme.colors.purple[600];
        if ($color.includes('yellow')) return '#d97706';
        if ($color.includes('red')) return theme.colors.red[600];
        return theme.colors.gray[600];
      }};
    }
  }
`;

export const FeatureTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.sm};
`;

export const FeatureDescription = styled.p`
  color: ${theme.colors.gray[600]};
  line-height: ${theme.lineHeights.relaxed};
`;