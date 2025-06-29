import styled, { keyframes } from 'styled-components'
import { theme } from 'styles/theme'

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

export const StatsContainer = styled.section`
  position: relative;
  padding: ${theme.spacing['4xl']} ${theme.spacing.md};
  background: linear-gradient(
    135deg,
    ${theme.colors.green[600]} 0%,
    ${theme.colors.teal[600]} 50%,
    ${theme.colors.cyan[600]} 100%
  );
  color: white;
  overflow: hidden;

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing['4xl']} ${theme.spacing.lg};
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing['4xl']} ${theme.spacing['2xl']};
  }
`

export const PatternOverlay = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.2;
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(255, 255, 255, 0.15) 1px,
    transparent 0
  );
  background-size: 20px 20px;
`

export const FloatingElement = styled.div<{
  $position: string
  $size: string
  $delay?: string
}>`
  position: absolute;
  ${(props) => props.$position}
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.full};
  filter: blur(40px);
  animation: ${pulse} 2s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay || '0s'};
`

export const StatsWrapper = styled.div`
  position: relative;
  max-width: 80rem;
  margin: 0 auto;
`

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing['4xl']};
`

export const SectionDescription = styled.p`
  font-size: ${theme.fontSizes.xl};
  color: rgba(255, 255, 255, 0.8);
  max-width: 48rem;
  margin: 0 auto;
  line-height: 1.6;
`

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing['2xl']};

  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const StatCard = styled.div`
  text-align: center;
  padding: ${theme.spacing['2xl']};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border-radius: ${theme.borderRadius['2xl']};
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-0.25rem);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
`

export const StatIconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${theme.spacing.lg};

  div {
    padding: ${theme.spacing.md};
    background: rgba(255, 255, 255, 0.2);
    border-radius: ${theme.borderRadius.full};
    transition: background-color 0.3s ease;

    ${StatCard}:hover & {
      background: rgba(255, 255, 255, 0.3);
    }

    svg {
      width: 2rem;
      height: 2rem;
      color: white;
    }
  }
`

export const StatNumber = styled.h3`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  color: white;
  margin: 0 0 ${theme.spacing.sm} 0;
  transition: transform 0.3s ease;

  ${StatCard}:hover & {
    transform: scale(1.05);
  }

  @media (min-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['4xl']};
  }
`

export const StatLabel = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-weight: ${theme.fontWeights.medium};
  font-size: ${theme.fontSizes.sm};
  margin: 0 0 ${theme.spacing.xs} 0;

  @media (min-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.base};
  }
`

export const StatSubtext = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: ${theme.fontSizes.xs};
  margin: 0;

  @media (min-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes.sm};
  }
`
