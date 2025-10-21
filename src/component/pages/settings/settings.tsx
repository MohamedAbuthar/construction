'use client';
import React, { use, useState } from 'react';
import { RefreshCw } from 'lucide-react';

const Settings = () => {
  const [isResetting, setIsResetting] = useState(false);

  const handleResetDemoData = () => {
    setIsResetting(true);
    
    // Clear all state/data - simulate reset
    setTimeout(() => {
      // Reset any demo data here
      // In a real app, this would clear localStorage, reset state, etc.
      alert('Demo data has been reset to its initial state!');
      setIsResetting(false);
      
      // Optional: Reload the page to reset all state
      // window.location.reload();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Settings</h1>
          <p className="text-sm text-gray-500">Manage your application settings</p>
        </div>

        {/* Demo Data Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Demo Data</h2>
          <p className="text-sm text-gray-500 mb-6">
            Reset all demo data to its initial state. This will clear all changes you've made.
          </p>
          
          <button
            onClick={handleResetDemoData}
            disabled={isResetting}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
            {isResetting ? 'Resetting...' : 'Reset Demo Data'}
          </button>
        </div>

        {/* About Thartius Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">About Thartius</h2>
          <p className="text-sm text-gray-500 mb-6">Construction project management system</p>
          
          <div className="space-y-4">
            <div>
              <span className="text-sm font-semibold text-gray-900">Version:</span>
              <span className="text-sm text-gray-700 ml-2">1.0.0 (Demo)</span>
            </div>
            
            <div>
              <span className="text-sm font-semibold text-gray-900">Features:</span>
              <span className="text-sm text-gray-700 ml-2">
                Project Management, EVM Tracking, Site Reporting, Procurement, Fund Approvals
              </span>
            </div>
            
            <p className="text-sm text-gray-500 pt-1">
              This is a demo application with mock data and client-side state management. All data resets on page reload unless using localStorage persistence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;