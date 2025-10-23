// components/pages/Projects/projects.tsx
'use client';

import AddProjectDialog from '@/component/pages/Projects/AddProjectDialog';
import AddActivityDialog from '@/component/pages/Projects/AddActivityDialog';
import { Search, Plus, MapPin, Calendar, Link2Icon, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);
  const router = useRouter();

  const projects = [
    {
      id: 1,
      name: 'Metro Station Construction - Phase 2',
      status: 'Ongoing',
      location: '28.6139, 77.2090',
      timeline: '1/1/2025 - 12/31/2025',
      value: '₹5,00,00,000',
    },
    {
      id: 2,
      name: 'Residential Complex - Tower A',
      status: 'Ongoing',
      location: '28.5355, 77.3910',
      timeline: '6/1/2024 - 6/30/2025',
      value: '₹3,50,00,000',
    },
  ];

  const handleProjectClick = (projectId: number) => {
    router.push(`/projects/view?id=${projectId}`);
  };

  return (
<div className="space-y-6 p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Projects</h1>
          <p className="text-gray-600 text-sm sm:text-base">Manage your construction projects</p>
        </div>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">New Project</span>
        </button>
      </div>

      {/* Combined Search Bar and Table with single border and internal spacing */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden">
        {/* Search Bar inside the same container */}
        <div className="p-4 sm:p-6 border-b border-gray-300">
          <div className="flex items-center justify-between w-full">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5"
              />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        {/* Table with spacing from the border */}
        <div className="overflow-x-auto p-4 sm:p-6 sm:pt-0">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-300 bg-gray-50">
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 text-sm sm:text-base">
                  Project Name
                </th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 text-sm sm:text-base">
                  Status
                </th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 text-sm sm:text-base">
                  Location
                </th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 text-sm sm:text-base">
                  Timeline
                </th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 text-sm sm:text-base">
                  Project Value
                </th>
                <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-gray-700 text-sm sm:text-base">
                  {/* Actions column header removed but column kept */}
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-gray-300 hover:bg-gray-50"
                >
                  <td className="py-3 sm:py-4 px-3 sm:px-6">
                    <div className="font-medium text-gray-900 text-sm sm:text-base">
                      {project.name}
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6">
                    <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-white border border-gray-300 text-gray-800">
                      {project.status}
                    </span>
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-600">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      <span className="text-xs sm:text-sm">{project.location}</span>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6 text-gray-600">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      <span className="text-xs sm:text-sm">{project.timeline}</span>
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6">
                    <span className="font-bold text-gray-900 text-sm sm:text-base">
                      {project.value}
                    </span>
                  </td>
                  <td className="py-3 sm:py-4 px-3 sm:px-6">
                    {/* ArrowRight icon for navigation */}
                    <button
                      onClick={() => handleProjectClick(project.id)}
                      className="inline-flex items-center p-1 sm:p-2 text-grey-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Project Details"
                    >
                      <ExternalLink 
                      className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Cards with grey border - Moved to bottom */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
  <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-4 sm:p-5 lg:p-6 min-w-0">
    <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
      Total Projects
    </h3>
    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">2</p>
  </div>
  <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-4 sm:p-5 lg:p-6 min-w-0">
    <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Ongoing</h3>
    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">2</p>
  </div>
  <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-4 sm:p-5 lg:p-6 min-w-0">
    <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Completed</h3>
    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">0</p>
  </div>
  <div className="bg-white rounded-lg shadow-sm border border-gray-300 p-4 sm:p-5 lg:p-6 min-w-0">
  <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">
    Total Value
  </h3>
  <p className="text-base sm:text-3xl  lg:text-xl font-bold text-gray-900">₹8,50,00,000</p>
</div>
</div>

      {/* Add Project Dialog */}
      <AddProjectDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />

      {/* Add Activity Dialog */}
      <AddActivityDialog 
        isOpen={isActivityDialogOpen} 
        onClose={() => setIsActivityDialogOpen(false)} 
      />
    </div>
  );
}