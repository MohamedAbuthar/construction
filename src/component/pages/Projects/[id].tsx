// app/projects/view/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { MapPin, Calendar, DollarSign, Flag, Activity, BarChart3, Plus, TrendingUp } from 'lucide-react';
import AddMilestoneDialog from '@/component/pages/Projects/AddMilestoneDialog';
import AddActivityDialog from '@/component/pages/Projects/AddActivityDialog';

export default function ProjectViewPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');
  const [activeTab, setActiveTab] = useState('overview');
  const [isMilestoneDialogOpen, setIsMilestoneDialogOpen] = useState(false);
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);

  const projects = {
    '1': {
      name: 'Metro Station Construction - Phase 2',
      location: '28.6139, 77.2090',
      timeline: '1/1/2025 - 12/31/2025',
      value: '₹5,00,00,000',
      budget: '₹3,50,00,000',
      milestones: 3,
      completedMilestones: 1,
      activities: 5,
      purchaseOrders: 2,
      status: 'Ongoing',
      actualDuration: '1/5/2025 - Ongoing',
      progress: {
        FoundationWork: 100,
        StructuralFramework: 45,
        MEPInstallation: 0,
      },
      milestonesData: [
        {
          name: 'Foundation Work',
          budget: '₹80,00,000',
          plannedDates: '1/1/2025 - 3/31/2025',
          actualDates: '1/5/2025 - 4/10/2025',
          progress: 100
        },
        {
          name: 'Structural Framework',
          budget: '₹1,50,00,000',
          plannedDates: '4/1/2025 - 8/31/2025',
          actualDates: '4/11/2025 - Ongoing',
          progress: 45
        },
        {
          name: 'MEP Installation',
          budget: '₹1,20,00,000',
          plannedDates: '7/1/2025 - 11/30/2025',
          actualDates: 'Not started',
          progress: 0
        }
      ],
      activitiesData: [
        {
          activityName: 'Site Leveling',
          milestone: 'Foundation Work',
          plannedDates: '1/1/2025 - 1/15/2025',
          actualDates: '1/5/2025 - 1/20/2025',
          status: 'Done'
        },
        {
          activityName: 'Pile Foundation',
          milestone: 'Foundation Work',
          plannedDates: '1/16/2025 - 2/28/2025',
          actualDates: '1/21/2025 - 3/10/2025',
          status: 'Done'
        },
        {
          activityName: 'Column Casting',
          milestone: 'Structural Framework',
          plannedDates: '4/1/2025 - 5/31/2025',
          actualDates: '4/11/2025 - Ongoing',
          status: 'In Progress'
        },
        {
          activityName: 'Beam Installation',
          milestone: 'Structural Framework',
          plannedDates: '6/1/2025 - 8/31/2025',
          actualDates: 'Not started',
          status: 'Not started'
        },
        {
          activityName: 'Electrical Conduit Installation',
          milestone: 'MEP Installation',
          plannedDates: '7/1/2025 - 9/30/2025',
          actualDates: 'Not started',
          status: 'Not started'
        }
      ]
    },
    '2': {
      name: 'Residential Complex - Tower A',
      location: '28.5355, 77.3910',
      timeline: '6/1/2024 - 6/30/2025',
      value: '₹3,50,00,000',
      budget: '₹2,50,00,000',
      milestones: 4,
      completedMilestones: 2,
      activities: 6,
      purchaseOrders: 1,
      status: 'Ongoing',
      actualDuration: '6/5/2024 - Ongoing',
      progress: {
        FoundationWork: 100,
        StructuralFramework: 75,
        MEPInstallation: 30,
      },
      milestonesData: [
        {
          name: 'Foundation Work',
          budget: '₹60,00,000',
          plannedDates: '6/1/2024 - 8/31/2024',
          actualDates: '6/5/2024 - 9/15/2024',
          progress: 100
        },
        {
          name: 'Structural Framework',
          budget: '₹1,20,00,000',
          plannedDates: '9/1/2024 - 2/28/2025',
          actualDates: '9/16/2024 - Ongoing',
          progress: 75
        },
        {
          name: 'MEP Installation',
          budget: '₹70,00,000',
          plannedDates: '3/1/2025 - 5/31/2025',
          actualDates: 'Not started',
          progress: 0
        }
      ],
      activitiesData: [
        {
          activityName: 'Site Leveling',
          milestone: 'Foundation Work',
          plannedDates: '6/1/2024 - 6/15/2024',
          actualDates: '6/5/2024 - 6/20/2024',
          status: 'Done'
        },
        {
          activityName: 'Pile Foundation',
          milestone: 'Foundation Work',
          plannedDates: '6/16/2024 - 7/31/2024',
          actualDates: '6/21/2024 - 8/15/2024',
          status: 'Done'
        },
        {
          activityName: 'Column Casting',
          milestone: 'Structural Framework',
          plannedDates: '9/1/2024 - 11/30/2024',
          actualDates: '9/16/2024 - Ongoing',
          status: 'In Progress'
        }
      ]
    },
  };

  const project = projectId ? projects[projectId as keyof typeof projects] : null;

  if (!project) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Project Not Found</h1>
        <p className="text-gray-600 mt-2">The project you're looking for doesn't exist.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'milestones', label: 'Milestones', icon: Flag },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'evm', label: 'EVM', icon: BarChart3 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Not started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <div className="flex items-center space-x-4 text-gray-600 mt-2">
            <div className="flex items-center space-x-1">
              <MapPin size={16} />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>{project.timeline}</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign size={16} />
              <span>{project.value}</span>
            </div>
          </div>
        </div>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {project.status}
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-600">Milestones</h3>
          <p className="text-2xl font-bold">{project.milestones}</p>
          <p className="text-sm text-gray-500">{project.completedMilestones} completed</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-600">Activities</h3>
          <p className="text-2xl font-bold">{project.activities}</p>
          <p className="text-sm text-gray-500">1 in progress</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-600">Budget</h3>
          <p className="text-2xl font-bold">{project.budget}</p>
          <p className="text-sm text-gray-500">Total allocated</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-gray-600">Purchase Orders</h3>
          <p className="text-2xl font-bold">{project.purchaseOrders}</p>
          <p className="text-sm text-gray-500">1 received</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-4 rounded-t-lg font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 border-t border-l border-r border-gray-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Project Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Project Information</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-600">Status</p>
                    <p className="font-semibold text-gray-800">{project.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Planned Duration</p>
                    <p className="font-semibold text-gray-800">{project.timeline}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Actual Duration</p>
                    <p className="font-semibold text-gray-800">{project.actualDuration}</p>
                  </div>
                </div>
              </div>

              {/* Progress Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Progress Summary</h2>
                {Object.entries(project.progress).map(([task, percent]) => (
                  <div key={task} className="mb-4">
                    <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                      <span>{task.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'milestones' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Milestones</h3>
                <button 
                  onClick={() => setIsMilestoneDialogOpen(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} />
                  <span>Add Milestone</span>
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-6 font-semibold text-gray-700">Name</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-700">Budget</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-700">Planned Dates</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-700">Actual Dates</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-700">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.milestonesData.map((milestone, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-6">
                          <div className="font-medium text-gray-900">{milestone.name}</div>
                        </td>
                        <td className="py-3 px-6 text-gray-600">{milestone.budget}</td>
                        <td className="py-3 px-6 text-gray-600">{milestone.plannedDates}</td>
                        <td className="py-3 px-6 text-gray-600">{milestone.actualDates}</td>
                        <td className="py-3 px-6">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full transition-all"
                                style={{ width: `${milestone.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{milestone.progress}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Activities</h3>
                <button 
                  onClick={() => setIsActivityDialogOpen(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} />
                  <span>Add Activity</span>
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-6 font-semibold text-gray-700">Activity Name</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-700">Milestone</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-700">Planned Dates</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-700">Actual Dates</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {project.activitiesData.map((activity, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-6">
                          <div className="font-medium text-gray-900">{activity.activityName}</div>
                        </td>
                        <td className="py-3 px-6 text-gray-600">{activity.milestone}</td>
                        <td className="py-3 px-6 text-gray-600">{activity.plannedDates}</td>
                        <td className="py-3 px-6 text-gray-600">{activity.actualDates}</td>
                        <td className="py-3 px-6">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                            {activity.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'evm' && (
            <div className="space-y-6">
              {/* EVM Trend Section */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">EVM Trend</h2>
                <p className="text-gray-600">Planned Value vs Earned Value vs Actual Cost</p>
              </div>

              {/* Stats Cards with Icons */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Cost Variance */}
                <div className="bg-red-50 rounded-lg border border-red-200 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-700">Cost Variance (CV)</h3>
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <BarChart3 size={16} className="text-red-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">$25,00,000</p>
                </div>

                {/* Schedule Variance */}
                <div className="bg-red-50 rounded-lg border border-red-200 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-700">Schedule Variance (SV)</h3>
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Calendar size={16} className="text-red-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">$30,00,000</p>
                </div>

                {/* Cost Performance Index */}
                <div className="bg-red-50 rounded-lg border border-red-200 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-700">Cost Performance Index (CPI)</h3>
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <TrendingUp size={16} className="text-red-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">0.91</p>
                </div>

                {/* Schedule Performance Index */}
                <div className="bg-red-50 rounded-lg border border-red-200 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-700">Schedule Performance Index (SPI)</h3>
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Activity size={16} className="text-red-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">0.89</p>
                </div>
              </div>

              {/* Add Snapshot Button */}
              <div className="flex justify-end">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus size={16} />
                  <span>Add Snapshot</span>
                </button>
              </div>

              {/* Chart Area */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="h-64 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 size={48} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">EVM Trend Chart</p>
                    <p className="text-sm text-gray-400">Planned Value vs Earned Value vs Actual Cost</p>
                  </div>
                </div>
              </div>

              {/* EVM Formulas Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">EVM Formulas</h3>
                
                <div className="space-y-4">
                  {/* CV and SV Formulas */}
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <span className="font-semibold text-gray-700 min-w-[180px]">CV (Cost Variance):</span>
                      <span className="text-gray-600">EV - AC</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-semibold text-gray-700 min-w-[180px]">SV (Schedule Variance):</span>
                      <span className="text-gray-600">EV - PV</span>
                    </div>
                  </div>

                  {/* Timeline Legend */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Planned Value</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Earned Value</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Actual Cost</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Table */}
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="text-left py-3 px-6 font-semibold text-gray-700"></th>
                          <th className="text-left py-3 px-6 font-semibold text-gray-700">API 20</th>
                          <th className="text-left py-3 px-6 font-semibold text-gray-700">Jul 31</th>
                          <th className="text-left py-3 px-6 font-semibold text-gray-700">Oct 15</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-3 px-6">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <span className="text-sm text-gray-600">Planned Value</span>
                            </div>
                          </td>
                          <td className="py-3 px-6">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          </td>
                          <td className="py-3 px-6">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          </td>
                          <td className="py-3 px-6">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-6">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-gray-600">Earned Value</span>
                            </div>
                          </td>
                          <td className="py-3 px-6">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </td>
                          <td className="py-3 px-6">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </td>
                          <td className="py-3 px-6">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-6">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span className="text-sm text-gray-600">Actual Cost</span>
                            </div>
                          </td>
                          <td className="py-3 px-6">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          </td>
                          <td className="py-3 px-6">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          </td>
                          <td className="py-3 px-6">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* CPI and SPI Formulas */}
                  <div className="space-y-2 pt-4">
                    <div className="flex items-start space-x-2">
                      <span className="font-semibold text-gray-700 min-w-[180px]">CPI (Cost Performance Index):</span>
                      <span className="text-gray-600">EV / AC</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-semibold text-gray-700 min-w-[180px]">SPI (Schedule Performance Index):</span>
                      <span className="text-gray-600">EV / PV</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Milestone Dialog */}
      <AddMilestoneDialog 
        isOpen={isMilestoneDialogOpen} 
        onClose={() => setIsMilestoneDialogOpen(false)} 
      />

      {/* Add Activity Dialog */}
      <AddActivityDialog 
        isOpen={isActivityDialogOpen} 
        onClose={() => setIsActivityDialogOpen(false)} 
      />
    </div>
  );
}