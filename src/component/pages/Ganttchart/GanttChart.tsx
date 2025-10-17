'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Task } from '@/component/types';

// Constants
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
        isExpanded: true,
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
    isExpanded: true,
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
        <tr className="border-b border-gray-200 hover:bg-gray-50">
          <td className="p-4 sticky left-0 bg-white">
            <div style={{ paddingLeft: `${level * 20}px` }} className="flex items-center gap-2">
              {task.isParent && (
                <button
                  onClick={() => toggleExpand(task.id)}
                  className="p-0 hover:bg-gray-200 rounded"
                >
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${task.isExpanded ? 'rotate-0' : '-rotate-90'}`}
                  />
                </button>
              )}
              {!task.isParent && <div className="w-4" />}
              <span className="text-sm font-medium text-gray-700">{task.name}</span>
            </div>
          </td>
          <td colSpan={MONTHS.length} className="p-0">
            <div className="relative h-12 bg-gray-50">
              {getMonthIndex(task.startDate) !== -1 && (
                <div
                  className={`absolute h-8 top-2 rounded-sm ${
                    task.status === 'planned'
                      ? 'bg-blue-400 border border-blue-500'
                      : task.status === 'on-time'
                      ? 'bg-green-400 border border-green-500'
                      : 'bg-red-400 border border-red-500'
                  }`}
                  style={{
                    left: `${calculateBarPosition(task.startDate, task.endDate).left}%`,
                    width: `${calculateBarPosition(task.startDate, task.endDate).width}%`,
                    minWidth: '20px'
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gantt Chart</h1>
        <p className="text-gray-600">Visual timeline of all projects, milestones, and activities</p>
      </div>

      {/* Timeline Section */}
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Project Timeline</h3>
            <p className="text-sm text-gray-600">Click rows to expand/collapse. Blue bars = planned, Green/Red bars = actual</p>
          </div>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded" />
              <span className="text-gray-700">Planned</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded" />
              <span className="text-gray-700">On Time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-400 rounded" />
              <span className="text-gray-700">Delayed</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="p-4 text-left font-semibold text-gray-700 sticky left-0 bg-gray-100 w-96">
                  Task
                </th>
                {MONTHS.map((month, idx) => (
                  <th
                    key={idx}
                    className="p-3 text-center font-semibold text-gray-700 text-xs whitespace-nowrap min-w-20"
                  >
                    {month}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{renderTasks(tasks)}</tbody>
          </table>
        </div>
      </div>

      {/* Legend Section */}
      <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Legend</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold">
              Project
            </span>
            <span className="text-sm text-gray-600">Top-level projects</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold">
              Milestone
            </span>
            <span className="text-sm text-gray-600">Major phases within projects</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 border border-gray-300 text-gray-700 text-xs font-semibold">
              Activity
            </span>
            <span className="text-sm text-gray-600">Specific tasks assigned to engineers</span>
          </div>
        </div>
      </div>
    </div>
  );
}