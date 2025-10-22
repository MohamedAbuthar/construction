'use client';

import React, { useState } from 'react';
import { ChevronDown, Calendar, List } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'planned' | 'on-time' | 'delayed';
  isParent?: boolean;
  isExpanded?: boolean;
  children?: Task[];
}

const MONTHS = [
  'Jun 2024', 'Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 
  'Nov 2024', 'Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025', 
  'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025', 'Aug 2025',
  'Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025'
];

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    name: 'Metro Station Construction - Phase 2',
    startDate: 'Jun 2024',
    endDate: 'Dec 2025',
    status: 'planned',
    isParent: true,
    isExpanded: true,
    children: [
      {
        id: '1-1',
        name: 'Foundation Work',
        startDate: 'Nov 2024',
        endDate: 'Jan 2025',
        status: 'on-time',
        isParent: true,
        isExpanded: true,
        children: [
          {
            id: '1-1-1',
            name: 'Site Leveling',
            startDate: 'Nov 2024',
            endDate: 'Dec 2024',
            status: 'delayed'
          },
          {
            id: '1-1-2',
            name: 'Pile Foundation',
            startDate: 'Dec 2024',
            endDate: 'Jan 2025',
            status: 'delayed'
          }
        ]
      },
      {
        id: '1-2',
        name: 'Structural Framework',
        startDate: 'Mar 2025',
        endDate: 'May 2025',
        status: 'planned',
        isParent: true,
        isExpanded: false,
        children: [
          {
            id: '1-2-1',
            name: 'Column Casting',
            startDate: 'Apr 2025',
            endDate: 'May 2025',
            status: 'planned'
          },
          {
            id: '1-2-2',
            name: 'Beam Installation',
            startDate: 'May 2025',
            endDate: 'Jun 2025',
            status: 'planned'
          }
        ]
      },
      {
        id: '1-3',
        name: 'MEP Installation',
        startDate: 'Jun 2025',
        endDate: 'Aug 2025',
        status: 'planned',
        isParent: true,
        isExpanded: true,
        children: [
          {
            id: '1-3-1',
            name: 'Electrical Conduit Installation',
            startDate: 'Jun 2025',
            endDate: 'Aug 2025',
            status: 'planned'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Residential Complex - Tower A',
    startDate: 'Jun 2024',
    endDate: 'Oct 2025',
    status: 'planned',
    isParent: true,
    isExpanded: false,
    children: [
      {
        id: '2-1',
        name: 'Excavation & Foundation',
        startDate: 'Jun 2024',
        endDate: 'Sep 2024',
        status: 'delayed',
        isParent: true,
        isExpanded: true,
        children: []
      },
      {
        id: '2-2',
        name: 'Tower Construction',
        startDate: 'Sep 2024',
        endDate: 'Nov 2025',
        status: 'planned',
        isParent: true,
        isExpanded: true,
        children: []
      },
      {
        id: '2-3',
        name: 'Slab Casting - Floor 1-5',
        startDate: 'Sep 2024',
        endDate: 'Nov 2024',
        status: 'planned'
      }
    ]
  }
];

export default function GanttChart() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [viewMode, setViewMode] = useState<'chart' | 'list'>('chart');

  const toggleExpand = (id: string) => {
    const updateTasks = (taskList: Task[]): Task[] => {
      return taskList.map(task => {
        if (task.id === id) {
          return { ...task, isExpanded: !task.isExpanded };
        }
        if (task.children) {
          return { ...task, children: updateTasks(task.children) };
        }
        return task;
      });
    };
    setTasks(updateTasks(tasks));
  };

  const getMonthIndex = (monthStr: string): number => {
    return MONTHS.indexOf(monthStr);
  };

  const calculateBarPosition = (startDate: string, endDate: string) => {
    const startIdx = getMonthIndex(startDate);
    const endIdx = getMonthIndex(endDate);
    
    if (startIdx === -1 || endIdx === -1) return { left: 0, width: 0 };
    
    const left = (startIdx / MONTHS.length) * 100;
    const width = ((endIdx - startIdx + 1) / MONTHS.length) * 100;
    
    return { left, width };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned':
        return 'bg-blue-500';
      case 'on-time':
        return 'bg-green-500';
      case 'delayed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'planned':
        return 'Planned';
      case 'on-time':
        return 'On Time';
      case 'delayed':
        return 'Delayed';
      default:
        return 'Unknown';
    }
  };

  const flattenTasks = (taskList: Task[], level = 0): Array<Task & { level: number }> => {
    let result: Array<Task & { level: number }> = [];
    
    taskList.forEach(task => {
      result.push({ ...task, level });
      if (task.isParent && task.isExpanded && task.children) {
        result = result.concat(flattenTasks(task.children, level + 1));
      }
    });
    
    return result;
  };

  const renderTasks = (taskList: Task[], level = 0) => {
    return taskList.map(task => (
      <React.Fragment key={task.id}>
        <tr className="border-b border-gray-200 hover:bg-blue-200 transition-colors">
          <td className="px-4 py-3 bg-white hover:bg-blue-200 text-sm w-80">
            <div style={{ paddingLeft: `${level * 24}px` }} className="flex items-center gap-2">
              {task.isParent && (
                <button
                  onClick={() => toggleExpand(task.id)}
                  className="p-0 hover:bg-blue-200 rounded"
                >
                  <ChevronDown
                    size={16}
                    className={`transition-transform text-gray-600 ${task.isExpanded ? 'rotate-0' : '-rotate-90'}`}
                  />
                </button>
              )}
              {!task.isParent && <div className="w-4" />}
              <span className={`${
                level === 0 ? 'text-gray-900 font-semibold' : 'text-gray-700 font-normal'
              }`}>
                {task.name}
              </span>
            </div>
          </td>
          <td colSpan={MONTHS.length} className="p-0">
            <div className="relative h-10 bg-white hover:bg-blue-50 transition-colors flex items-center">
              {getMonthIndex(task.startDate) !== -1 && (
                <div
                  className={`absolute h-5 rounded-sm shadow-sm ${getStatusColor(task.status)}`}
                  style={{
                    left: `${calculateBarPosition(task.startDate, task.endDate).left}%`,
                    width: `${calculateBarPosition(task.startDate, task.endDate).width}%`,
                    minWidth: '25px',
                    marginLeft: '6px'
                  }}
                  title={`${task.name}: ${task.startDate} - ${task.endDate}`}
                />
              )}
            </div>
          </td>
        </tr>
        {task.isParent && task.isExpanded && task.children && renderTasks(task.children, level + 1)}
      </React.Fragment>
    ));
  };

  const allTasks = flattenTasks(tasks);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="pt-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">Gantt Chart</h1>
          <p className="text-gray-600 text-xs sm:text-sm">Visual timeline of all projects, milestones, and activities</p>
        </div>

        {/* View Toggle - Mobile Only */}
        <div className="lg:hidden flex gap-2 bg-white p-2 rounded-lg border border-gray-200">
          <button
            onClick={() => setViewMode('chart')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'chart' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Calendar size={16} />
            Chart View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'list' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <List size={16} />
            List View
          </button>
        </div>

        {/* Timeline Section - Desktop & Chart View */}
        {(viewMode === 'chart' || window.innerWidth >= 1024) && (
          <div className="p-3 sm:p-4 md:p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-1">Project Timeline</h3>
                <p className="text-xs sm:text-sm text-gray-600">Click rows to expand/collapse. Blue bars = planned, Green/Red bars = actual</p>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-blue-500 rounded" />
                  <span className="text-gray-500 font-medium">Planned</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-green-500 rounded" />
                  <span className="text-gray-500 font-medium">On Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-red-500 rounded" />
                  <span className="text-gray-500 font-medium">Delayed</span>
                </div>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block border border-gray-300 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-gray-300">
                      <th className="px-4 py-3 text-left font-semibold text-gray-800 text-sm bg-gray-100 w-80">
                        Task
                      </th>
                      {MONTHS.map((month, idx) => {
                        const [monthName, year] = month.split(' ');
                        return (
                          <th
                            key={idx}
                            className="px-2 py-2 text-center font-semibold text-gray-700 text-xs whitespace-nowrap min-w-16 bg-gray-100 border-l border-gray-200"
                          >
                            <div className="font-medium">{monthName}</div>
                            <div className="text-xs text-gray-500">{year}</div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {renderTasks(tasks)}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Simplified Chart */}
            <div className="lg:hidden space-y-2">
              {allTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="bg-white border border-gray-200 rounded-lg p-3 space-y-2"
                >
                  <div className="flex items-start gap-2">
                    {task.isParent && (
                      <button
                        onClick={() => toggleExpand(task.id)}
                        className="p-1 hover:bg-gray-100 rounded flex-shrink-0"
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform text-gray-600 ${task.isExpanded ? 'rotate-0' : '-rotate-90'}`}
                        />
                      </button>
                    )}
                    {!task.isParent && <div className="w-6" />}
                    <div className="flex-1 min-w-0">
                      <h4 
                        className={`text-sm ${
                          task.level === 0 ? 'font-semibold text-gray-900' : 'font-normal text-gray-700'
                        }`}
                        style={{ paddingLeft: `${task.level * 12}px` }}
                      >
                        {task.name}
                      </h4>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="text-gray-400" />
                      <span className="text-gray-600">{task.startDate} - {task.endDate}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === 'planned' 
                        ? 'bg-blue-100 text-blue-700' 
                        : task.status === 'on-time'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {getStatusLabel(task.status)}
                    </span>
                  </div>
                  
                  {/* Mini timeline bar */}
                  <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`absolute h-full ${getStatusColor(task.status)} transition-all`}
                      style={{
                        left: `${calculateBarPosition(task.startDate, task.endDate).left}%`,
                        width: `${calculateBarPosition(task.startDate, task.endDate).width}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* List View - Mobile Only */}
        {viewMode === 'list' && window.innerWidth < 1024 && (
          <div className="space-y-3">
            {allTasks.map((task) => (
              <div 
                key={task.id} 
                className="bg-white border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start gap-2">
                  {task.isParent && (
                    <button
                      onClick={() => toggleExpand(task.id)}
                      className="p-1 hover:bg-gray-100 rounded flex-shrink-0 mt-0.5"
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform text-gray-600 ${task.isExpanded ? 'rotate-0' : '-rotate-90'}`}
                      />
                    </button>
                  )}
                  {!task.isParent && <div className="w-7" />}
                  <div className="flex-1 min-w-0">
                    <h4 
                      className={`text-sm mb-1 ${
                        task.level === 0 ? 'font-semibold text-gray-900' : 'font-normal text-gray-700'
                      }`}
                      style={{ paddingLeft: `${task.level * 12}px` }}
                    >
                      {task.name}
                    </h4>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500 w-16 flex-shrink-0">Start:</span>
                        <span className="text-gray-900 font-medium">{task.startDate}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500 w-16 flex-shrink-0">End:</span>
                        <span className="text-gray-900 font-medium">{task.endDate}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500 w-16 flex-shrink-0">Status:</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          task.status === 'planned' 
                            ? 'bg-blue-100 text-blue-700' 
                            : task.status === 'on-time'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {getStatusLabel(task.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Legend Section */}
        <div className="p-4 sm:p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">Legend</h3>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full bg-blue-700 text-white text-xs font-semibold">
                Project
              </span>
              <span className="text-gray-600 text-xs sm:text-sm">Top-level projects</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full border bg-white text-gray-900 text-xs font-semibold">
                Milestone
              </span>
              <span className="text-gray-600 text-xs sm:text-sm">Major phases within projects</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-500 text-xs font-semibold">
                Activity
              </span>
              <span className="text-gray-600 text-xs sm:text-sm">Specific tasks assigned to engineers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}