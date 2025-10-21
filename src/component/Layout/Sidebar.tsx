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
  Settings
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
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

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} flex flex-col h-screen`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!isCollapsed && (
          <h2 className="text-xl font-bold text-white">Thartius</h2>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
            <span className="text-white text-sm font-bold">T</span>
          </div>
        )}
      </div>

      {/* Navigation Header */}
      {!isCollapsed && (
        <div className="px-4 pt-6 pb-2">
          <h2 className="text-xs font-semibold text-gray-400  tracking-wider">
            Navigation
          </h2>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = item.active;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 transition-colors group relative ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <IconComponent 
                size={20} 
                className="flex-shrink-0"
              />
              {!isCollapsed && (
                <span className="ml-3 font-medium text-sm">{item.name}</span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-gray-700">
                  {item.name}
                </div>
              )}
              
              {/* Active indicator dot for collapsed state */}
              {isCollapsed && isActive && (
                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-l"></div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section - Admin icon removed, only showing in collapsed state if needed */}
      {isCollapsed && (
        <div className="p-4 border-t border-gray-700 flex justify-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">T</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;