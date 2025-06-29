import styled from 'styled-components';
import { theme } from 'styles/theme'; // Assuming 'styles/theme' is accessible

export const DetailsContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gray[50]};
`;

export const Header = styled.div`
  background: white;
  box-shadow: ${theme.shadows.sm};
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

export const HeaderContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: ${theme.spacing.md} ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing.md} ${theme.spacing.lg};
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing.md} ${theme.spacing['2xl']};
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.gray[600]};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.gray[900]};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const MainContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: ${theme.spacing['2xl']} ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.sm}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing.lg};
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing['2xl']} ${theme.spacing['2xl']};
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing['2xl']};

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 2fr 1fr; /* Main content and sidebar */
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing['2xl']};
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

export const HeroImageContainer = styled.div`
  position: relative;
  border-radius: ${theme.borderRadius['2xl']};
  overflow: hidden;
  box-shadow: ${theme.shadows.md}; /* Added for better visual */

  img {
    width: 100%;
    height: 16rem; /* Standard height for hero image */
    object-fit: cover;

    @media (min-width: ${theme.breakpoints.sm}) {
      height: 20rem;
    }
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
  }
`;

export const HeroContent = styled.div`
  position: absolute;
  bottom: ${theme.spacing.lg};
  left: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  z-index: 10;
`;

export const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
`;

export const CategoryBadge = styled.span`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.semibold};
  color: white;
  background: ${theme.colors.orange[500]}; /* A default color for blog categories */
`;


export const HeroTitle = styled.h1`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  color: white;

  @media (min-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

export const InfoCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray[100]};
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.gray[900]};
  margin-bottom: ${theme.spacing.md};
`;

export const DescriptionText = styled.div`
  p {
    color: ${theme.colors.gray[700]};
    line-height: ${theme.lineHeights.relaxed};
    margin-bottom: ${theme.spacing.md};

    &:last-child {
      margin-bottom: 0;
    }
  }

  h2, h3, h4, h5, h6 {
    color: ${theme.colors.gray[900]};
    margin-top: ${theme.spacing.xl};
    margin-bottom: ${theme.spacing.md};
  }

  ul, ol {
    margin-bottom: ${theme.spacing.md};
    padding-left: ${theme.spacing.xl};
  }

  li {
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.gray[700]};
  }
`;

export const SidebarCard = styled.div`
  background: white;
  border-radius: ${theme.borderRadius['2xl']};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.gray[100]};
  position: sticky;
  top: ${theme.spacing.lg}; /* Keeps sidebar sticky */
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
  justify-content: center; /* Center buttons in sidebar */
`;

export const SecondaryButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.xl};
  background: white;
  color: ${theme.colors.gray[700]};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray[50]};
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};

  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); /* Adjusted for fewer items */
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column; /* Stack icon and text */
  align-items: center;
  gap: ${theme.spacing.sm};
  text-align: center;
`;

export const InfoIcon = styled.div<{ $color: string }>`
  padding: ${theme.spacing.sm};
  background: ${({ $color }) => $color};
  border-radius: ${theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${({ $color }) => {
      // Adjusted colors to be more neutral/blog-friendly
      if ($color.includes('blue')) return theme.colors.blue[600];
      if ($color.includes('green')) return theme.colors.green[600];
      if ($color.includes('purple')) return theme.colors.purple[600];
      return theme.colors.gray[600]; // Default if no match
    }};
  }
`;

export const InfoDetails = styled.div`
  p:first-child {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.gray[500]};
    margin: 0;
  }

  p:last-child {
    font-weight: ${theme.fontWeights.semibold};
    margin: 0;
    color: ${theme.colors.gray[800]};
  }
`;

export const RelatedPostsSection = styled.div`
  margin-top: ${theme.spacing['2xl']};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray[200]};

  h3 {
    font-weight: ${theme.fontWeights.semibold};
    color: ${theme.colors.gray[900]};
    margin-bottom: ${theme.spacing.md};
    text-align: center;
  }
`;

export const RelatedPostsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const RelatedPostCard = styled.div`
  background: ${theme.colors.gray[50]};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.gray[100]};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray[100]};
    box-shadow: ${theme.shadows.sm};
  }

  h4 {
    font-weight: ${theme.fontWeights.medium};
    color: ${theme.colors.gray[900]};
    margin: 0;
    font-size: ${theme.fontSizes.md};
  }

  p {
    font-size: ${theme.fontSizes.sm};
    color: ${theme.colors.gray[600]};
    margin: 0;
  }
`;

export const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.gray[200]};
`;

export const AuthorAvatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: ${theme.borderRadius.full};
  object-fit: cover;
`;

export const AuthorInfo = styled.div`
  h3 {
    font-weight: ${theme.fontWeights.semibold};
    color: ${theme.colors.gray[900]};
    font-size: ${theme.fontSizes.lg};
    margin: 0 0 ${theme.spacing.xs} 0;
  }

  p {
    color: ${theme.colors.gray[600]};
    margin: ${theme.spacing.xs} 0;
    font-size: ${theme.fontSizes.sm};
  }
`;
