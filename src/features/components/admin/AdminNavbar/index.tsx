import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { adminNavbarStyles, getNavItemStyles } from './styles.component';

interface AdminNavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  theme?: 'light' | 'dark';
  loading?: boolean;
  badges?: Record<string, number>; // For showing notification badges
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

// Styled components
const Container = styled.nav`
  ${adminNavbarStyles.container}
`;

const Content = styled.div`
  ${adminNavbarStyles.content}
`;

const Header = styled.div`
  ${adminNavbarStyles.header}
`;

const Title = styled.h1`
  ${adminNavbarStyles.title}
`;

const Navigation = styled.div`
  ${adminNavbarStyles.navigation}
`;

const NavItemButton = styled.button<{ $isActive: boolean; $isLoading?: boolean }>`
  ${({ $isActive, $isLoading }) => getNavItemStyles($isActive, $isLoading)}
  border: none;
  position: relative;
`;

const NavIcon = styled.span`
  ${adminNavbarStyles.navIcon}
`;

const NavLabel = styled.span`
  ${adminNavbarStyles.navLabel}
`;

const NavBadge = styled.span`
  ${adminNavbarStyles.navBadge}
`;

// Mobile menu toggle for very small screens
const MobileMenuToggle = styled.button`
  ${adminNavbarStyles.mobileOnly}
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const MobileNavigation = styled.div<{ $isOpen: boolean }>`
  @media (max-width: 480px) {
    display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ 
  activeTab, 
  onTabChange, 
  theme = 'light',
  loading = false,
  badges = {}
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'blogs', label: 'Blogs', icon: '✍️' }, 
    { id: 'certificates', label: 'Certificates', icon: '🏅' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const handleTabChange = (tabId: string) => {
    onTabChange(tabId);
    // Close mobile menu after selection
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = activeTab === item.id;
    const badgeCount = badges[item.id];
    
    return (
      <NavItemButton
        key={item.id}
        $isActive={isActive}
        $isLoading={loading}
        onClick={() => handleTabChange(item.id)}
        aria-label={`Maps to ${item.label}`}
        aria-current={isActive ? 'page' : undefined}
      >
        <NavIcon role="img" aria-label={item.label}>
          {item.icon}
        </NavIcon>
        <NavLabel>{item.label}</NavLabel>
        {badgeCount && badgeCount > 0 && (
          <NavBadge aria-label={`${badgeCount} notifications`}>
            {badgeCount > 99 ? '99+' : badgeCount}
          </NavBadge>
        )}
      </NavItemButton>
    );
  };

  return (
    <Container role="navigation" aria-label="Admin navigation">
      <Content>
        <Header>
          <Title>Admin Panel</Title>
          
          {/* Mobile menu toggle - only show on very small screens */}
          {isMobile && (
            <MobileMenuToggle
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </MobileMenuToggle>
          )}
        </Header>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Navigation role="menubar">
            {navItems.map(renderNavItem)}
          </Navigation>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <MobileNavigation $isOpen={isMobileMenuOpen} role="menubar">
            {navItems.map(renderNavItem)}
          </MobileNavigation>
        )}
      </Content>
    </Container>
  );
};

// Export additional utility components for advanced usage
export const AdminNavbarSkeleton: React.FC = () => (
  <Container>
    <Content>
      <Header>
        <Title style={{ opacity: 0.6 }}>Loading...</Title>
      </Header>
      <Navigation>
        {Array.from({ length: 6 }, (_, i) => (
          <NavItemButton key={i} $isActive={false} $isLoading={true}>
            <NavIcon>⏳</NavIcon>
            <NavLabel>Loading</NavLabel>
          </NavItemButton>
        ))}
      </Navigation>
    </Content>
  </Container>
);

// Hook for managing navbar state
export const useAdminNavbar = (initialTab: string = 'dashboard') => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(false);
  const [badges, setBadges] = useState<Record<string, number>>({});

  const handleTabChange = async (tab: string) => {
    setLoading(true);
    setActiveTab(tab);
    
    // Simulate loading delay (remove in production)
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setLoading(false);
  };

  const updateBadge = (tabId: string, count: number) => {
    setBadges(prev => ({
      ...prev,
      [tabId]: count
    }));
  };

  const clearBadge = (tabId: string) => {
    setBadges(prev => {
      const updated = { ...prev };
      delete updated[tabId];
      return updated;
    });
  };

  return {
    activeTab,
    loading,
    badges,
    handleTabChange,
    updateBadge,
    clearBadge
  };
};