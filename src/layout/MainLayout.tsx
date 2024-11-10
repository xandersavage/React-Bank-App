import React from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { HeaderSimple } from '../components/Header/HeaderSimple'; // Header component
import { NavbarSimpleColored } from '../components/Navigation/NavbarSimpleColored'; // Sidebar component

// Prop types for Main Layout
type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const smallScreen = useMediaQuery('(max-width: 768px)'); // Mobile devices
  const largeScreen = useMediaQuery('(min-width: 769px)'); // Tablet and up

  return (
    <div
      style={{ display: 'flex', flexDirection: smallScreen ? 'column' : 'row', height: '100vh' }}
    >
      {/* Show Header on small screens */}
      {smallScreen && <HeaderSimple />}

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Show Sidebar on larger screens */}
        {largeScreen && <NavbarSimpleColored style={{ flex: '0 0 250px' }} />}{' '}
        {/* Fixed width for sidebar */}
        {/* Content area that takes the remaining space */}
        <div style={{ flexGrow: 1, padding: '1rem', overflowY: 'auto' }}>{children}</div>
      </div>
    </div>
  );
};
