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
  // --- START: Added for consistent button position and card height ---
  display: flex;
  flex-direction: column;
  height: 100%; // Ensure card takes full height of the grid cell
  // --- END: Added for consistent button position and card height ---

  &:hover {
    box-shadow: ${theme.shadows['2xl']};
    transform: translateY(-0.5rem);
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  // --- START: Added for fixed image height and ensuring aspect ratio handling ---
  width: 100%; // Ensure image container takes full width
  /* You can set a fixed height here, or use padding-bottom for aspect ratio */
  /* For example, for a 16:9 aspect ratio: */
  /* padding-bottom: 56.25%; */
  /* For a fixed height as previously seen in Card component: */
  height: 12rem; // Already set, confirming this fixed height
  // --- END: Added for fixed image height ---


  img {
    width: 100%;
    height: 100%; // Image fills the ImageContainer's dimensions
    object-fit: cover; // Ensures image covers the area without distorting aspect ratio
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
        return `linear-gradient(135deg, #0d9488, ${theme.colors.gray[500]})`;
      default:
        return `linear-gradient(135deg, ${theme.colors.purple[500]}, ${theme.colors.primary[500]})`;
    }
  }};
  box-shadow: ${theme.shadows.lg};
`;

export const ContentContainer = styled.div`
  padding: ${theme.spacing.lg};
  // --- START: Added for consistent button position ---
  flex-grow: 1; // Allows content to take up available space, pushing button down
  display: flex; // Added for internal flex management if needed for description lines
  flex-direction: column; // Added for internal flex management if needed for description lines
  // --- END: Added for consistent button position ---
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
  -webkit-line-clamp: 3; // Already present for truncation
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
  margin-top: auto; /* Pushes the button to the bottom of the flex container */
  
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
