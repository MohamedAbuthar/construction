// component/projects/view/ProjectViewContent.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, useRef, Suspense } from 'react';
import { MapPin, Calendar, DollarSign, Plus, TrendingDown, ArrowLeft } from 'lucide-react';
import AddMilestoneDialog from '@/component/pages/Projects/AddMilestoneDialog';
import AddActivityDialog from '@/component/pages/Projects/AddActivityDialog';
import AddSnapshotDialog from '@/component/pages/Projects/AddSnapshotDialog';
import { Chart, TooltipItem } from 'chart.js';

// Define types for our data structures
interface Milestone {
  name: string;
  budget: string;
  plannedDates: string;
  actualDates: string;
  progress: number;
}

interface Activity {
  activityName: string;
  milestone: string;
  plannedDates: string;
  actualDates: string;
  status: 'Done' | 'In Progress' | 'Not started';
}

interface ProjectProgress {
  [key: string]: number;
}

interface Project {
  name: string;
  location: string;
  timeline: string;
  value: string;
  budget: string;
  milestones: number;
  completedMilestones: number;
  activities: number;
  purchaseOrders: number;
  status: string;
  actualDuration: string;
  progress: ProjectProgress;
  milestonesData: Milestone[];
  activitiesData: Activity[];
}

interface ProjectsData {
  [key: string]: Project;
}

// EVM Chart Component
function EVMChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<'line'> | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      import('chart.js/auto').then((chartJS) => {
        const Chart = chartJS.Chart;
        const ctx = chartRef.current?.getContext('2d');
        if (ctx) {
          if (chartInstance.current) {
            chartInstance.current.destroy();
          }

          chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  label: 'Planned Value',
                  data: [5000000, 10000000, 15000000, 20000000, 25000000, 28000000],
                  borderColor: '#3b82f6',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  tension: 0.4,
                  fill: false,
                  borderWidth: 3
                },
                {
                  label: 'Earned Value',
                  data: [4000000, 9000000, 13000000, 18000000, 21000000, 25000000],
                  borderColor: '#10b981',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  tension: 0.4,
                  fill: false,
                  borderWidth: 3
                },
                {
                  label: 'Actual Cost',
                  data: [6000000, 12000000, 17000000, 22000000, 27000000, 30000000],
                  borderColor: '#ef4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  tension: 0.4,
                  fill: false,
                  borderWidth: 3
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  mode: 'index',
                  intersect: false,
                  backgroundColor: 'white',
                  titleColor: '#1f2937',
                  titleFont: {
                    size: 14,
                    weight: 'bold' as const
                  },
                  bodyColor: '#374151',
                  borderColor: '#e5e7eb',
                  borderWidth: 1,
                  padding: 16,
                  cornerRadius: 8,
                  boxPadding: 6,
                  usePointStyle: true,
                  callbacks: {
                    label: function(context: TooltipItem<'line'>) {
                      const value = context.parsed.y;
                      if (value === null || value === undefined) {
                        return `${context.dataset.label}: N/A`;
                      }
                      return `${context.dataset.label}: ₹${(value / 1000000).toFixed(1)}M`;
                    },
                    labelColor: function(context: TooltipItem<'line'>) {
                      let borderColor = '#374151';
                      
                      if (context.datasetIndex === 0) {
                        borderColor = '#3b82f6';
                      } else if (context.datasetIndex === 1) {
                        borderColor = '#10b981';
                      } else if (context.datasetIndex === 2) {
                        borderColor = '#ef4444';
                      }
                      
                      return {
                        borderColor: borderColor,
                        backgroundColor: borderColor,
                        borderWidth: 2,
                        borderRadius: 2
                      };
                    },
                    labelTextColor: function(context: TooltipItem<'line'>) {
                      if (context.datasetIndex === 0) {
                        return '#3b82f6';
                      } else if (context.datasetIndex === 1) {
                        return '#10b981';
                      } else if (context.datasetIndex === 2) {
                        return '#ef4444';
                      }
                      return '#374151';
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    display: false
                  },
                  border: {
                    display: true,
                    color: '#374151'
                  },
                  ticks: {
                    callback: function(value: string | number) {
                      if (value === null || value === undefined) return '₹0M';
                      return '₹' + (Number(value) / 1000000) + 'M';
                    },
                    font: {
                      size: 12
                    }
                  }
                },
                x: {
                  grid: {
                    display: false
                  },
                  border: {
                    display: true,
                    color: '#374151'
                  },
                  ticks: {
                    font: {
                      size: 12
                    }
                  }
                }
              },
              interaction: {
                intersect: false,
                mode: 'index'
              },
              elements: {
                point: {
                  radius: 4,
                  hoverRadius: 6
                }
              }
            }
          });
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full">
      <canvas ref={chartRef} />
      {/* Custom Legend below X-axis */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-600">Planned Value</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-600">Earned Value</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-gray-600">Actual Cost</span>
        </div>
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard({ title, value, icon: Icon }: { title: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="bg-red-100 rounded-lg shadow-sm border border-red-200 p-4 sm:p-6 w-75 h-28">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-500 font-medium whitespace-nowrap">{title}</h3>
          <p className="text-red-500 text-xl sm:text-3xl font-bold mt-1">{value}</p>
        </div>
        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 text-xl" />
      </div>
    </div>
  );
}

// Main Content Component (with useSearchParams)
function ProjectViewContentInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const projectId = searchParams.get('id');
  const [activeTab, setActiveTab] = useState('overview');
  const [isMilestoneDialogOpen, setIsMilestoneDialogOpen] = useState(false);
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);
  const [isSnapshotDialogOpen, setIsSnapshotDialogOpen] = useState(false);

  const projects: ProjectsData = {
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

  const project = projectId ? projects[projectId] : null;

  if (!project) {
    return (
      <div className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Project Not Found</h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-base">The project you&apos;re looking for doesn&apos;t exist.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'activities', label: 'Activities' },
    { id: 'evm', label: 'EVM' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-gray-100 text-gray-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Not started':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBack = () => {
    router.push('/projects');
  };

  return (
    <div className="space-y-6 lg:space-y-8 mx-2 sm:mx-3 md:mx-4 lg:mx-6 xl:mx-8 my-4 sm:my-6 lg:my-8">
      {/* Header with Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
        <div className="flex items-center gap-3">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-blue-50 transition-colors group"
            aria-label="Back to projects"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
          </button>
          
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{project.name}</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600 mt-1 sm:mt-2">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-base">{project.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-base">{project.timeline}</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-base">{project.value}</span>
              </div>
            </div>
          </div>
        </div>
        <span className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 self-start sm:self-auto">
          {project.status}
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-gray-600 text-base">Milestones</h3>
          <p className="text-2xl sm:text-3xl font-bold">{project.milestones}</p>
          <p className="text-base text-gray-500">{project.completedMilestones} completed</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-gray-600 text-base">Activities</h3>
          <p className="text-2xl sm:text-3xl font-bold">{project.activities}</p>
          <p className="text-base text-gray-500">1 in progress</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-gray-600 text-base">Budget</h3>
          <p className="text-2xl sm:text-3xl font-bold">{project.budget}</p>
          <p className="text-base text-gray-500">Total allocated</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-gray-600 text-base">Purchase Orders</h3>
          <p className="text-2xl sm:text-3xl font-bold">{project.purchaseOrders}</p>
          <p className="text-base text-gray-500">1 received</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200 bg-gray-50/50 p-2">
          <nav className="flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-4 font-medium text-sm transition-all duration-200 ease-in-out whitespace-nowrap rounded-lg border ${
                  activeTab === tab.id
                    ? 'text-black-600 bg-white border-blue-200 shadow-sm'
                    : 'text-gray-600 bg-white/50 border-gray-200 backdrop-blur-sm hover:bg-white/70 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Project Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Project Information</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                  {/* Left Column */}
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2">Status</h3>
                      <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-sm font-medium bg-white border border-gray-300 text-gray-800">
                        {project.status}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2">Planned Duration</h3>
                      <p className="text-gray-800 font-semibold text-base">{project.timeline}</p>
                    </div>
                  </div>
                  
                  {/* Right Column */}
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2">Project Budget</h3>
                      <p className="text-gray-800 font-semibold text-base">{project.budget}</p>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2">Actual Duration</h3>
                      <p className="text-gray-800 font-semibold text-base">{project.actualDuration}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Summary - Separated Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Progress Summary</h2>
                {Object.entries(project.progress).map(([task, percent]) => (
                  <div key={task} className="mb-3 sm:mb-4">
                    <div className="flex justify-between font-medium text-gray-700 mb-1">
                      <span className="text-sm sm:text-base">{task.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="text-sm sm:text-base">{percent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
                      <div
                        className="bg-blue-600 h-2 sm:h-2.5 rounded-full transition-all"
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Milestones</h3>
                <button 
                  onClick={() => setIsMilestoneDialogOpen(true)}
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-base">Add Milestone</span>
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left py-3 px-3 sm:px-6 font-semibold text-gray-700 text-base sm:text-lg">Name</th>
                        <th className="text-left py-3 px-3 sm:px-6 font-semibold text-gray-700 text-base sm:text-lg">Budget</th>
                        <th className="text-left py-3 px-3 sm:px-6 font-semibold text-gray-700 text-base sm:text-lg">Planned Dates</th>
                        <th className="text-left py-3 px-3 sm:px-6 font-semibold text-gray-700 text-base sm:text-lg">Actual Dates</th>
                        <th className="text-left py-3 px-3 sm:px-6 font-semibold text-gray-700 text-base sm:text-lg">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.milestonesData.map((milestone, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-3 sm:px-6">
                            <div className="font-medium text-gray-900 text-base">{milestone.name}</div>
                          </td>
                          <td className="py-3 px-3 sm:px-6 text-gray-600 text-base">{milestone.budget}</td>
                          <td className="py-3 px-3 sm:px-6 text-gray-600 text-base">{milestone.plannedDates}</td>
                          <td className="py-3 px-3 sm:px-6 text-gray-600 text-base">{milestone.actualDates}</td>
                          <td className="py-3 px-3 sm:px-6">
                            <div className="flex items-center space-x-2">
                              <div className="w-12 sm:w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all"
                                  style={{ width: `${milestone.progress}%` }}
                                ></div>
                              </div>
                              <span className="font-medium text-gray-700 text-sm">{milestone.progress}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Activities</h3>
                <button 
                  onClick={() => setIsActivityDialogOpen(true)}
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-base">Add Activity</span>
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="text-left py-3 px-3 sm:px-6 font-semibold text-gray-700 text-base sm:text-lg">Activity Name</th>
                        <th className="text-left py-3 px-3 sm:px-6 font-semibold text-gray-700 text-base sm:text-lg">Milestone</th>
                        <th className="text-left py-3 px-3 sm:px-6 font-semibold text-gray-700 text-base sm:text-lg">Planned Dates</th>
                        <th className="text-left py-3 px-3 sm:px-6 font-semibold text-gray-700 text-base sm:text-lg">Actual Dates</th>
                        <th className="text-left py-3 px-3 sm:px-6 font-semibold text-gray-700 text-base sm:text-lg">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.activitiesData.map((activity, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-3 sm:px-6">
                            <div className="font-medium text-gray-900 text-base">{activity.activityName}</div>
                          </td>
                          <td className="py-3 px-3 sm:px-6 text-gray-600 text-base">{activity.milestone}</td>
                          <td className="py-3 px-3 sm:px-6 text-gray-600 text-base">{activity.plannedDates}</td>
                          <td className="py-3 px-3 sm:px-6 text-gray-600 text-base">{activity.actualDates}</td>
                          <td className="py-3 px-3 sm:px-6">
                            <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-sm font-medium bg-white border border-gray-300 text-gray-800 ${getStatusColor(activity.status)}`}>
                              {activity.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'evm' && (
            <div className="space-y-6">
              {/* EVM Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatsCard 
                  title="Cost variance (CV)" 
                  value="₹30,00,000" 
                  icon={TrendingDown}
                />
                <StatsCard 
                  title="Schedule variance (SV)" 
                  value="₹25,00,000" 
                  icon={TrendingDown}
                />
                <StatsCard 
                  title="Cost Performance Index (CPI)" 
                  value="0.91" 
                  icon={TrendingDown}
                />
                <StatsCard 
                  title="Schedule Performance Index (SPI)" 
                  value="0.89" 
                  icon={TrendingDown}
                />
              </div>

              {/* EVM Chart with Add Snapshot Button */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 relative">
                {/* Add Snapshot Button at Top Right */}
                <div className="absolute top-4 right-4 z-10">
                  <button 
                    onClick={() => setIsSnapshotDialogOpen(true)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-base">Add Snapshot</span>
                  </button>
                </div>

                {/* EVM Trend Header */}
                <div className="mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">EVM Trend</h2>
                  <p className="text-gray-600 text-base">Planned Value vs Earned Value vs Actual Cost</p>
                </div>

                {/* EVM Chart */}
                <div className="h-64 sm:h-80 lg:h-96 mt-4">
                  <EVMChart />
                </div>
              </div>

              {/* EVM Formulas Section */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3 sm:mb-4">EVM Formulas</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-base">Variance Formulas</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-900 font-medium text-base">Cost Variance (CV)</p>
                        <p className="text-gray-500 text-sm">EV - AC = ₹30,00,000</p>
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium text-base">Schedule Variance (SV)</p>
                        <p className="text-gray-500 text-sm">EV - PV = ₹25,00,000</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-base">Performance Index</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-900 font-medium text-base">Cost Performance Index (CPI)</p>
                        <p className="text-gray-500 text-sm">EV / AC = 0.91</p>
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium text-base">Schedule Performance Index (SPI)</p>
                        <p className="text-gray-500 text-sm">EV / PV = 0.89</p>
                      </div>
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

      {/* Add Snapshot Dialog */}
      <AddSnapshotDialog 
        isOpen={isSnapshotDialogOpen} 
        onClose={() => setIsSnapshotDialogOpen(false)} 
      />
    </div>
  );
}

// Main exported component with Suspense boundary
export default function ProjectViewContent() {
  return (
    <Suspense fallback={
      <div className="space-y-6 lg:space-y-8 mx-4 sm:mx-6 md:mx-8 lg:mx-16 xl:mx-40 my-4 sm:my-6 lg:my-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-28"></div>
            ))}
          </div>
        </div>
      </div>
    }>
      <ProjectViewContentInner />
    </Suspense>
  );
}