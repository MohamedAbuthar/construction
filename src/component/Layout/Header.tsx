// components/Header.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Shield, Menu, X } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userRoles = [
    { id: 1, name: 'Admin', value: 'admin' },
    { id: 2, name: 'Finance Manager', value: 'finance_manager' },
    { id: 3, name: 'Site Engineer', value: 'site_engineer' }
  ];

  const [selectedRole, setSelectedRole] = useState(userRoles[0]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRoleSelect = (role: typeof userRoles[0]) => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
    console.log('Selected role:', role.name);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Sidebar Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        <div className="flex items-center space-x-4">
          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center">
                <Shield size={16} className="text-gray-600" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-gray-700 font-medium">{selectedRole.name}</span>
                <ChevronDown 
                  size={16} 
                  className={`text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {userRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleRoleSelect(role)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      selectedRole.id === role.id
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {role.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;