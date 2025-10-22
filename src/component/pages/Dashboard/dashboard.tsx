// component/dashboard/dashboard.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, Folder, Clock, DollarSign, AlertCircle, MapPin, Calendar } from 'lucide-react';

interface DashboardProps {
  userRole?: string;
}

export default function DashboardPage({ userRole = 'Admin' }: DashboardProps) {
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
    <div className="space-y-6 lg:space-y-8 mx-4 sm:mx-6 md:mx-8 lg:mx-16 xl:mx-40 my-4 sm:my-6 lg:my-8">
      {/* Welcome Message as normal text without border */}
      <div className="mt-2 sm:mt-4">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
          {getWelcomeMessage()}
        </h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
          Here&apos;s what&apos;s happening with your projects today
        </p>
      </div>

      {/* Stats Cards Section without border */}
      <div className="space-y-4 lg:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700">Active Projects</h3>
              <Folder className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">2</p>
            <p className="text-sm text-gray-500 mt-1">2 total projects</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700">Pending Approvals</h3>
              <AlertCircle className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">1</p>
            <p className="text-sm text-gray-500 mt-1">Requires your attention</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700">Total Value</h3>
              <DollarSign className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">$8,50,00,000</p>
            <p className="text-sm text-gray-500 mt-1">Across all projects</p>
          </div>
        </div>
      </div>

      {/* Tables with grey bordered rows */}
      <div className="space-y-4 lg:space-y-6">
        
        {/* Recent Projects Table with hover effect */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Recent Projects</h2>
                <p className="text-gray-600 text-sm mt-1">Your active construction projects</p>
              </div>
              <Link 
                href="/projects"
                className="flex items-center justify-center bg-white text-gray-800 border border-gray-300 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors w-full sm:w-auto"
              >
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50/50 hover:bg-blue-100 transition-colors">
                  <td className="py-3 sm:py-4 px-4 sm:px-6">
                    <div className="font-medium text-gray-900 text-sm sm:text-base">Metro Station Construction - Phase 2</div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">26.6139, 77.2000</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">Due: 12/31/2025</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="bg-white border border-gray-300 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                          In Progress
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-right">
                    <span className="font-bold text-gray-900 text-sm sm:text-base">₹5,00,00,000</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50/50 hover:bg-blue-100 transition-colors">
                  <td className="py-3 sm:py-4 px-4 sm:px-6">
                    <div className="font-medium text-gray-900 text-sm sm:text-base">Residential Complex - Tower A</div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">28.5355, 77.3910</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">Due: 6/30/2025</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="bg-white border border-gray-300 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                          In Progress
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-right">
                    <span className="font-bold text-gray-900 text-sm sm:text-base">₹3,50,00,000</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Fund Requests Table without hover effect */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Pending Fund Requests</h2>
                <p className="text-gray-600 text-sm mt-1">Requests awaiting your approval</p>
              </div>
              <Link 
                href="/approval"
                className="flex items-center justify-center bg-white text-gray-800 border border-gray-300 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors w-full sm:w-auto"
              >
                Review All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <td className="py-3 sm:py-4 px-4 sm:px-6">
                    <div className="font-bold text-gray-900 text-sm sm:text-base">₹2,00,000</div>
                    <div className="flex items-center space-x-1 mt-1 text-sm text-gray-500">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">Week of 10/13/2025</span>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-right">
                    <span className="inline-flex items-center bg-yellow-100 text-yellow-800 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Under Review
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <td className="py-3 sm:py-4 px-4 sm:px-6">
                    <div className="font-bold text-gray-900 text-sm sm:text-base">₹1,50,000</div>
                    <div className="flex items-center space-x-1 mt-1 text-sm text-gray-500">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">Week of 10/20/2025</span>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-4 sm:px-6 text-right">
                    <span className="inline-flex items-center bg-yellow-100 text-yellow-800 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
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