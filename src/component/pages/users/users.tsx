'use client';
import React, { useState } from 'react';
import { Plus, Mail, Shield, Briefcase, HardHat, CheckCircle, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/component/ui/dialog';

const UserManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    status: '',
    joined: undefined as Date | undefined
  });

  const users = [
    {
      name: 'Admin User',
      email: 'admin@thartius.com',
      role: 'Admin',
      roleColor: 'bg-blue-500',
      roleIcon: <Shield className="w-3 h-3" />,
      status: 'Active',
      joined: '17/10/2025'
    },
    {
      name: 'Finance Manager',
      email: 'finance@thartius.com',
      role: 'Finance Manager',
      roleColor: 'bg-cyan-500',
      roleIcon: <Briefcase className="w-3 h-3" />,
      status: 'Active',
      joined: '17/10/2025'
    },
    {
      name: 'Rajesh Kumar',
      email: 'rajesh@thartius.com',
      role: 'Site Engineer',
      roleColor: 'bg-green-500',
      roleIcon: <HardHat className="w-3 h-3" />,
      status: 'Active',
      joined: '17/10/2025'
    },
    {
      name: 'Priya Singh',
      email: 'priya@thartius.com',
      role: 'Site Engineer',
      roleColor: 'bg-green-500',
      roleIcon: <HardHat className="w-3 h-3" />,
      status: 'Active',
      joined: '17/10/2025'
    }
  ];

  const formatDate = (date: string | number | Date | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleInviteUser = () => {
    console.log('Inviting user:', {
      ...newUser,
      joined: formatDate(newUser.joined)
    });
    setIsDialogOpen(false);
    setNewUser({
      name: '',
      email: '',
      role: '',
      status: '',
      joined: undefined
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const isSameDay = (date1: Date | undefined, date2: Date) => {
    if (!date1) return false;
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isToday = (day: number, month: Date) => {
    const today = new Date();
    return day === today.getDate() &&
           month.getMonth() === today.getMonth() &&
           month.getFullYear() === today.getFullYear();
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const days = [];
    const monthNames = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const selected = isSameDay(newUser.joined, date);
      const todayDate = isToday(day, currentMonth);

      days.push(
        <button
          key={day}
          onClick={() => {
            setNewUser({ ...newUser, joined: date });
            setIsCalendarOpen(false);
          }}
          className={`h-8 w-8 text-sm rounded-md flex items-center justify-center transition-colors
            ${selected ? 'bg-blue-600 text-white font-medium hover:bg-blue-700' : ''}
            ${todayDate && !selected ? 'bg-blue-600 text-white font-bold' : ''}
            ${!selected && !todayDate ? 'hover:bg-gray-100 text-gray-900' : ''}
          `}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-lg w-64">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="font-semibold text-sm">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </div>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">User Management</h1>
            <p className="text-sm text-gray-500">Manage system users and their roles</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Plus className="w-5 h-5" />
                Invite User
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Invite New User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email"
                  />
                </div>

                {/* Role Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select role</option>
                    <option value="Admin">Admin</option>
                    <option value="Finance Manager">Finance Manager</option>
                    <option value="Site Engineer">Site Engineer</option>
                  </select>
                </div>

                {/* Status Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={newUser.status}
                    onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Joined Date with Calendar */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Joined
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white flex items-center justify-between"
                    >
                      <span className={newUser.joined ? "text-gray-900" : "text-gray-400"}>
                        {newUser.joined ? formatDate(newUser.joined) : "Select date"}
                      </span>
                      <Calendar className="w-4 h-4 text-gray-400" />
                    </button>
                    {isCalendarOpen && (
                      <div className="absolute bottom-full mb-2 z-10">
                        {renderCalendar()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleInviteUser}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Invite User
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-2">Total Users</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">4</div>
            <div className="text-xs text-gray-500">4 active</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-2">Admins</div>
            <div className="text-3xl font-bold text-gray-900">1</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-2">Finance</div>
            <div className="text-3xl font-bold text-gray-900">1</div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-sm text-gray-600 mb-2">Engineers</div>
            <div className="text-3xl font-bold text-gray-900">2</div>
          </div>
        </div>

        {/* All Users Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1">All Users</h2>
          <p className="text-sm text-gray-500 mb-6">Manage user access and roles</p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white ${user.roleColor}`}>
                        {user.roleIcon}
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        {user.status}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{user.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Admin</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Full system access including:</p>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>Project management</span>
              </li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>User management</span>
              </li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>Financial approvals</span>
              </li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>System settings</span>
              </li>
            </ul>
          </div>

          {/* Finance Manager Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-cyan-600" />
              <h3 className="text-lg font-bold text-gray-900">Finance Manager</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Financial operations including:</p>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>View projects and EVM</span>
              </li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>Approve fund requests</span>
              </li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>Procurement oversight</span>
              </li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>Budget monitoring</span>
              </li>
            </ul>
          </div>

          {/* Site Engineer Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <HardHat className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900">Site Engineer</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Field operations including:</p>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>Daily work logs</span>
              </li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>Weekly fund requests</span>
              </li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>Activity updates</span>
              </li>
              <li className="text-sm text-gray-600 flex items-start">
                <span className="mr-2">•</span>
                <span>Site check-ins</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;