import styled from 'styled-components';
import { theme } from 'styles/theme';

export const CarouselContainer = styled.div`
  position: relative;
`;

export const NavigationButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  ${({ $position }) => ($position === 'left' ? 'left: 1rem;' : 'right: 1rem;')}
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  padding: ${theme.spacing.sm};
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border-radius: ${theme.borderRadius.full};
  border: none;
  box-shadow: ${theme.shadows.lg};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${theme.colors.gray[700]};
  }
`;

export const CarouselWrapper = styled.div`
  overflow: hidden;
`;

export const CarouselTrack = styled.div<{ $translateX: number; $itemWidth: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  /* THIS IS THE CRUCIAL LINE, it uses both $translateX and $itemWidth */
  transform: translateX(-${({ $translateX, $itemWidth }) => ($translateX * 100) / $itemWidth}%);
  width: ${({ $itemWidth }) => $itemWidth}%;
`;

export const CarouselSlide = styled.div<{ $width: number }>`
  padding: 0 ${theme.spacing.sm};
  width: ${({ $width }) => $width}%;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${theme.spacing.lg};
  gap: ${theme.spacing.sm};
`;

export const PaginationDot = styled.button<{ $active: boolean }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: ${theme.borderRadius.full};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ $active }) => ($active ? theme.colors.primary[600] : theme.colors.gray[300])};
  transform: ${({ $active }) => ($active ? 'scale(1.25)' : 'scale(1)')};

  &:hover {
    background: ${({ $active }) => ($active ? theme.colors.primary[600] : theme.colors.gray[400])};
  }
`;