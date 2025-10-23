'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, User, FileText, CheckCircle, XCircle, X } from 'lucide-react';

interface FundRequest {
  id: string;
  week: string;
  engineer: string;
  milestone: string;
  amount: number;
  status: 'under-review' | 'pending' | 'approved' | 'rejected';
  requestDate: string;
  description: string;
}

interface FundRequestStats {
  pending: number;
  approved: number;
  rejected: number;
  totalAmountPending: number;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

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

const calculateStats = (requests: FundRequest[]): FundRequestStats => {
  const pending = requests.filter(r => r.status === 'under-review').length;
  const approved = requests.filter(r => r.status === 'approved').length;
  const rejected = requests.filter(r => r.status === 'rejected').length;
  const totalAmountPending = requests
    .filter(r => r.status === 'under-review')
    .reduce((sum, r) => sum + r.amount, 0);
  
  return { pending, approved, rejected, totalAmountPending };
};

export default function Approvals() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [fundRequests, setFundRequests] = useState<FundRequest[]>(INITIAL_FUND_REQUESTS);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<FundRequest | null>(null);
  const [decisionNote, setDecisionNote] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const stats = calculateStats(fundRequests);

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const filteredRequests = fundRequests.filter(request => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'pending') return request.status === 'under-review';
    if (filterStatus === 'approved') return request.status === 'approved';
    if (filterStatus === 'rejected') return request.status === 'rejected';
    return true;
  });

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusColor = (status: FundRequest['status']): string => {
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

  const getStatusLabel = (status: FundRequest['status']): string => {
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

  const handleCopy = (id: string): void => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleViewDetails = (request: FundRequest): void => {
    setSelectedRequest(request);
    setDecisionNote('');
    setIsDetailsDialogOpen(true);
  };

  const handleApprove = (): void => {
    if (!selectedRequest) return;
    
    if (selectedRequest.status === 'under-review') {
      const updatedRequests = fundRequests.map(req =>
        req.id === selectedRequest.id ? { ...req, status: 'approved' as const } : req
      );
      setFundRequests(updatedRequests);
      showToast('Request Approved', 'success');
    }
    setIsDetailsDialogOpen(false);
    setDecisionNote('');
  };

  const handleReject = (): void => {
    if (!selectedRequest) return;
    
    if (!decisionNote.trim()) {
      alert('Please enter a decision note for rejection');
      return;
    }

    if (selectedRequest.status === 'under-review') {
      const updatedRequests = fundRequests.map(req =>
        req.id === selectedRequest.id ? { ...req, status: 'rejected' as const } : req
      );
      setFundRequests(updatedRequests);
      showToast('Request Rejected', 'error');
      setIsDetailsDialogOpen(false);
      setDecisionNote('');
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Fund Request Approvals</h1>
          <p className="text-sm sm:text-base text-gray-600">Review and approve fund requests from site engineers</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
              filterStatus === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Pending</h3>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.pending}</p>
        </div>
        <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Approved</h3>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.approved}</p>
        </div>
        <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Rejected</h3>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.rejected}</p>
        </div>
        <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-sm col-span-2 lg:col-span-1">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Total Amount (Pending)</h3>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{formatCurrency(stats.totalAmountPending)}</p>
        </div>
      </div>

      {/* Fund Requests - Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-lg border border-gray-200 p-4 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Fund Requests</h2>
          <p className="text-xs sm:text-sm text-gray-500">Requests awaiting your approval</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-1">
            <thead>
              <tr className="border-b-2 border-gray-300 bg-white-50">
                <th className="px-4 lg:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-500">Week</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-500">Engineer</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-500">Milestone</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-500">Amount</th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-gray-500">Status</th>
                <th className="px-4 lg:px-6 py-3 text-center text-xs sm:text-sm font-semibold text-gray-500"></th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-4 lg:px-6 py-4 text-xs sm:text-sm font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        {request.week}
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-xs sm:text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-400" />
                        {request.engineer}
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-xs sm:text-sm font-medium text-gray-900">{request.milestone}</td>
                    <td className="px-4 lg:px-6 py-4 text-xs sm:text-sm font-semibold text-gray-900">{formatCurrency(request.amount)}</td>
                    <td className="px-4 lg:px-6 py-4 text-xs sm:text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                        {getStatusLabel(request.status)}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-center">
                      <button
                        onClick={() => handleViewDetails(request)}
                        className="inline-flex items-center justify-center p-2 hover:bg-blue-600 rounded-lg transition"
                        title="View details"
                      >
                        <FileText size={18} className="text-white-800 hover:text-white-800" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 lg:px-6 py-8 text-center text-gray-500 text-sm">
                    No fund requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fund Requests - Mobile Card View */}
      <div className="md:hidden space-y-3">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Fund Requests</h2>
            <p className="text-xs text-gray-500">Requests awaiting your approval</p>
          </div>

          <div className="space-y-3">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-gray-700 mb-1">
                        <User size={14} className="text-gray-400" />
                        <span className="text-sm font-medium">{request.engineer}</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-900">{request.milestone}</div>
                    </div>
                    <button
                      onClick={() => handleViewDetails(request)}
                      className="inline-flex items-center justify-center p-2 hover:bg-blue-50 rounded-lg transition flex-shrink-0"
                      title="View details"
                    >
                      <FileText size={18} className="text-blue-600" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Calendar size={14} className="text-gray-400" />
                    <span>{request.week}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <div className="text-base font-bold text-gray-900">{formatCurrency(request.amount)}</div>
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                      {getStatusLabel(request.status)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-gray-500 text-sm">
                No fund requests found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fund Request Details Dialog - shadcn style */}
      {isDetailsDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsDetailsDialogOpen(false)}
          />
          
          {/* Dialog */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Fund Request Details</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Review the request and provide your decision</p>
                </div>
                <button
                  onClick={() => setIsDetailsDialogOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition rounded-sm hover:bg-gray-100 p-1"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            {selectedRequest && (
              <div className="overflow-y-auto flex-1 px-6 py-5">
                <div className="space-y-5">
                  {/* Engineer & Milestone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1.5">Engineer</p>
                      <p className="text-sm text-gray-900">{selectedRequest.engineer}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1.5">Milestone</p>
                      <p className="text-sm text-gray-900">{selectedRequest.milestone}</p>
                    </div>
                  </div>

                  {/* Week Start & Amount Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1.5">Week Start</p>
                      <p className="text-sm text-gray-900">{selectedRequest.week}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1.5">Amount</p>
                      <p className="text-sm text-gray-900 font-semibold">{formatCurrency(selectedRequest.amount)}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1.5">Description</p>
                    <p className="text-sm text-gray-900">{selectedRequest.description}</p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Status</p>
                    {selectedRequest.status === 'under-review' && (
                      <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-orange-500 text-white">
                        Under Review
                      </span>
                    )}
                    {selectedRequest.status === 'approved' && (
                      <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-green-600 text-white">
                        Approved
                      </span>
                    )}
                    {selectedRequest.status === 'rejected' && (
                      <span className="inline-block px-3 py-1 rounded-md text-xs font-semibold bg-red-600 text-white">
                        Rejected
                      </span>
                    )}
                  </div>

                  {/* Decision Note for Under Review */}
                  {selectedRequest.status === 'under-review' && (
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Decision Note</label>
                      <textarea
                        value={decisionNote}
                        onChange={(e) => setDecisionNote(e.target.value)}
                        placeholder="Enter your decision note (required for rejection)..."
                        rows={4}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 resize-none transition-all"
                      />
                    </div>
                  )}

                  {/* Decision Info for Approved */}
                  {selectedRequest.status === 'approved' && (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-gray-900">Decision</p>
                        <span className="text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-md">Approved</span>
                      </div>
                      <p className="text-sm text-gray-700">Approved as per budget allocation</p>
                      <p className="text-xs text-gray-500 mt-2">Decided on 10/14/2025, 4:00:00 PM</p>
                    </div>
                  )}

                  {/* Decision Info for Rejected */}
                  {selectedRequest.status === 'rejected' && (
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-gray-900">Decision</p>
                        <span className="text-xs font-semibold text-red-700 bg-red-100 px-2.5 py-1 rounded-md">Rejected</span>
                      </div>
                      <p className="text-sm text-gray-700">Budget already exhausted for this period. Please revise.</p>
                      <p className="text-xs text-gray-500 mt-2">Decided on 10/8/2025, 7:50:00 PM</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex flex-col-reverse sm:flex-row gap-3 justify-end flex-shrink-0 bg-gray-50">
              {selectedRequest?.status === 'under-review' && (
                <>
                  <button
                    onClick={handleReject}
                    // disabled={!decisionNote.trim()}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                  <button
                    onClick={handleApprove}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border animate-slide-in-right ${
              toast.type === 'success'
                ? 'bg-white border-green-200'
                : 'bg-white border-red-200'
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              {toast.type === 'success' ? (
                <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
              ) : (
                <XCircle size={20} className="text-red-600 flex-shrink-0" />
              )}
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {toast.message}
                </p>
                <p className="text-xs text-gray-600">
                  {toast.type === 'success' 
                    ? 'The fund request has been approved successfully.' 
                    : 'The fund request has been rejected.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}