import { css } from 'styled-components';

export const adminNavbarStyles = {
  container: css`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 1rem 0;
    margin: 0;
    width: 100%;
    
    @media (max-width: 768px) {
      padding: 0.75rem 0;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100vw;
    }
  `,

  content: css`
    width: 100%;
    max-width: 100%;
    margin: 0;
    padding: 0 2rem;
    
    @media (max-width: 768px) {
      padding: 0 1rem;
    }
    
    @media (max-width: 480px) {
      padding: 0 0.75rem;
    }
  `,

  header: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 1.5rem 0;
    width: 100%;
    
    @media (max-width: 768px) {
      margin: 0 0 1rem 0;
      flex-direction: column;
      gap: 1rem;
    }
  `,

  title: css`
    color: white;
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    letter-spacing: -0.025em;
    
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
    
    @media (max-width: 480px) {
      font-size: 1.25rem;
    }
  `,

  navigation: css`
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    margin: 0;
    
    @media (max-width: 768px) {
      gap: 0.25rem;
      width: 100%;
      overflow-x: auto;
      justify-content: flex-start;
      padding-bottom: 0.5rem;
      
      /* Hide scrollbar but keep functionality */
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    
    @media (max-width: 480px) {
      gap: 0.125rem;
    }
  `,

  navItem: css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    margin: 0;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    
    /* Hover effect */
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.3);
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    /* Focus effect for accessibility */
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
    }
    
    @media (max-width: 768px) {
      padding: 0.625rem 1rem;
      font-size: 0.85rem;
      min-width: fit-content;
    }
    
    @media (max-width: 480px) {
      padding: 0.5rem 0.75rem;
      font-size: 0.8rem;
      gap: 0.375rem;
    }
  `,

  navItemActive: css`
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
    color: white;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    margin: 0;
    
    /* Active state shimmer effect */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      animation: shimmer 2s infinite;
    }
    
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }
  `,

  navIcon: css`
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    margin: 0;
    
    @media (max-width: 480px) {
      font-size: 1rem;
    }
  `,

  navLabel: css`
    font-weight: 500;
    margin: 0;
    
    @media (max-width: 480px) {
      display: none; /* Hide labels on very small screens, show only icons */
    }
  `,

  // Responsive utilities
  mobileOnly: css`
    display: none;
    
    @media (max-width: 768px) {
      display: block;
    }
  `,

  desktopOnly: css`
    display: block;
    
    @media (max-width: 768px) {
      display: none;
    }
  `,

  // Loading state
  navItemLoading: css`
    opacity: 0.6;
    pointer-events: none;
    margin: 0;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0.75rem;
      width: 12px;
      height: 12px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      transform: translateY(-50%);
    }
    
    @keyframes spin {
      0% { transform: translateY(-50%) rotate(0deg); }
      100% { transform: translateY(-50%) rotate(360deg); }
    }
  `,

  // Badge for notifications (optional)
  navBadge: css`
    position: absolute;
    top: -4px;
    right: -4px;
    background: #ff4757;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border: 2px solid white;
    margin: 0;
    
    @media (max-width: 480px) {
      width: 16px;
      height: 16px;
      font-size: 0.65rem;
      top: -2px;
      right: -2px;
    }
  `
};

// Alternative styling for dark theme
export const adminNavbarDarkStyles = {
  ...adminNavbarStyles,
  
  container: css`
    ${adminNavbarStyles.container}
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    margin: 0;
    width: 100%;
  `,
  
  title: css`
    ${adminNavbarStyles.title}
    color: #f8f9fa;
    margin: 0;
  `,
  
  navItem: css`
    ${adminNavbarStyles.navItem}
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
      color: #f8f9fa;
    }
  `,
  
  navItemActive: css`
    ${adminNavbarStyles.navItemActive}
    background: rgba(103, 126, 234, 0.2);
    border-color: rgba(103, 126, 234, 0.4);
    color: #f8f9fa;
    margin: 0;
  `
};

// Utility function to combine styles
export const getNavItemStyles = (isActive: boolean, isLoading?: boolean, theme: 'light' | 'dark' = 'light') => {
  const styles = theme === 'dark' ? adminNavbarDarkStyles : adminNavbarStyles;
  
  let combinedStyles = styles.navItem;
  
  if (isActive) {
    combinedStyles = css`${combinedStyles} ${styles.navItemActive}`;
  }
  
  if (isLoading) {
    combinedStyles = css`${combinedStyles} ${styles.navItemLoading}`;
  }
  
  return combinedStyles;
};

// Additional utility styles for full-width layout
export const fullWidthContainerStyles = css`
  width: 100vw;
  margin: 0;
  padding: 0;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;

// Body styles to ensure no margin/padding interference
export const bodyResetStyles = css`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  * {
    box-sizing: border-box;
  }
  
  html {
    margin: 0;
    padding: 0;
  }
`;