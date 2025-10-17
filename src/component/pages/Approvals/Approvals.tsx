'use client';

import React, { useState } from 'react';
import { Calendar, User, FileText, Copy } from 'lucide-react';
import { FundRequestStats, FundRequest } from '@/component/types';

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
    requestDate: '2025-10-13'
  }
];

export default function Approvals() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [fundRequests, setFundRequests] = useState<FundRequest[]>(INITIAL_FUND_REQUESTS);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
        return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
      case 'approved':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
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
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                        {getStatusLabel(request.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleCopy(request.id)}
                        className="inline-flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition"
                        title="Copy details"
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
    </div>
  );
}