import styled, { keyframes } from 'styled-components';
import { theme } from 'styles/theme';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing['3xl']} 0;
`;

export const SpinnerIcon = styled.div<{ $size: 'sm' | 'md' | 'lg' }>`
  animation: ${spin} 1s linear infinite;
  color: ${theme.colors.primary[600]};
  margin-bottom: ${theme.spacing.md};

  svg {
    width: ${({ $size }) => {
      switch ($size) {
        case 'sm': return '1rem';
        case 'md': return '2rem';
        case 'lg': return '3rem';
        default: return '2rem';
      }
    }};
    height: ${({ $size }) => {
      switch ($size) {
        case 'sm': return '1rem';
        case 'md': return '2rem';
        case 'lg': return '3rem';
        default: return '2rem';
      }
    }};
  }
`;

export const LoadingMessage = styled.p`
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
`;