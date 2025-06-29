import styled from 'styled-components';
import { theme } from 'styles/theme';

export const BenefitsContainer = styled.div`
  padding: ${theme.spacing['4xl']} ${theme.spacing.md};
  background: white;

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  }
`;

export const BenefitsWrapper = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing['3xl']};
  align-items: center;

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const TextContent = styled.div`
  @media (min-width: ${theme.breakpoints.lg}) {
    order: 1;
  }
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.lg};
  line-height: ${theme.lineHeights.tight};

  @media (min-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['4xl']};
  }
`;

export const SectionDescription = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.gray[600]};
  line-height: ${theme.lineHeights.relaxed};
  margin-bottom: ${theme.spacing['2xl']};
`;

export const BenefitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

export const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
`;

export const BenefitIcon = styled.div`
  padding: ${theme.spacing.sm};
  background: ${theme.colors.green[100]};
  border-radius: ${theme.borderRadius.lg};
  flex-shrink: 0;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: ${theme.colors.green[600]};
  }
`;

export const BenefitContent = styled.div`
  h3 {
    font-size: ${theme.fontSizes.lg};
    font-weight: ${theme.fontWeights.semibold};
    color: ${theme.colors.gray[900]};
    margin: 0 0 ${theme.spacing.xs} 0;
  }

  p {
    color: ${theme.colors.gray[600]};
    margin: 0;
    line-height: ${theme.lineHeights.relaxed};
  }
`;

export const ImageContent = styled.div`
  position: relative;
  
  @media (min-width: ${theme.breakpoints.lg}) {
    order: 2;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  border-radius: ${theme.borderRadius['2xl']};
  overflow: hidden;
  box-shadow: ${theme.shadows['2xl']};

  img {
    width: 100%;
    height: 24rem;
    object-fit: cover;

    @media (min-width: ${theme.breakpoints.sm}) {
      height: 28rem;
    }

    @media (min-width: ${theme.breakpoints.lg}) {
      height: 32rem;
    }
  }
`;

export const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(13, 148, 136, 0.1));
`;

export const FloatingCard = styled.div<{ $position: string }>`
  position: absolute;
  ${({ $position }) => $position};
  background: white;
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.md};
  box-shadow: ${theme.shadows.xl};
  border: 1px solid ${theme.colors.gray[100]};
  backdrop-filter: blur(8px);
  z-index: 10;

  @media (max-width: ${theme.breakpoints.lg}) {
    display: none;
  }
`;

export const FloatingCardContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${theme.colors.green[600]};
  }

  span {
    font-size: ${theme.fontSizes.sm};
    font-weight: ${theme.fontWeights.semibold};
    color: ${theme.colors.gray[700]};
  }
`;