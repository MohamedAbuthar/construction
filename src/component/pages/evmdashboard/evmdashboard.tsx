'use client';
import React, { use, useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ExternalLink, HeartPlus, Plus, Activity } from 'lucide-react';

const EVMDashboard = () => {
  const [hoveredBar, setHoveredBar] = useState<'cpi' | 'spi' | null>(null);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, bar: 'cpi' | 'spi') => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    setMouseY(y);
    setHoveredBar(bar);
  };

  const handleMouseLeave = () => {
    setHoveredBar(null);
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
              <Activity className="w-5 h-5 text-red-500" />
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
          
          <div className="relative h-64">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-12 w-16 flex flex-col justify-between text-sm text-gray-600">
              <span className="text-right pr-3">1</span>
              <span className="text-right pr-3">0.75</span>
              <span className="text-right pr-3">0.5</span>
              <span className="text-right pr-3">0.25</span>
              <span className="text-right pr-3">0</span>
            </div>
            
            {/* Chart area */}
            <div className="absolute left-25 right-25 top-0 bottom-12">
              {/* Gray background when hovering */}
              {hoveredBar && (
                <div className="absolute inset-0 bg-gray-200 pointer-events-none"></div>
              )}
              
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-t border-gray-300"></div>
                <div className="border-t border-gray-300"></div>
                <div className="border-t border-gray-300"></div>
                <div className="border-t border-gray-300"></div>
                <div className="border-t border-gray-300"></div>
              </div>
              
              {/* Bars container */}
              <div className="absolute inset-0 flex items-end">
                <div className="flex items-end w-full h-full gap-1">
                  {/* CPI Bar - Green */}
                  <div 
                    className="w-1/2 bg-green-600 cursor-pointer relative"
                    style={{ height: '91%' }}
                    onMouseMove={(e) => handleMouseMove(e, 'cpi')}
                    onMouseLeave={handleMouseLeave}
                  >
                  </div>
                  
                  {/* SPI Bar - Blue */}
                  <div 
                    className="w-1/2 bg-blue-600 cursor-pointer relative"
                    style={{ height: '89%' }}
                    onMouseMove={(e) => handleMouseMove(e, 'spi')}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Tooltip - shows when hovering either bar and follows mouse */}
                    {hoveredBar && (
                      <div 
                        className="absolute left-1/3 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded shadow-lg p-4 z-20 whitespace-nowrap pointer-events-none"
                        style={{ top: `${mouseY}px` }}
                      >
                        <div className="text-sm font-semibold text-gray-800 mb-2">Metro Station Constr...</div>
                        <div className="text-sm text-green-600 mb-1">Cost Performance Index : 0.91</div>
                        <div className="text-sm text-blue-600">Schedule Performance Index : 0.89</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* X-axis label */}
            <div className="absolute bottom-0 left-16 right-0 h-12 flex items-start justify-center pt-2">
              <span className="text-sm text-gray-600">Metro Station Constr...</span>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span className="text-sm text-gray-700">Cost Performance Index</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="text-sm text-gray-700">Schedule Performance Index</span>
            </div>
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
              <ExternalLink className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
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