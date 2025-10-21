import React from 'react';
import { Plus, Mail, Shield, Briefcase, HardHat, CheckCircle } from 'lucide-react';

const UserManagement = () => {
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">User Management</h1>
            <p className="text-sm text-gray-500">Manage system users and their roles</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium">
            <Plus className="w-5 h-5" />
            Invite User
          </button>
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