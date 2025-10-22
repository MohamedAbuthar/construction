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
        return 'bg-white-100 text-gray-800 rounded-full border border-gray-300';
      case 'approved':
        return 'bg-white-100 text-gray-800 rounded-full border border-gray-300';
      case 'rejected':
        return 'bg-white-100 text-gray-800 rounded-full border border-gray-300';
      default:
        return 'bg-white-100 text-gray-800 rounded-full border border-gray-300';
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
          <h2 className="text-2xl font-semibold text-gray-900">Fund Requests</h2>
          <p className="text-sm text-gray-500">Requests awaiting your approval</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Week</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Engineer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Milestone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-500"></th>
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
                        className="inline-flex items-center justify-center p-2 hover:bg-blue-600 rounded-lg transition"
                        title="View details"
                      >
                        <FileText size={18} className="text-white-800 hover:text-blue-800" />
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
        <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[72%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-w-2xl bg-card bg-white max-w-[600px] w-full max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
            <DialogTitle className="text-gray-900 text-base font-semibold">
              Fund Request Details
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-sm mt-1">
              Review the request and provide your decision
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="overflow-y-auto flex-1">
              <div className="px-6 py-4 space-y-4">
                {/* Engineer & Milestone */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-2">Engineer</p>
                    <p className="text-sm text-gray-900">{selectedRequest.engineer}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-2">Milestone</p>
                    <p className="text-sm text-gray-900">{selectedRequest.milestone}</p>
                  </div>
                </div>

                {/* Week Start & Amount */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-2">Week Start</p>
                    <p className="text-sm text-gray-900">{selectedRequest.week}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-2">Amount</p>
                    <p className="text-sm text-gray-900">{formatCurrency(selectedRequest.amount)}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-2">Description</p>
                  <p className="text-sm text-gray-900">{selectedRequest.description}</p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-2">Status</p>
                  {selectedRequest.status === 'under-review' && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500 text-white">
                      Under Review
                    </span>
                  )}
                  {selectedRequest.status === 'approved' && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-600 text-white">
                      Approved
                    </span>
                  )}
                  {selectedRequest.status === 'rejected' && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-600 text-white">
                      Rejected
                    </span>
                  )}
                </div>

                {/* Decision Section - Different for each status */}
                {selectedRequest.status === 'under-review' && (
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-600 mb-2">Decision Note</p>
                      <textarea
                        value={decisionNote}
                        onChange={(e) => setDecisionNote(e.target.value)}
                        placeholder="Enter your decision note (required for rejection)..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 text-sm text-gray-900 resize-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                {selectedRequest.status === 'approved' && (
                  <div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-gray-900">Decision</p>
                        <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">Approved</span>
                      </div>
                      <p className="text-sm text-gray-700">Approved as per budget allocation</p>
                      <p className="text-xs text-gray-500 mt-2">Decided on 10/14/2025, 4:00:00 PM</p>
                    </div>
                  </div>
                )}

                {selectedRequest.status === 'rejected' && (
                  <div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-gray-900">Decision</p>
                        <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded">Rejected</span>
                      </div>
                      <p className="text-sm text-gray-700">Budget already exhausted for this period. Please revise.</p>
                      <p className="text-xs text-gray-500 mt-2">Decided on 10/8/2025, 7:50:00 PM</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Buttons - Fixed at bottom */}
          {selectedRequest?.status === 'under-review' && (
            <div className="px-6 py-4 border-t border-gray-200 flex gap-3 justify-end flex-shrink-0 bg-white">
              <button
                onClick={handleReject}
                disabled={!decisionNote.trim()}
                className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-semibold text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 transition"
              >
                <XCircle size={14} />
                Reject
              </button>
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 px-4 py-1.5 rounded text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                <CheckCircle size={14} />
                Approve
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}