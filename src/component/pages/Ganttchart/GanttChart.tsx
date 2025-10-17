'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Task } from '@/component/types/gantt';

// Constants
const MONTHS = [
  'Jun 2024', 'Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 
  'Nov 2024', 'Dec 2024', 'Jan 2025', 'Feb 2025', 'Mar 2025', 
  'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025'
];

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    name: 'Metro Station Construction - Phase 2',
    startDate: 'Nov 2024',
    endDate: 'Jun 2025',
    status: 'planned',
    isParent: true,
    isExpanded: true,
    children: []
  },
  {
    id: '2',
    name: 'Foundation Work',
    startDate: 'Nov 2024',
    endDate: 'Jan 2025',
    status: 'actual',
    isParent: true,
    isExpanded: true,
    children: [
      {
        id: '2-1',
        name: 'Site Leveling',
        startDate: 'Nov 2024',
        endDate: 'Dec 2024',
        status: 'actual'
      },
      {
        id: '2-2',
        name: 'Pile Foundation',
        startDate: 'Dec 2024',
        endDate: 'Jan 2025',
        status: 'actual'
      }
    ]
  },
  {
    id: '3',
    name: 'Structural Framework',
    startDate: 'Mar 2025',
    endDate: 'May 2025',
    status: 'planned',
    isParent: true,
    isExpanded: true,
    children: [
      {
        id: '3-1',
        name: 'Column Casting',
        startDate: 'Apr 2025',
        endDate: 'May 2025',
        status: 'planned'
      },
      {
        id: '3-2',
        name: 'Beam Installation',
        startDate: 'May 2025',
        endDate: 'Jun 2025',
        status: 'planned'
      }
    ]
  },
  {
    id: '4',
    name: 'MEP Installation',
    startDate: 'Jun 2025',
    endDate: 'Jul 2025',
    status: 'planned',
    isParent: true,
    isExpanded: false,
    children: [
      {
        id: '4-1',
        name: 'Electrical Conduit Installation',
        startDate: 'Jun 2025',
        endDate: 'Jul 2025',
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
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Project Timeline</h3>
        <p className="text-sm text-gray-600">Click rows to expand/collapse. Blue bars = planned, Red bars = actual</p>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400 rounded" />
          <span className="text-gray-700">Planned</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-400 rounded" />
          <span className="text-gray-700">Actual</span>
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
  );
}