// components/pages/Projects/projects.tsx
'use client';

import AddProjectDialog from '@/component/pages/Projects/AddProjectDialog';
import AddActivityDialog from '@/component/pages/Projects/AddActivityDialog';
import { Search, Plus, Link as LinkIcon } from 'lucide-react';
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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Projects</h1>
          <p className="text-gray-600">Manage your construction projects</p>
        </div>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Add Project</span>
        </button>
      </div>

      {/* Search Bar + Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between w-full">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Project Name
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Location
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Timeline
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Project Value
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div className="font-medium text-gray-900">
                      {project.name}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {project.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{project.location}</td>
                  <td className="py-4 px-6 text-gray-600">{project.timeline}</td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-gray-900">
                      {project.value}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {/* 🔗 Link Icon redirects to project details using router.push */}
                    <button
                      onClick={() => handleProjectClick(project.id)}
                      className="inline-flex items-center p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Project Details"
                    >
                      <LinkIcon size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Total Projects
          </h3>
          <p className="text-3xl font-bold text-gray-900">2</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Ongoing</h3>
          <p className="text-3xl font-bold text-gray-900">2</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Completed</h3>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Total Value
          </h3>
          <p className="text-3xl font-bold text-gray-900">₹8,50,00,000</p>
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