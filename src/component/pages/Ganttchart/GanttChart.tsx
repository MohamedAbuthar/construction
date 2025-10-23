'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

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
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

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

  const renderTasks = (taskList: Task[], level = 0) => {
    return taskList.map(task => (
      <React.Fragment key={task.id}>
        <tr 
         className={`border-b border-gray-200 transition-colors ${
            hoveredRow === task.id ? 'bg-blue-200' : 'hover:bg-blue-200'
          }`}
          onMouseEnter={() => setHoveredRow(task.id)}
          onMouseLeave={() => setHoveredRow(null)}
        >
          <td className="px-3 sm:px-4 py-3 text-sm w-64 sm:w-72 lg:w-80 min-w-64 sm:min-w-72 lg:min-w-80 sticky left-0 border-r border-gray-300 bg-white z-10">
            <div style={{ paddingLeft: `${level * 24}px` }} className="flex items-center gap-2 min-w-0">
              {task.isParent && (
                <button
                  onClick={() => toggleExpand(task.id)}
                  className="flex-shrink-0 text-gray-600 hover:text-gray-900"
                >
                  {task.isExpanded ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
              )}
              {!task.isParent && <div className="w-4 flex-shrink-0" />}
              <span className={`truncate ${
                level === 0 ? 'font-medium text-gray-900' : 'text-gray-700'
              }`}>
                {task.name}
              </span>
            </div>
          </td>
          <td colSpan={MONTHS.length} className="p-0 relative bg-white">
            <div className="relative h-12 flex items-center w-full">
              {getMonthIndex(task.startDate) !== -1 && (
                <div
                  className={`absolute h-6 rounded ${
                    task.status === 'planned'
                      ? 'bg-blue-400'
                      : task.status === 'on-time'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                  style={{
                    left: `${calculateBarPosition(task.startDate, task.endDate).left}%`,
                    width: `${calculateBarPosition(task.startDate, task.endDate).width}%`,
                    minWidth: '4px'
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

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Gantt Chart</h1>
        <p className="text-sm text-gray-600">Visual timeline of all projects, milestones, and activities</p>
      </div>

      {/* Timeline Section */}
      <div className="bg-white rounded-lg shadow border border-gray-200 mb-4 sm:mb-6 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-1">Project Timeline</h3>
              <p className="text-sm text-gray-600">Click rows to expand/collapse. Blue bars = planned, Green/Red bars = actual</p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-400 rounded" />
                <span className="text-gray-700">Planned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded" />
                <span className="text-gray-700">On Time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded" />
                <span className="text-gray-700">Delayed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table with Smooth Scrolling */}
        <div className="overflow-x-auto scroll-smooth " style={{ WebkitOverflowScrolling: 'touch' }}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 ">
                <th className="px-3 sm:px-4 py-3 text-left text-sm font-semibold text-gray-800 w-64 sm:w-72 lg:w-80 min-w-64 sm:min-w-72 lg:min-w-80 sticky left-0 bg-gray-100 z-20 border-r border-gray-300">
                  Task
                </th>
                {MONTHS.map((month, idx) => {
                  const [monthName, year] = month.split(' ');
                  return (
                    <th
                      key={idx}
                      className="px-2 py-3 text-center font-medium text-gray-700 text-xs whitespace-nowrap min-w-16 sm:min-w-20 bg-gray-100 border-l border-gray-200 "
                    >
                      <div className="text-sm font-semibold">{monthName}</div>
                      <div className="text-xs text-gray-600">{year}</div>
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

      {/* Legend Section */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Legend</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-medium">
              Project
            </span>
            <span className="text-sm text-gray-600">Top-level projects</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-gray-300 bg-gray-50 text-gray-900 text-xs font-medium">
              Milestone
            </span>
            <span className="text-sm text-gray-600">Major phases within projects</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-medium">
              Activity
            </span>
            <span className="text-sm text-gray-600">Specific tasks assigned to engineers</span>
          </div>
        </div>
      </div>
    </div>
  );
}