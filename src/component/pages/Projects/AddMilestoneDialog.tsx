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

interface AddMilestoneDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMilestoneDialog({ isOpen, onClose }: AddMilestoneDialogProps) {
  const [milestoneName, setMilestoneName] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleAddMilestone = () => {
    // Example: You can replace this with API call or form submission logic
    console.log({
      milestoneName,
      budget,
      startDate,
      endDate,
    });
    // Reset form and close dialog
    setMilestoneName('');
    setBudget('');
    setStartDate(undefined);
    setEndDate(undefined);
    onClose();
  };

  const handleCancel = () => {
    // Reset form and close dialog
    setMilestoneName('');
    setBudget('');
    setStartDate(undefined);
    setEndDate(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Milestone</DialogTitle>
          <DialogDescription>
            Create a new milestone for this project
          </DialogDescription>
        </DialogHeader>

        {/* Form Fields */}
        <div className="space-y-6 mt-4">
          {/* Milestone Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Milestone Name *
            </label>
            <input
              type="text"
              placeholder="Enter milestone name"
              value={milestoneName}
              onChange={(e) => setMilestoneName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
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

        {/* Footer Buttons */}
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleAddMilestone}
          >
            Add Milestone
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}