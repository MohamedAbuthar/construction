// components/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Building2, 
  CheckCircle, 
  DollarSign, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Projects', icon: Building2, href: '/projects' },
    { name: 'Approvals', icon: CheckCircle, href: '/approvals' },
    { name: 'Finances', icon: DollarSign, href: '/finances' },
    { name: 'Reports', icon: BarChart3, href: '/reports' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} flex flex-col`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        {!isCollapsed && (
          <h2 className="text-xl font-bold text-white">ConstructionPro</h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors group"
            >
              <IconComponent 
                size={20} 
                className="flex-shrink-0"
              />
              {!isCollapsed && (
                <span className="ml-3 font-medium">{item.name}</span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-700">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold text-sm text-gray-400 mb-3 flex items-center">
              <Bell size={16} className="mr-2" />
              Quick Stats
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300">Active Projects</span>
                <span className="font-semibold text-white">2</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300">Pending Approvals</span>
                <span className="font-semibold text-yellow-400">1</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300">Total Value</span>
                <span className="font-semibold text-green-400">$8.5B</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;