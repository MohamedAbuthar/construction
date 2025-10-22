'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/component/ui/dialog';
import { Button } from '@/component/ui/button';
import { Calendar } from '@/component/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/component/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface AddActivityDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddActivityDialog({ isOpen, onClose }: AddActivityDialogProps) {
  const [activityName, setActivityName] = useState('');
  const [milestone, setMilestone] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const milestones = [
    'Foundation Work',
    'Structural Framework',
    'MEP Installation'
  ];

  const statuses = [
    'Not started',
    'In progress',
    'Done',
    'Blocked'
  ];

  const handleAddActivity = () => {
    // Handle activity creation logic here
    console.log({
      activityName,
      milestone,
      status,
      startDate,
      endDate,
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
    setActivityName('');
    setMilestone('');
    setStatus('');
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg flex flex-col max-h-[90vh]">
        <DialogHeader className="flex-shrink-0 pb-4">
          <DialogTitle>Add Activity</DialogTitle>
          <DialogDescription>
            Create a new activity within a milestone
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-1">
          {/* Form */}
          <div className="space-y-4">
            {/* Activity Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity Name *
              </label>
              <input
                type="text"
                placeholder="Enter Activity name"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Milestone Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Milestone
              </label>
              <select
                value={milestone}
                onChange={(e) => setMilestone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">Select milestone</option>
                {milestones.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">Select status</option>
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Planned Dates with Calendar */}
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
          </div>
        </div>

        {/* Footer - Always visible at bottom */}
        <DialogFooter className="flex-shrink-0 mt-4 pt-4 border-t">
          <DialogClose asChild>
            <Button variant="outline" onClick={handleCancel} className="text-sm">
              Cancel
            </Button>
          </DialogClose>
          <Button 
            className="bg-blue-600 text-white hover:bg-blue-700 text-sm"
            onClick={handleAddActivity}
          >
            Add Activity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}