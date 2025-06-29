import styled from 'styled-components';
import { theme } from 'styles/theme';

export const CardContainer = styled.div<{ $type: 'event' | 'course' | 'blog' }>`
  background: white;
  border-radius: ${theme.borderRadius['2xl']};
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.gray[100]};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(0);

  &:hover {
    box-shadow: ${theme.shadows['2xl']};
    transform: translateY(-0.5rem);
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 12rem;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export const PriceBadge = styled.span<{ $type: 'event' | 'course' | 'blog'; $isFree: boolean }>`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
  color: white;
  background: ${({ $type, $isFree }) => {
    if ($isFree) return theme.colors.green[500];
    switch ($type) {
      case 'event':
        return `linear-gradient(135deg, ${theme.colors.purple[500]}, ${theme.colors.primary[500]})`;
      case 'course':
        return `linear-gradient(135deg, ${theme.colors.green[500]}, #0d9488)`;
      case 'blog':
        return `linear-gradient(135deg, #ea580c, ${theme.colors.red[500]})`;
      default:
        return `linear-gradient(135deg, ${theme.colors.purple[500]}, ${theme.colors.primary[500]})`;
    }
  }};
  box-shadow: ${theme.shadows.lg};
`;

export const ContentContainer = styled.div`
  padding: ${theme.spacing.lg};
`;

export const CardTitle = styled.h3<{ $type: 'event' | 'course' | 'blog' }>`
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

  ${CardContainer}:hover & {
    color: ${({ $type }) => {
      switch ($type) {
        case 'event':
          return theme.colors.primary[600];
        case 'course':
          return theme.colors.green[600];
        case 'blog':
          return '#ea580c';
        default:
          return theme.colors.primary[600];
      }
    }};
  }
`;

export const CardDescription = styled.p`
  color: ${theme.colors.gray[600]};
  font-size: ${theme.fontSizes.sm};
  line-height: ${theme.lineHeights.relaxed};
  margin-bottom: ${theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ActionButton = styled.button<{ $type: 'event' | 'course' | 'blog'; $disabled: boolean }>`
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
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s ease;
  
  ${({ $disabled, $type }) => {
    if ($disabled) {
      return `
        background: ${theme.colors.gray[100]};
        color: ${theme.colors.gray[400]};
      `;
    }
    
    const gradient = (() => {
      switch ($type) {
        case 'event':
          return `linear-gradient(135deg, ${theme.colors.purple[500]}, ${theme.colors.primary[500]})`;
        case 'course':
          return `linear-gradient(135deg, ${theme.colors.green[500]}, #0d9488)`;
        case 'blog':
          return `linear-gradient(135deg, #ea580c, ${theme.colors.red[500]})`;
        default:
          return `linear-gradient(135deg, ${theme.colors.purple[500]}, ${theme.colors.primary[500]})`;
      }
    })();
    
    return `
      background: ${gradient};
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