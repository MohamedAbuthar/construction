'use client';
import React, { useState } from 'react';
import { RefreshCw, X } from 'lucide-react';

const Settings = () => {
  const [isResetting, setIsResetting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleResetDemoData = () => {
    setIsResetting(true);
    
    // Clear all state/data - simulate reset
    setTimeout(() => {
      // Reset any demo data here
      // In a real app, this would clear localStorage, reset state, etc.
      setIsResetting(false);
      setShowToast(true);
      
      // Auto hide toast after 5 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }, 1000);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-1xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Settings</h1>
          <p className="text-sm text-gray-500">Manage your application settings</p>
        </div>

        {/* Demo Data Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Demo Data</h2>
          <p className="text-sm text-gray-500 mb-6">
            Reset all demo data to its initial state. This will clear all changes you&apos;ve made.
          </p>
          
          <button
            onClick={handleResetDemoData}
            disabled={isResetting}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:text-white bg-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto justify-center"
          >
            <RefreshCw className={`w-4 h-4 ${isResetting ? 'animate-spin' : ''}`} />
            {isResetting ? 'Resetting...' : 'Reset Demo Data'}
          </button>
        </div>

        {/* About Thartius Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">About Thartius</h2>
          <p className="text-sm text-gray-500 mb-6">Construction project management system</p>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start">
              <span className="text-sm font-semibold text-gray-900 sm:min-w-[100px]">Version:</span>
              <span className="text-sm text-gray-700 sm:ml-2">1.0.0 (Demo)</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-start">
              <span className="text-sm font-semibold text-gray-900 sm:min-w-[100px] mb-1 sm:mb-0">Features:</span>
              <span className="text-sm text-gray-700 sm:ml-2">
                Project Management, EVM Tracking, Site Reporting, Procurement, Fund Approvals
              </span>
            </div>
            
            <p className="text-sm text-gray-500 pt-1">
              This is a demo application with mock data and client-side state management. All data resets on page reload unless using localStorage persistence.
            </p>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Demo data reset successfully!</p>
                <p className="text-sm text-gray-500 mt-1">All data has been reset to its initial state.</p>
              </div>
              <button
                onClick={closeToast}
                className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;