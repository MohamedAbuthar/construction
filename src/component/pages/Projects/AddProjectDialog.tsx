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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Add a new construction project to your portfolio
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Project Name - Full Width */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status and Project Value - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Planned">Planned</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Value
              </label>
              <input
                type="text"
                placeholder="0.00"
                value={projectValue}
                onChange={(e) => setProjectValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Planned Start and End Dates - Side by Side with Calendar */}
          <div className="grid grid-cols-2 gap-4">
            <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Planned Start Date
  </label>
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={cn(
          "w-full min-w-0 max-w-full justify-start text-left font-normal text-sm px-3",
          !endDate && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
        <span className="flex-1 min-w-0 text-ellipsis overflow-hidden">
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
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Planned End Date
  </label>
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={cn(
          "w-full min-w-0 max-w-full justify-start text-left font-normal text-sm px-3",
          !endDate && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
        <span className="flex-1 min-w-0 text-ellipsis overflow-hidden">
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                placeholder="0.000000"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                placeholder="0.000000"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleCreateProject}
          >
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}