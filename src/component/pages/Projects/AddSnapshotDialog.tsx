"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/component/ui/dialog"
import { Button } from "@/component/ui/button"

interface AddSnapshotDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddSnapshotDialog({ isOpen, onClose }: AddSnapshotDialogProps) {
  const [formData, setFormData] = useState({
    date: "",
    plannedValue: "",
    earnedValue: "",
    actualCost: "",
    description: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Snapshot data:", formData)
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add EVM Snapshot</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Snapshot Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Snapshot Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Planned Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Planned Value (PV)
            </label>
            <input
              type="number"
              name="plannedValue"
              value={formData.plannedValue}
              onChange={handleChange}
              placeholder="Enter planned value amount"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Earned Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Earned Value (EV)
            </label>
            <input
              type="number"
              name="earnedValue"
              value={formData.earnedValue}
              onChange={handleChange}
              placeholder="Enter earned value amount"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Actual Cost */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Actual Cost (AC)
            </label>
            <input
              type="number"
              name="actualCost"
              value={formData.actualCost}
              onChange={handleChange}
              placeholder="Enter actual cost amount"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add any notes about this snapshot"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Add Snapshot
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}