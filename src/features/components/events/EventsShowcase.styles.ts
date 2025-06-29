import styled from 'styled-components';
import { theme } from 'styles/theme';

export const ShowcaseContainer = styled.div`
  padding: ${theme.spacing['4xl']} ${theme.spacing.md} ${theme.spacing['4xl']} ${theme.spacing.md};
  background: ${theme.colors.gray[50]};

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
    background: ${theme.colors.purple[100]};
    border-radius: ${theme.borderRadius['2xl']};

    svg {
      width: 2rem;
      height: 2rem;
      color: ${theme.colors.purple[600]};
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