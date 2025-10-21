// component/dashboard/dashboard.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, Folder, Clock, DollarSign, AlertCircle, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [userRole, setUserRole] = useState('Admin');

  useEffect(() => {
    // Get user role from localStorage or context (you can replace this with your actual auth logic)
    const storedRole = localStorage.getItem('userRole') || 'Admin';
    setUserRole(storedRole);
  }, []);

  const getWelcomeMessage = () => {
    switch (userRole) {
      case 'Site Engineer':
        return 'Welcome back, Site Engineer';
      case 'Finance Manager':
        return 'Welcome back, Finance Manager';
      default:
        return 'Welcome back, Admin User';
    }
  };

  return (
    <div className="space-y-6 ml-8">
      {/* Welcome Message and Stats Cards in single div */}
      <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
        {/* Welcome Message */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {getWelcomeMessage()}
          </h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your projects today</p>
        </div>

        {/* Stats Cards Section with Light Grey Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Active Projects</h3>
              <Folder className="text-gray-400" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">2</p>
            <p className="text-sm text-gray-500 mt-1">2 total projects</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Pending Approvals</h3>
              <AlertCircle className="text-gray-400" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">1</p>
            <p className="text-sm text-gray-500 mt-1">Requires your attention</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Total Value</h3>
              <DollarSign className="text-gray-400" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">$8,50,00,000</p>
            <p className="text-sm text-gray-500 mt-1">Across all projects</p>
          </div>
        </div>
      </div>

      {/* Both Tables in Single Div with Light Grey Border */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-6">
        
        {/* Recent Projects Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Recent Projects</h2>
              <Link 
                href="/projects"
                className="flex items-center bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors"
              >
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <p className="text-gray-600 text-sm mt-1">Your active construction projects</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">Metro Station Construction - Phase 2</div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>26.6139, 77.2000</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>Due: 12/31/2025</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="bg-white border border-gray-300 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                          In Progress
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-bold text-gray-900">₹5,00,00,000</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">Residential Complex - Tower A</div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>28.5355, 77.3910</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>Due: 6/30/2025</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="bg-white border border-gray-300 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                          In Progress
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-bold text-gray-900">₹3,50,00,000</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Fund Requests Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Pending Fund Requests</h2>
              <Link 
                href="/approvals"
                className="flex items-center bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors"
              >
                Review All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <p className="text-gray-600 text-sm mt-1">Requests awaiting your approval</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900">₹2,00,000</div>
                    <div className="flex items-center space-x-1 mt-1 text-sm text-gray-500">
                      <Calendar size={14} />
                      <span>Week of 10/13/2025</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      <Clock size={14} className="mr-1" />
                      Under Review
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="font-bold text-gray-900">₹1,50,000</div>
                    <div className="flex items-center space-x-1 mt-1 text-sm text-gray-500">
                      <Calendar size={14} />
                      <span>Week of 10/20/2025</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      <Clock size={14} className="mr-1" />
                      Under Review
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}