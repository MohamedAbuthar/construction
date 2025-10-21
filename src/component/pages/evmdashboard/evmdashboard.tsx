'use client';

import React, { use, useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ExternalLink, HeartPlus, ActivityIcon } from 'lucide-react';
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
import router, { useRouter } from 'next/navigation';


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
    router.push(`/projects/view?id=${1}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">EVM Dashboard</h1>
          <p className="text-sm text-gray-500">Portfolio-level Earned Value Management metrics</p>
        </div>

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Portfolio CPI */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm text-gray-600">Portfolio CPI</span>
              <TrendingUp className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-red-500 mb-2">0.91</div>
            <span className="inline-block px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded">
              Behind
            </span>
          </div>

          {/* Portfolio SPI */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm text-gray-600">Portfolio SPI</span>
              <ActivityIcon className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-red-500 mb-2">0.89</div>
            <span className="inline-block px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded">
              Behind
            </span>
          </div>

          {/* Cost Variance */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm text-gray-600">Cost Variance</span>
              <DollarSign className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-red-500 mb-2">-₹25,00,000</div>
            <span className="inline-block px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded">
              Over Budget
            </span>
          </div>

          {/* Schedule Variance */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm text-gray-600">Schedule Variance</span>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-red-500 mb-2">-₹30,00,000</div>
            <span className="inline-block px-2 py-1 text-xs font-medium text-red-600 bg-red-50 rounded">
              Over Budget
            </span>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Portfolio Summary</h2>
          <p className="text-sm text-gray-500 mb-6">Aggregate values across all projects</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-sm text-gray-600 mb-2">Planned Value (PV)</div>
              <div className="text-2xl font-bold text-gray-900">₹2,80,00,000</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Earned Value (EV)</div>
              <div className="text-2xl font-bold text-gray-900">₹2,50,00,000</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Actual Cost (AC)</div>
              <div className="text-2xl font-bold text-gray-900">₹2,75,00,000</div>
            </div>
          </div>
        </div>
{/* Project Performance Indices */}
<div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
  <h2 className="text-xl font-bold text-gray-900 mb-1">Project Performance Indices</h2>
  <p className="text-sm text-gray-500 mb-6">CPI and SPI comparison across projects</p>

  <div className="relative h-90 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={[
          {
            project: 'Metro Station Construction',
            CPI: 0.91,
            SPI: 0.89,
          },
        ]}
        margin={{ top: 10, right: 30, left: 0, bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
        <XAxis
          dataKey="project"
          tick={{ fill: '#4B5563', fontSize: 12 }}
          interval={0}
          angle={0}
          dy={20}
        />
        <YAxis
          domain={[0, 1]}
          tick={{ fill: '#4B5563', fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #D1D5DB',
            borderRadius: '8px',
          }}
          formatter={(value: number | string, name: string) => [
            value,
            name === 'CPI' ? 'Cost Performance Index' : 'Schedule Performance Index',
          ]}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          wrapperStyle={{ paddingTop: '20px' }}
        />
<Bar
  dataKey="CPI"
  name="Cost Performance Index"
  fill="#16A34A"
  barSize={350}
  radius={[4, 4, 0, 0]}
/>
<Bar
  dataKey="SPI"
  name="Schedule Performance Index"
  fill="#2563EB"
  barSize={350}
  radius={[4, 4, 0, 0]}
/>

      </BarChart>
    </ResponsiveContainer>
  </div>
</div>


        {/* Project Breakdown */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Project Breakdown</h2>
          <p className="text-sm text-gray-500 mb-6">Individual project EVM metrics</p>
          
          {/* Project Card */}
          <div className="border border-gray-200 rounded-lg p-6 hover:bg-blue-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  Metro Station Construction - Phase 2
                </h3>
                <p className="text-xs text-gray-500">Last updated: 15/10/2025</p>
              </div>
<ExternalLink
  className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600"
  onClick={() => handleProjectClick(1)}
/>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div>
                <div className="text-xs text-gray-600 mb-1">CPI</div>
                <div className="text-lg font-bold text-gray-900 mb-1">0.91</div>
                <span className="inline-block px-2 py-0.5 text-xs font-medium text-red-600 bg-red-50 rounded">
                  Behind
                </span>
              </div>
              
              <div>
                <div className="text-xs text-gray-600 mb-1">SPI</div>
                <div className="text-lg font-bold text-gray-900 mb-1">0.89</div>
                <span className="inline-block px-2 py-0.5 text-xs font-medium text-red-600 bg-red-50 rounded">
                  Behind
                </span>
              </div>
              
              <div>
                <div className="text-xs text-gray-600 mb-1">PV</div>
                <div className="text-lg font-bold text-gray-900">₹2,80,00,000</div>
              </div>
              
              <div>
                <div className="text-xs text-gray-600 mb-1">EV</div>
                <div className="text-lg font-bold text-gray-900">₹2,50,00,000</div>
              </div>
              
              <div>
                <div className="text-xs text-gray-600 mb-1">AC</div>
                <div className="text-lg font-bold text-gray-900">₹2,75,00,000</div>
              </div>
              
              <div>
                <div className="text-xs text-gray-600 mb-1">CV</div>
                <div className="text-lg font-bold text-red-600">-₹25,00,000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVMDashboard;