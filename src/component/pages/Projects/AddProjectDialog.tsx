// components/AddProjectDialog.tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/component/ui/dialog';
import { Button } from '@/component/ui/button';
import { Calendar } from '@/component/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/component/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AddProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProjectDialog({ isOpen, onClose }: AddProjectDialogProps) {
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState('Planned');
  const [projectValue, setProjectValue] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleCreateProject = () => {
    // Handle project creation logic here
    console.log({
      projectName,
      status,
      projectValue,
      startDate,
      endDate,
      latitude,
      longitude,
    });
    
    // Reset form and close dialog
    resetForm();
    onClose();
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setProjectName('');
    setStatus('Planned');
    setProjectValue('');
    setStartDate(undefined);
    setEndDate(undefined);
    setLatitude('');
    setLongitude('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl flex flex-col max-h-[90vh]">
        <DialogHeader className="flex-shrink-0 pb-4">
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Add a new construction project to your portfolio
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-1">
          <div className="space-y-4">
            {/* Project Name - Full Width */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Status and Project Value - Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="Planned">Planned</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Value
                </label>
                <input
                  type="text"
                  placeholder="0.00"
                  value={projectValue}
                  onChange={(e) => setProjectValue(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Planned Start and End Dates - Side by Side with Calendar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Planned Start Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal text-xs h-9 px-2",
                        !startDate && "text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-1 h-3 w-3 flex-shrink-0" />
                      <span className="whitespace-nowrap text-xs">
                        {startDate ? format(startDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Planned End Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal text-xs h-9 px-2",
                        !endDate && "text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-1 h-3 w-3 flex-shrink-0" />
                      <span className="whitespace-nowrap text-xs">
                        {endDate ? format(endDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={startDate ? { before: startDate } : undefined}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Latitude and Longitude - Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="0.000000"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="0.000000"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Always visible */}
        <DialogFooter className="flex-shrink-0 mt-4 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel} className="text-sm">
            Cancel
          </Button>
          <Button 
            className="bg-blue-600 text-white hover:bg-blue-700 text-sm"
            onClick={handleCreateProject}
          >
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}