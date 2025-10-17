// app/dashboard/page.tsx
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

export default function DashboardPage() {
  const recentProjects = [
    {
      id: 1,
      name: 'Metro Station Construction - Phase 2',
      status: 'In Progress',
      coordinates: '26.6139, 77.2000',
      dueDate: '12/31/2025',
      statusColor: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Residential Complex - Tower A',
      status: 'In Progress',
      coordinates: '28.5355, 77.3910',
      dueDate: '6/30/2025',
      statusColor: 'bg-blue-500'
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      project: 'Highway Expansion Project',
      amount: '$5,00,00,000',
      requestedBy: 'John Smith',
      date: '2 days ago'
    },
    {
      id: 2,
      project: 'Shopping Mall Construction',
      amount: '$3,50,00,000',
      requestedBy: 'Sarah Johnson',
      date: '1 day ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Projects Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Projects</h3>
              <p className="text-3xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-500 mt-1">2 total projects</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Pending Approvals Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Approvals</h3>
              <p className="text-3xl font-bold text-yellow-600">1</p>
              <p className="text-sm text-gray-500 mt-1">Requires your attention</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Total Value Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Value</h3>
              <p className="text-3xl font-bold text-green-600">$8,50,00,000</p>
              <p className="text-sm text-gray-500 mt-1">Across all projects</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Recent Projects</h2>
              <Link 
                href="/projects"
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                View All
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <p className="text-gray-600 text-sm mt-1">Your active construction projects</p>
          </div>
          
          <div className="p-6 space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">{project.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${project.statusColor}`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    {project.coordinates}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    Due: {project.dueDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Fund Requests Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Pending Fund Requests</h2>
              <Link 
                href="/approvals"
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Review All
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <p className="text-gray-600 text-sm mt-1">Requests awaiting your approval</p>
          </div>
          
          <div className="p-6">
            {pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-800">{request.project}</h3>
                      <span className="text-lg font-bold text-green-600">{request.amount}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Requested by: {request.requestedBy}</span>
                        <span>{request.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                        Approve
                      </button>
                      <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                </div>
                <p className="text-gray-500">No pending fund requests</p>
                <p className="text-gray-400 text-sm mt-1">All requests have been processed</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}