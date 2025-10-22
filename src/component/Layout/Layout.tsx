'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

interface WithUserRoleProps {
  userRole?: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState('Admin');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  const handleRoleChange = (role: string) => setUserRole(role);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar isCollapsed={!isSidebarOpen} />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sidebar 
          isCollapsed={false}
          isMobileOpen={isMobileSidebarOpen}
          onMobileToggle={toggleMobileSidebar}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onToggleSidebar={toggleSidebar}
          onToggleMobileSidebar={toggleMobileSidebar}
          isSidebarOpen={isSidebarOpen}
          userRole={userRole}
          onRoleChange={handleRoleChange}
        />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {React.Children.map(children, child =>
            React.isValidElement<WithUserRoleProps>(child)
              ? React.cloneElement(child, { userRole })
              : child
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
