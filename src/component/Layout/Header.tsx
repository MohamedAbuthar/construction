// components/Header.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Shield, Menu, X } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleMobileSidebar: () => void;
  isSidebarOpen: boolean;
  userRole: string;
  onRoleChange: (role: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onToggleMobileSidebar,
  isSidebarOpen,
  userRole,
  onRoleChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userRoles = [
    { id: 1, name: 'Admin', value: 'admin' },
    { id: 2, name: 'Finance Manager', value: 'finance_manager' },
    { id: 3, name: 'Site Engineer', value: 'site_engineer' },
  ];

  const [selectedRole, setSelectedRole] = useState(
    userRoles.find(
      (role) => role.value === userRole.toLowerCase().replace(' ', '_')
    ) || userRoles[0]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSelect = (role: typeof userRoles[0]) => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
    onRoleChange(role.name);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 w-full h-14">
      <div className="grid grid-cols-[auto_1fr_auto] items-center px-4 md:px-6 h-full">
        {/* Left Section - Sidebar Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleMobileSidebar}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <button
            onClick={onToggleSidebar}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors hidden md:inline-flex items-center"
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Center - Empty for spacing */}
        <div></div>

        {/* Right Section - Role Selector */}
        <div className="flex items-center justify-end relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center space-x-2 px-3 py-1.5 border border-gray-300 bg-white shadow-sm transition-colors
              ${isDropdownOpen ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-blue-600 hover:text-white hover:border-blue-600'}
            `}
          >
            <Shield
              size={16}
              className={`${
                isDropdownOpen ? 'text-white' : 'text-gray-600 group-hover:text-white'
              }`}
            />
            <span className="font-medium text-sm">{selectedRole.name}</span>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-[calc(100%+0.5rem)] w-48 bg-white border border-gray-200 shadow-lg z-50">
              {userRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    selectedRole.id === role.id
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {role.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
