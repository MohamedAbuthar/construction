'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ExternalLink, ActivityIcon } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useRouter } from 'next/navigation';

const EVMDashboard = () => {
  const [hoveredBar, setHoveredBar] = useState<'cpi' | 'spi' | null>(null);
  const [mouseY, setMouseY] = useState(0);
  const router = useRouter();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, bar: 'cpi' | 'spi') => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    setMouseY(y);
    setHoveredBar(bar);
  };

  const handleMouseLeave = () => {
    setHoveredBar(null);
  };

  const handleProjectClick = (projectId: number) => {
    router.push(`/projects/view?id=${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-3 xs:mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">EVM Dashboard</h1>
          <p className="text-xs text-gray-500">Portfolio-level Earned Value Management metrics</p>
        </div>

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mb-3 xs:mb-4 sm:mb-6">
          {/* Portfolio CPI */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 xs:p-4 sm:p-5 lg:p-6">
            <div className="flex items-start justify-between mb-1 xs:mb-2 sm:mb-3">
              <span className="text-xs text-gray-600">Portfolio CPI</span>
              <TrendingUp className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
            </div>
            <div className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-red-500 mb-1">0.91</div>
            <span className="inline-block px-1 xs:px-2 py-0.5 xs:py-1 text-xs font-medium text-red-600 bg-red-50 rounded">
              Behind
            </span>
          </div>

          {/* Portfolio SPI */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 xs:p-4 sm:p-5 lg:p-6">
            <div className="flex items-start justify-between mb-1 xs:mb-2 sm:mb-3">
              <span className="text-xs text-gray-600">Portfolio SPI</span>
              <ActivityIcon className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
            </div>
            <div className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-red-500 mb-1">0.89</div>
            <span className="inline-block px-1 xs:px-2 py-0.5 xs:py-1 text-xs font-medium text-red-600 bg-red-50 rounded">
              Behind
            </span>
          </div>

          {/* Cost Variance */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 xs:p-4 sm:p-5 lg:p-6">
            <div className="flex items-start justify-between mb-1 xs:mb-2 sm:mb-3">
              <span className="text-xs text-gray-600">Cost Variance</span>
              <DollarSign className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
            </div>
            <div className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-red-500 mb-1">-₹25,00,000</div>
            <span className="inline-block px-1 xs:px-2 py-0.5 xs:py-1 text-xs font-medium text-red-600 bg-red-50 rounded">
              Over Budget
            </span>
          </div>

          {/* Schedule Variance */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 xs:p-4 sm:p-5 lg:p-6">
            <div className="flex items-start justify-between mb-1 xs:mb-2 sm:mb-3">
              <span className="text-xs text-gray-600">Schedule Variance</span>
              <TrendingDown className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
            </div>
            <div className="text-base xs:text-lg sm:text-xl lg:text-2xl font-bold text-red-500 mb-1">-₹30,00,000</div>
            <span className="inline-block px-1 xs:px-2 py-0.5 xs:py-1 text-xs font-medium text-red-600 bg-red-50 rounded">
              Over Budget
            </span>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-2 xs:p-3 sm:p-4 lg:p-6 mb-3 xs:mb-4 sm:mb-6">
          <h2 className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1">Portfolio Summary</h2>
          <p className="text-xs text-gray-500 mb-2 xs:mb-3 sm:mb-4">Aggregate values across all projects</p>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 lg:gap-6">
            <div className="min-w-0">
              <div className="text-xs text-gray-600 mb-1">Planned Value (PV)</div>
              <div className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate" title="₹2,80,00,000">
                ₹2,80,00,000
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-xs text-gray-600 mb-1">Earned Value (EV)</div>
              <div className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate" title="₹2,50,00,000">
                ₹2,50,00,000
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-xs text-gray-600 mb-1">Actual Cost (AC)</div>
              <div className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate" title="₹2,75,00,000">
                ₹2,75,00,000
              </div>
            </div>
          </div>
        </div>

        {/* Project Performance Indices */}
        <div className="bg-white rounded-lg border border-gray-200 p-2 xs:p-3 sm:p-4 lg:p-6 mb-3 xs:mb-4 sm:mb-6">
          <h2 className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1">Project Performance Indices</h2>
          <p className="text-xs text-gray-500 mb-2 xs:mb-3 sm:mb-4">CPI and SPI comparison across projects</p>

          <div className="relative h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  {
                    project: 'Metro Station Construction - Phase 2',
                    CPI: 0.91,
                    SPI: 0.89,
                  },
                ]}
                margin={{ top: 5, right: 5, left: 0, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis
                  dataKey="project"
                  tick={{ fill: '#4B5563', fontSize: 10 }}
                  interval={0}
                  angle={0}
                  dy={10}
                />
                <YAxis
                  domain={[0, 1]}
                  tick={{ fill: '#4B5563', fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #D1D5DB',
                    borderRadius: '6px',
                    fontSize: '11px',
                  }}
                  formatter={(value: number | string, name: string) => [
                    value,
                    name === 'CPI' ? 'Cost Performance Index' : 'Schedule Performance Index',
                  ]}
                />
                <Legend
                  verticalAlign="bottom"
                  height={30}
                  iconType="circle"
                  wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }}
                />
                <Bar
                  dataKey="CPI"
                  name="Cost Performance Index"
                  fill="#16A34A"
                  barSize={200}
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="SPI"
                  name="Schedule Performance Index"
                  fill="#2563EB"
                  barSize={200}
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 p-2 xs:p-3 sm:p-4 lg:p-6">
          <h2 className="text-sm xs:text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1">Project Breakdown</h2>
          <p className="text-xs text-gray-500 mb-2 xs:mb-3 sm:mb-4">Individual project EVM metrics</p>
          
          {/* Project Card */}
          <div className="border border-gray-200 rounded-lg p-2 xs:p-3 sm:p-4 lg:p-6 hover:bg-blue-50 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-2 xs:mb-3 sm:mb-4">
              <div className="flex-1 min-w-0 pr-1 xs:pr-2">
                <h3 className="text-xs xs:text-sm sm:text-base font-semibold text-gray-900 mb-1 break-words">
                  Metro Station Construction - Phase 2
                </h3>
                <p className="text-xs text-gray-500">Last updated: 15/10/2025</p>
              </div>
              <ExternalLink
                className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-gray-400 cursor-pointer hover:text-gray-600 flex-shrink-0 mt-0.5 xs:mt-1"
                onClick={() => handleProjectClick(1)}
              />
            </div>
            
            <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-6 gap-1 xs:gap-2 sm:gap-3">
              {/* CPI Column */}
              <div className="min-w-0 text-center">
                <div className="text-xs text-gray-600 mb-0.5 xs:mb-1">CPI</div>
                <div className="text-xs xs:text-sm sm:text-base font-bold text-gray-900 mb-0.5 xs:mb-1">0.91</div>
                <span className="inline-block px-1 xs:px-2 py-0.5 text-xs font-medium text-red-600 bg-red-50 rounded">
                  Behind
                </span>
              </div>
              
              {/* SPI Column */}
              <div className="min-w-0 text-center">
                <div className="text-xs text-gray-600 mb-0.5 xs:mb-1">SPI</div>
                <div className="text-xs xs:text-sm sm:text-base font-bold text-gray-900 mb-0.5 xs:mb-1">0.89</div>
                <span className="inline-block px-1 xs:px-2 py-0.5 text-xs font-medium text-red-600 bg-red-50 rounded">
                  Behind
                </span>
              </div>
              
              <div className="min-w-0 text-center">
                <div className="text-xs text-gray-600 mb-0.5 xs:mb-1">PV</div>
                <div className="text-xs xs:text-sm font-bold text-gray-900 truncate" title="₹2,80,00,000">₹2,80,00,000</div>
              </div>
              
              <div className="min-w-0 text-center">
                <div className="text-xs text-gray-600 mb-0.5 xs:mb-1">EV</div>
                <div className="text-xs xs:text-sm font-bold text-gray-900 truncate" title="₹2,50,00,000">₹2,50,00,000</div>
              </div>
              
              <div className="min-w-0 text-center">
                <div className="text-xs text-gray-600 mb-0.5 xs:mb-1">AC</div>
                <div className="text-xs xs:text-sm font-bold text-gray-900 truncate" title="₹2,75,00,000">₹2,75,00,000</div>
              </div>
              
              <div className="min-w-0 text-center">
                <div className="text-xs text-gray-600 mb-0.5 xs:mb-1">CV</div>
                <div className="text-xs xs:text-sm font-bold text-red-600 truncate" title="-₹25,00,000">-₹25,00,000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVMDashboard;