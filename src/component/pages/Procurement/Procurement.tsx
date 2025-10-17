'use client';

import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { ProcurementStats, Product } from '@/component/types';


const INITIAL_STATS: ProcurementStats = {
  totalProducts: 4,
  totalPurchaseOrders: 4,
  totalPOValue: 12090000,
  inTransit: 2
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cement (OPC 53)',
    category: 'Building Materials',
    unit: 'bag',
    description: 'Ordinary Portland Cement Grade 53'
  },
  {
    id: '2',
    name: 'Rebar Steel (TMT 500D)',
    category: 'Steel',
    unit: 'ton',
    description: 'Thermo-Mechanically Treated steel bars'
  },
  {
    id: '3',
    name: 'PVC Pipes',
    category: 'Plumbing',
    unit: 'm',
    description: 'Various diameter PVC pipes'
  },
  {
    id: '4',
    name: 'Sand',
    category: 'Aggregates',
    unit: 'ton',
    description: 'River sand for construction'
  }
];

export default function Procurement() {
  const [activeTab, setActiveTab] = useState('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Procurement</h1>
        <p className="text-gray-600">Manage products and purchase orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Products</h3>
          <p className="text-3xl font-bold text-gray-900">{INITIAL_STATS.totalProducts}</p>
        </div>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Purchase Orders</h3>
          <p className="text-3xl font-bold text-gray-900">{INITIAL_STATS.totalPurchaseOrders}</p>
          <p className="text-xs text-gray-500 mt-1">1 received</p>
        </div>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total PO Value</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(INITIAL_STATS.totalPOValue)}</p>
        </div>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">In Transit</h3>
          <p className="text-3xl font-bold text-gray-900">{INITIAL_STATS.inTransit}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition ${
              activeTab === 'products'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-3 font-medium text-sm border-b-2 transition ${
              activeTab === 'orders'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Purchase Orders
          </button>
        </div>
      </div>

      {/* Products Tab Content */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Product Catalog</h2>
              <p className="text-sm text-gray-600">Master list of construction materials</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
              <Plus size={18} />
              Add Product
            </button>
          </div>

          {/* Search */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300 bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Unit</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{product.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{product.unit}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Purchase Orders Tab Content */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Purchase Orders</h2>
              <p className="text-sm text-gray-600">Track all purchase orders and deliveries</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
              <Plus size={18} />
              Create PO
            </button>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500">Purchase orders data coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );
}