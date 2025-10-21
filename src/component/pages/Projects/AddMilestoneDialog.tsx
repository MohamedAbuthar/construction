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
import { useState } from 'react';

interface AddMilestoneDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMilestoneDialog({ isOpen, onClose }: AddMilestoneDialogProps) {
  const [milestoneName, setMilestoneName] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
    setStartDate('');
    setEndDate('');
    onClose();
  };

  const handleCancel = () => {
    // Reset form and close dialog
    setMilestoneName('');
    setBudget('');
    setStartDate('');
    setEndDate('');
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

          {/* Planned Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Planned Start Date
              </label>
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Planned End Date
              </label>
              <input
                type="text"
                placeholder="mm/dd/yyyy"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
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