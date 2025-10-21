// components/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Folder, 
  BarChart3, 
  ShoppingCart, 
  CheckSquare, 
  TrendingUp, 
  Users,
  Settings,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen?: boolean;
  onMobileToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  onToggle, 
  isMobileOpen = false, 
  onMobileToggle 
}) => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/Dashboard', active: false },
    { name: 'Projects', icon: Folder, href: '/projects', active: false },
    { name: 'Gantt Chart', icon: BarChart3, href: '/ganttchart', active: false },
    { name: 'Procurement', icon: ShoppingCart, href: '/procurement', active: false },
    { name: 'Approvals', icon: CheckSquare, href: '/approval', active: false },
    { name: 'EVM Dashboard', icon: TrendingUp, href: '/evmdashboard', active: false },
    { name: 'Users', icon: Users, href: '/users', active: false },
    { name: 'Settings', icon: Settings, href: '/settings', active: false },
  ];

  // Mobile overlay and sidebar container
  const sidebarContent = (
    <div className={`bg-gray-900 text-white transition-all duration-300 flex flex-col h-full
      ${isCollapsed ? 'w-16' : 'w-58'} // Reduced width from w-16/w-64 to w-14/w-52
      ${onMobileToggle ? 'fixed md:relative z-50' : 'relative'}
      ${onMobileToggle && !isMobileOpen ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
    `}>
      {/* Header with toggle button */}
      <div className="p-3 flex items-center justify-between border-b border-gray-700"> {/* Reduced padding */}
        <div className="flex items-center flex-1">
          {!isCollapsed && (
            <h2 className="text-lg font-bold text-white">Thartius</h2>
          )}
          {isCollapsed && (
            <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center mx-auto"> {/* Smaller circle */}
              <span className="text-white text-xs font-bold">T</span> {/* Smaller text */}
            </div>
          )}
        </div>
        
        {/* Toggle buttons */}
        <div className="flex items-center space-x-1"> {/* Reduced space */}
          {/* Desktop toggle */}
          {!onMobileToggle && (
            <button
              onClick={onToggle}
              className="p-1 rounded-md hover:bg-gray-800 transition-colors md:block hidden"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <Menu size={16} /> {/* Smaller icon */}
            </button>
          )}
          
          {/* Mobile close button */}
          {onMobileToggle && (
            <button
              onClick={onMobileToggle}
              className="p-1 rounded-md hover:bg-gray-800 transition-colors md:hidden"
              aria-label="Close sidebar"
            >
              <X size={16} /> {/* Smaller icon */}
            </button>
          )}
        </div>
      </div>

      {/* Navigation Header */}
      {!isCollapsed && (
        <div className="px-3 pt-4 pb-1"> {/* Reduced padding */}
          <h2 className="text-xs font-semibold text-gray-400 tracking-wider">
            Navigation
          </h2>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = item.active;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 transition-colors group relative // Reduced padding
                ${isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                } 
                ${isCollapsed ? 'justify-center' : ''}
                ${onMobileToggle ? 'text-sm' : 'text-xs'} // Smaller text
              `}
              onClick={onMobileToggle} // Close mobile sidebar on link click
            >
              <IconComponent 
                size={onMobileToggle ? 20 : 16} // Smaller icons
                className="flex-shrink-0"
              />
              {!isCollapsed && (
                <span className={`ml-2 font-medium ${onMobileToggle ? 'text-sm' : 'text-xs'}`}> {/* Reduced margin, smaller text */}
                  {item.name}
                </span>
              )}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-gray-700 pointer-events-none">
                  {item.name}
                </div>
              )}
              
              {/* Active indicator dot for collapsed state */}
              {isCollapsed && isActive && (
               <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-white rounded-l"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      {isCollapsed && (
        <div className="p-3 border-t border-gray-700 flex justify-center"> {/* Reduced padding */}
          <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center"> {/* Smaller circle */}
            <span className="text-white text-xs font-medium">T</span> {/* Smaller text */}
          </div>
        </div>
      )}
    </div>
  );

  // If it's a mobile sidebar, wrap with overlay
  if (onMobileToggle) {
    return (
      <>
        {/* Mobile overlay */}
        {isMobileOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={onMobileToggle}
          />
        )}
        
        {sidebarContent}
      </>
    );
  }

  return sidebarContent;
};

export default Sidebar;