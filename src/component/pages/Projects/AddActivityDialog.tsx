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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Activity</DialogTitle>
          <DialogDescription>
            Create a new activity within a milestone
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <div className="space-y-6 mt-4">
          {/* Activity Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Name *
            </label>
            <input
              type="text"
              placeholder="Enter Activity name"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Milestone Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Milestone
            </label>
            <select
              value={milestone}
              onChange={(e) => setMilestone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? startDate.toLocaleDateString() : "mm/dd/yyyy"}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Planned End Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? endDate.toLocaleDateString() : "mm/dd/yyyy"}
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

        {/* Footer */}
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button 
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleAddActivity}
          >
            Add Activity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}