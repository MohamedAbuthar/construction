'use client';

import React, { useState } from 'react';
import { Calendar, User, FileText, CheckCircle, XCircle } from 'lucide-react';
import { FundRequestStats, FundRequest } from '@/component/types';
import { Button } from '@/component/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/component/ui/dialog';

const INITIAL_STATS: FundRequestStats = {
  pending: 1,
  approved: 1,
  rejected: 1,
  totalAmountPending: 200000
};

const INITIAL_FUND_REQUESTS: FundRequest[] = [
  {
    id: '1',
    week: '10/13/2025',
    engineer: 'Priya Singh',
    milestone: 'Tower Construction',
    amount: 200000,
    status: 'under-review',
    requestDate: '2025-10-13',
    description: 'Steel reinforcement and concrete for slab casting'
  },
  {
    id: '2',
    week: '10/06/2025',
    engineer: 'Raj Kumar',
    milestone: 'Foundation Work',
    amount: 150000,
    status: 'approved',
    requestDate: '2025-10-06',
    description: 'Excavation and foundation concrete work'
  },
  {
    id: '3',
    week: '09/29/2025',
    engineer: 'Anita Patel',
    milestone: 'Structural Framework',
    amount: 300000,
    status: 'rejected',
    requestDate: '2025-09-29',
    description: 'Structural steel and framework materials'
  }
];

export default function Approvals() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [fundRequests, setFundRequests] = useState<FundRequest[]>(INITIAL_FUND_REQUESTS);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<FundRequest | null>(null);
  const [decisionNote, setDecisionNote] = useState('');

  const filteredRequests = fundRequests.filter(request => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'pending') return request.status === 'under-review';
    if (filterStatus === 'approved') return request.status === 'approved';
    if (filterStatus === 'rejected') return request.status === 'rejected';
    return true;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'under-review':
        return 'Under Review';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const handleCopy = (id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleViewDetails = (request: FundRequest) => {
    setSelectedRequest(request);
    setDecisionNote('');
    setIsDetailsDialogOpen(true);
  };

  const handleApprove = () => {
    if (!selectedRequest) return;
    
    if (selectedRequest.status === 'under-review') {
      const updatedRequests = fundRequests.map(req =>
        req.id === selectedRequest.id ? { ...req, status: 'approved' as const } : req
      );
      setFundRequests(updatedRequests);
    }
    setIsDetailsDialogOpen(false);
    setDecisionNote('');
  };

  const handleReject = () => {
    if (!selectedRequest || !decisionNote.trim()) {
      alert('Please enter a decision note for rejection');
      return;
    }

    if (selectedRequest.status === 'under-review') {
      const updatedRequests = fundRequests.map(req =>
        req.id === selectedRequest.id ? { ...req, status: 'rejected' as const } : req
      );
      setFundRequests(updatedRequests);
    }
    setIsDetailsDialogOpen(false);
    setDecisionNote('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fund Request Approvals</h1>
          <p className="text-gray-600">Review and approve fund requests from site engineers</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterStatus === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending ({INITIAL_STATS.pending})
          </button>
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filterStatus === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({fundRequests.length})
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Pending</h3>
          <p className="text-3xl font-bold text-gray-900">{INITIAL_STATS.pending}</p>
        </div>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Approved</h3>
          <p className="text-3xl font-bold text-gray-900">{INITIAL_STATS.approved}</p>
        </div>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Rejected</h3>
          <p className="text-3xl font-bold text-gray-900">{INITIAL_STATS.rejected}</p>
        </div>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Amount (Pending)</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(INITIAL_STATS.totalAmountPending)}</p>
        </div>
      </div>

      {/* Fund Requests Table */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Fund Requests</h2>
          <p className="text-sm text-gray-600">Requests awaiting your approval</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Week</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Engineer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Milestone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        {request.week}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        {request.engineer}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{request.milestone}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatCurrency(request.amount)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                        {getStatusLabel(request.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleViewDetails(request)}
                        className="inline-flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition"
                        title="View details"
                      >
                        <FileText size={18} className="text-gray-400 hover:text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No fund requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fund Request Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="bg-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900 text-xl font-bold">
              Fund Request Details
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Review the request and provide your decision
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6 py-4">
              {/* Table-like layout for Engineer and Milestone */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 w-1/2 border-r border-gray-200">
                        Engineer
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 w-1/2">
                        Milestone
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-200">
                        {selectedRequest.engineer}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        {selectedRequest.milestone}
                      </td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 border-r border-gray-200">
                        Week Start
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50">
                        Amount
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-r border-gray-200">
                        {selectedRequest.week}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        {formatCurrency(selectedRequest.amount)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-900">{selectedRequest.description}</p>
                </div>
              </div>

              {/* Status and Decision Note in two columns */}
              <div className="grid grid-cols-2 gap-6">
                {/* Status */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedRequest.status)}`}>
                      {getStatusLabel(selectedRequest.status)}
                    </span>
                  </div>
                </div>

                {/* Decision Note (only for pending requests) */}
                {selectedRequest.status === 'under-review' && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Decision Note
                      <span className="text-red-500 ml-1">*</span>
                    </h3>
                    <textarea
                      value={decisionNote}
                      onChange={(e) => setDecisionNote(e.target.value)}
                      placeholder="Enter your decision note (required for rejection)..."
                      rows={3}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 text-gray-900 resize-none transition-colors"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-3 sm:justify-between">
            <Button
              variant="outline"
              onClick={() => setIsDetailsDialogOpen(false)}
              className="flex-1"
            >
              Close
            </Button>
            
            {selectedRequest?.status === 'under-review' && (
              <div className="flex gap-3 flex-1">
                <Button
                  variant="outline"
                  onClick={handleReject}
                  disabled={!decisionNote.trim()}
                  className="flex items-center gap-2 flex-1 bg-red-600 text-white hover:bg-red-700 border-red-600 disabled:bg-gray-400 disabled:border-gray-400"
                >
                  <XCircle size={18} />
                  Reject
                </Button>
                <Button
                  onClick={handleApprove}
                  className="flex items-center gap-2 flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle size={18} />
                  Approve
                </Button>
              </div>
            )}
            
            {selectedRequest?.status !== 'under-review' && (
              <Button
                onClick={() => setIsDetailsDialogOpen(false)}
                className="flex-1"
              >
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}