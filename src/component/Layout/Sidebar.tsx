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
  Settings
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean; // Controlled by header
  isMobileOpen?: boolean;
  onMobileToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  isMobileOpen = false, 
  onMobileToggle 
}) => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/Dashboard' },
    { name: 'Projects', icon: Folder, href: '/projects' },
    { name: 'Gantt Chart', icon: BarChart3, href: '/ganttchart' },
    { name: 'Procurement', icon: ShoppingCart, href: '/procurement' },
    { name: 'Approvals', icon: CheckSquare, href: '/approval' },
    { name: 'EVM Dashboard', icon: TrendingUp, href: '/evmdashboard' },
    { name: 'Users', icon: Users, href: '/users' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  const sidebarContent = (
    <div
      className={`bg-gray-900 text-white transition-all duration-300 flex flex-col h-full
        ${isCollapsed ? 'w-16' : 'w-60'}
        ${onMobileToggle ? 'fixed md:relative z-50' : 'relative'}
        ${onMobileToggle && !isMobileOpen ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
      `}
    >
      {/* Header */}
      <div className="p-3 flex items-center border-b border-gray-700">
        <div className="flex items-center justify-left flex-1">
          {!isCollapsed ? (
            <h2 className="text-lg font-bold text-white">Thartius</h2>
          ) : (
            <div
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white"
            >
              <span className="text-xs font-bold">T</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Header */}
      {!isCollapsed && (
        <div className="px-3 pt-4 pb-1">
          <h2 className="text-xs font-semibold text-gray-400 tracking-wider">Navigation</h2>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const IconComponent = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors
                ${isCollapsed ? 'justify-center' : ''}
              `}
              onClick={onMobileToggle}
            >
              <IconComponent size={18} className="flex-shrink-0" />
              {!isCollapsed && (
                <span className="ml-2 text-sm font-medium">{item.name}</span>
              )}

              {/* Tooltip when collapsed */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  // Mobile view overlay
  if (onMobileToggle) {
    return (
      <>
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
