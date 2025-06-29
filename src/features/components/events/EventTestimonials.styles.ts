import styled from 'styled-components';
import { theme } from 'styles/theme';

export const TestimonialsContainer = styled.div`
  padding: ${theme.spacing['4xl']} ${theme.spacing.md} ${theme.spacing['4xl']} ${theme.spacing.md};
  background: white;

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing['4xl']} ${theme.spacing.lg} ${theme.spacing['4xl']} ${theme.spacing.lg};
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']} ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  }
`;

export const TestimonialsWrapper = styled.div`
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

export const CallToActionContainer = styled.div`
  margin-top: ${theme.spacing['3xl']};
  text-align: center;
`;

export const CTACard = styled.div`
  background: linear-gradient(135deg, ${theme.colors.purple[600]}, ${theme.colors.primary[600]});
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing['2xl']};
  color: white;
`;

export const CTATitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing.md};
`;

export const CTADescription = styled.p`
  color: ${theme.colors.purple[100]};
  margin-bottom: ${theme.spacing.lg};
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
`;

export const CTAButton = styled.button`
  background: white;
  color: ${theme.colors.purple[600]};
  padding: ${theme.spacing.sm} ${theme.spacing['2xl']};
  border-radius: ${theme.borderRadius.xl};
  font-weight: ${theme.fontWeights.semibold};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray[100]};
  }
`;