'use client';

import React, { useState } from 'react';
import { Search, Plus, Calendar, Building, Package, Truck, CheckCircle, Download, FileText, X } from 'lucide-react';

interface ProcurementStats {
  totalProducts: number;
  totalPurchaseOrders: number;
  totalPOValue: number;
  inTransit: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  description: string;
}

interface PurchaseOrder {
  id: string;
  project: string;
  milestone: string;
  product: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  status: 'Received' | 'In Transit' | 'In Production';
  deliveryDate: string;
  progress: number;
  supplier?: string;
  poNumber?: string;
  orderDate?: string;
  estimatedDelivery?: string;
  shippingAddress?: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  deliveryHistory?: {
    date: string;
    quantity: number;
    unit: string;
    grnReference: string;
  }[];
}

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

const INITIAL_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: '1',
    project: 'Metro Station Construction - Phase 2',
    milestone: 'Structural Framework',
    product: 'Cement (OPC 53)',
    quantity: 5000,
    unit: 'bag',
    unitPrice: 450,
    total: 2250000,
    status: 'Received',
    deliveryDate: '4/15/2025',
    progress: 100,
    supplier: 'ABC Cement Suppliers',
    poNumber: 'PO-2025-001',
    orderDate: '3/15/2025',
    estimatedDelivery: '4/15/2025',
    shippingAddress: 'Metro Station Site, Downtown Area, City Center',
    contactPerson: 'John Smith',
    phone: '+91 9876543210',
    email: 'john.smith@metrosite.com',
    deliveryHistory: [
      {
        date: '4/15/2025',
        quantity: 3000,
        unit: 'bag',
        grnReference: 'GRN-001'
      },
      {
        date: '4/18/2025',
        quantity: 2000,
        unit: 'bag',
        grnReference: 'GRN-002'
      }
    ]
  },
  {
    id: '2',
    project: 'Metro Station Construction - Phase 2',
    milestone: 'Structural Framework',
    product: 'Rebar Steel (TMT 500D)',
    quantity: 150,
    unit: 'ton',
    unitPrice: 55000,
    total: 8250000,
    status: 'In Transit',
    deliveryDate: '4/20/2025',
    progress: 50,
    supplier: 'Steel World Ltd.',
    poNumber: 'PO-2025-002',
    orderDate: '3/20/2025',
    estimatedDelivery: '4/20/2025',
    shippingAddress: 'Metro Station Site, Downtown Area, City Center',
    contactPerson: 'John Smith',
    phone: '+91 9876543210',
    email: 'john.smith@metrosite.com',
    deliveryHistory: [
      {
        date: '4/10/2025',
        quantity: 75,
        unit: 'ton',
        grnReference: 'GRN-003'
      }
    ]
  },
  {
    id: '3',
    project: 'Residential Complex - Tower A',
    milestone: 'Tower Construction',
    product: 'Cement (OPC 53)',
    quantity: 3000,
    unit: 'bag',
    unitPrice: 450,
    total: 1350000,
    status: 'In Production',
    deliveryDate: '9/30/2025',
    progress: 0,
    supplier: 'XYZ Cement Corp',
    poNumber: 'PO-2025-003',
    orderDate: '8/15/2025',
    estimatedDelivery: '9/30/2025',
    shippingAddress: 'Residential Complex Site, Suburban Area',
    contactPerson: 'Sarah Johnson',
    phone: '+91 9876543211',
    email: 'sarah.j@residential.com',
    deliveryHistory: []
  },
  {
    id: '4',
    project: 'Residential Complex - Tower A',
    milestone: 'Tower Construction',
    product: 'Sand',
    quantity: 200,
    unit: 'ton',
    unitPrice: 1200,
    total: 240000,
    status: 'In Transit',
    deliveryDate: '10/10/2025',
    progress: 50,
    supplier: 'River Sand Suppliers',
    poNumber: 'PO-2025-004',
    orderDate: '9/10/2025',
    estimatedDelivery: '10/10/2025',
    shippingAddress: 'Residential Complex Site, Suburban Area',
    contactPerson: 'Sarah Johnson',
    phone: '+91 9876543211',
    email: 'sarah.j@residential.com',
    deliveryHistory: [
      {
        date: '10/5/2025',
        quantity: 100,
        unit: 'ton',
        grnReference: 'GRN-004'
      }
    ]
  }
];

const UNIT_OPTIONS = ['Bag', 'Ton', 'Meter', 'kg', 'ltr', 'Piece', 'box'];
const PROJECT_OPTIONS = [
  'Metro Station Construction - Phase 2',
  'Residential Complex - Tower A',
  'Commercial Plaza Development',
  'Highway Expansion Project'
];
const MILESTONE_OPTIONS = [
  'Structural Framework',
  'Tower Construction',
  'Foundation Work',
  'MEP Installation'
];

export default function Procurement() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [orderSearchTerm, setOrderSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(INITIAL_PURCHASE_ORDERS);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isPODialogOpen, setIsPODialogOpen] = useState(false);
  const [isPODetailsDialogOpen, setIsPODetailsDialogOpen] = useState(false);
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);
  const [stats, setStats] = useState<ProcurementStats>(INITIAL_STATS);

  const [productFormData, setProductFormData] = useState({
    name: '',
    category: '',
    unit: 'Ton',
    description: ''
  });

  const [poFormData, setPoFormData] = useState({
    project: '',
    milestone: '',
    product: '',
    quantity: '',
    unit: 'Ton',
    unitPrice: '',
    poDate: '',
    expectedDelivery: '',
    status: 'PO Released'
  });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  const filteredOrders = purchaseOrders.filter(order =>
    order.project.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
    order.product.toLowerCase().includes(orderSearchTerm.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Received':
        return 'bg-white-50 text-gray-700 border-gray-200';
      case 'In Transit':
        return 'bg-white-50 text-gray-700 border-gray-200';
      case 'In Production':
        return 'bg-white-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const handleProductInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePOInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPoFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = () => {
    if (!productFormData.name || !productFormData.category || !productFormData.description) {
      alert('Please fill in all fields');
      return;
    }

    const newProduct: Product = {
      id: String(products.length + 1),
      name: productFormData.name,
      category: productFormData.category,
      unit: productFormData.unit,
      description: productFormData.description
    };

    setProducts([...products, newProduct]);
    setStats(prev => ({
      ...prev,
      totalProducts: prev.totalProducts + 1
    }));

    setProductFormData({
      name: '',
      category: '',
      unit: 'Ton',
      description: ''
    });

    setIsProductDialogOpen(false);
  };

  const handleCreatePO = () => {
    if (!poFormData.project || !poFormData.product || !poFormData.quantity || !poFormData.unitPrice) {
      alert('Please fill in all required fields');
      return;
    }

    const newPO: PurchaseOrder = {
      id: String(purchaseOrders.length + 1),
      project: poFormData.project,
      milestone: poFormData.milestone || 'Structural Framework',
      product: poFormData.product,
      quantity: Number(poFormData.quantity),
      unit: poFormData.unit,
      unitPrice: Number(poFormData.unitPrice),
      total: Number(poFormData.quantity) * Number(poFormData.unitPrice),
      status: 'In Production',
      deliveryDate: poFormData.expectedDelivery,
      progress: 0,
      supplier: 'Default Supplier',
      poNumber: `PO-2025-${String(purchaseOrders.length + 1).padStart(3, '0')}`,
      orderDate: poFormData.poDate,
      estimatedDelivery: poFormData.expectedDelivery,
      shippingAddress: 'Construction Site',
      contactPerson: 'Site Manager',
      phone: '+91 0000000000',
      email: 'manager@construction.com',
      deliveryHistory: []
    };

    setPurchaseOrders([...purchaseOrders, newPO]);
    setStats(prev => ({
      ...prev,
      totalPurchaseOrders: prev.totalPurchaseOrders + 1,
      totalPOValue: prev.totalPOValue + newPO.total
    }));

    setPoFormData({
      project: '',
      milestone: '',
      product: '',
      quantity: '',
      unit: 'Ton',
      unitPrice: '',
      poDate: '',
      expectedDelivery: '',
      status: 'PO Released'
    });

    setIsPODialogOpen(false);
  };

  const handlePOClick = (order: PurchaseOrder) => {
    setSelectedPO(order);
    setIsPODetailsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-4 sm:space-y-5 md:space-y-6 p-3 sm:p-4 md:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="pt-1 sm:pt-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Procurement</h1>
          <p className="text-gray-600 mt-1 text-xs sm:text-sm">Manage products and purchase orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          <div className="p-3 sm:p-4 md:p-5 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Products</h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
          </div>
          <div className="p-3 sm:p-4 md:p-5 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Purchase Orders</h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{stats.totalPurchaseOrders}</p>
            <p className="text-xs text-gray-500 mt-1">1 received</p>
          </div>
          <div className="p-3 sm:p-4 md:p-5 bg-white rounded-lg border border-gray-200 shadow-sm col-span-2 lg:col-span-1">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">Total PO Value</h3>
            <p className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 break-words">{formatCurrency(stats.totalPOValue)}</p>
          </div>
          <div className="p-3 sm:p-4 md:p-5 bg-white rounded-lg border border-gray-200 shadow-sm col-span-2 lg:col-span-1">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">In Transit</h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{stats.inTransit}</p>
          </div>
        </div>

        {/* Tabs Container */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          {/* Tab Headers */}
          <div className="border-b border-gray-200 bg-gray-50 p-2">
            <nav className="flex space-x-2">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex-1 sm:flex-none py-2 px-4 sm:px-6 font-medium text-xs sm:text-sm transition-all rounded-lg ${
                  activeTab === 'products'
                    ? 'text-gray-900 bg-white border border-gray-200 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex-1 sm:flex-none py-2 px-4 sm:px-6 font-medium text-xs sm:text-sm transition-all rounded-lg ${
                  activeTab === 'orders'
                    ? 'text-gray-900 bg-white border border-gray-200 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Purchase Orders
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-3 sm:p-4 md:p-6">
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 truncate">Product Catalog</h2>
                    <p className="text-xs sm:text-sm text-gray-600">Master list of construction materials</p>
                  </div>
                  <button
                    onClick={() => setIsProductDialogOpen(true)}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    <Plus size={16} />
                    Add Product
                  </button>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={productSearchTerm}
                    onChange={(e) => setProductSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* Products Table - Desktop */}
                <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Product Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Unit</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{product.category}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{product.unit}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{product.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Products Cards - Mobile & Tablet */}
                <div className="md:hidden space-y-3">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-gray-900 text-sm flex-1 min-w-0 break-words">{product.name}</h3>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded whitespace-nowrap flex-shrink-0">{product.unit}</span>
                      </div>
                      <p className="text-xs text-gray-600">{product.category}</p>
                      <p className="text-xs text-gray-500 break-words">{product.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Purchase Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 truncate">Purchase Orders</h2>
                    <p className="text-xs sm:text-sm text-gray-600">Track material orders and deliveries</p>
                  </div>
                  <button 
                    onClick={() => setIsPODialogOpen(true)}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                  >
                    <Plus size={16} />
                    New PO
                  </button>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search purchase orders..."
                    value={orderSearchTerm}
                    onChange={(e) => setOrderSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {/* PO Table - Desktop */}
                <div className="hidden lg:block overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 min-w-[200px]">Project</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 min-w-[150px]">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Quantity</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Unit Price</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Total</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 min-w-[120px]">Delivery</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr 
                          key={order.id} 
                          className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition"
                          onClick={() => handlePOClick(order)}
                        >
                          <td className="px-4 py-3">
                            <div className="text-sm font-medium text-gray-900">{order.project}</div>
                            <div className="text-xs text-gray-500">{order.milestone}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">{order.product}</td>
                          <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{order.quantity} {order.unit}</td>
                          <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{formatCurrency(order.unitPrice)}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 whitespace-nowrap">{formatCurrency(order.total)}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 min-w-[60px]">
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-blue-500"
                                    style={{ width: `${order.progress}%` }}
                                  />
                                </div>
                              </div>
                              <span className="text-xs text-gray-600 whitespace-nowrap">{order.progress}%</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                              <Calendar size={12} />
                              {order.deliveryDate}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* PO Cards - Mobile & Tablet */}
                <div className="lg:hidden space-y-3">
                  {filteredOrders.map((order) => (
                    <div 
                      key={order.id} 
                      className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 space-y-3 active:bg-blue-50 cursor-pointer transition"
                      onClick={() => handlePOClick(order)}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm break-words">{order.project}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">{order.milestone}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap flex-shrink-0 ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs">
                        <div className="min-w-0">
                          <span className="text-gray-500 block mb-0.5">Product:</span>
                          <p className="font-medium text-gray-900 break-words">{order.product}</p>
                        </div>
                        <div className="min-w-0">
                          <span className="text-gray-500 block mb-0.5">Quantity:</span>
                          <p className="font-medium text-gray-900">{order.quantity} {order.unit}</p>
                        </div>
                        <div className="min-w-0">
                          <span className="text-gray-500 block mb-0.5">Unit Price:</span>
                          <p className="font-medium text-gray-900 break-words">{formatCurrency(order.unitPrice)}</p>
                        </div>
                        <div className="min-w-0">
                          <span className="text-gray-500 block mb-0.5">Total:</span>
                          <p className="font-semibold text-gray-900 break-words">{formatCurrency(order.total)}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-100">
                        <div className="flex items-center justify-between text-xs gap-2">
                          <div className="flex items-center gap-1 text-gray-500 flex-shrink-0">
                            <Calendar size={12} />
                            <span className="whitespace-nowrap">{order.deliveryDate}</span>
                          </div>
                          <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                            <div className="w-16 sm:w-20 h-2 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                              <div
                                className="h-full bg-blue-500"
                                style={{ width: `${order.progress}%` }}
                              />
                            </div>
                            <span className="text-gray-600 font-medium whitespace-nowrap">{order.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Product Dialog - Original UI Style */}
      {isProductDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsProductDialogOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Add Product</h2>
                  <p className="text-sm text-gray-600 mt-0.5">Create a new product in the catalog</p>
                </div>
                <button
                  onClick={() => setIsProductDialogOpen(false)}
                  className="text-gray-400 hover:text-gray-600 rounded-sm hover:bg-gray-100 p-1 -mr-1"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="space-y-4">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    value={productFormData.name}
                    onChange={handleProductInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* Category and Unit */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Category</label>
                    <input
                      type="text"
                      name="category"
                      placeholder="e.g., Cement, Steel"
                      value={productFormData.category}
                      onChange={handleProductInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Unit</label>
                    <select
                      name="unit"
                      value={productFormData.unit}
                      onChange={handleProductInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                    >
                      {UNIT_OPTIONS.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">Description</label>
                  <textarea
                    name="description"
                    placeholder="Enter product description"
                    value={productFormData.description}
                    onChange={handleProductInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-gray-200 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 justify-end flex-shrink-0 bg-white">
              <button
                onClick={() => setIsProductDialogOpen(false)}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-sm transition-colors"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Purchase Order Dialog - Original UI Style */}
      {isPODialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsPODialogOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Create Purchase Order</h2>
                  <p className="text-sm text-gray-600 mt-0.5">Create a new purchase order for materials</p>
                </div>
                <button
                  onClick={() => setIsPODialogOpen(false)}
                  className="text-gray-400 hover:text-gray-600 rounded-sm hover:bg-gray-100 p-1 -mr-1"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="space-y-4">
                {/* Project and Milestone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Project <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="project"
                      value={poFormData.project}
                      onChange={handlePOInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                    >
                      <option value="">Select project</option>
                      {PROJECT_OPTIONS.map(project => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Milestone <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="milestone"
                      value={poFormData.milestone}
                      onChange={handlePOInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                    >
                      <option value="">Select milestone</option>
                      {MILESTONE_OPTIONS.map(milestone => (
                        <option key={milestone} value={milestone}>{milestone}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Product */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    Product <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="product"
                    value={poFormData.product}
                    onChange={handlePOInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                  >
                    <option value="">Select product</option>
                    {products.map(product => (
                      <option key={product.id} value={product.name}>{product.name}</option>
                    ))}
                  </select>
                </div>

                {/* Quantity, UOM, and Unit Price */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      placeholder="0"
                      value={poFormData.quantity}
                      onChange={handlePOInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">UOM</label>
                    <select
                      name="unit"
                      value={poFormData.unit}
                      onChange={handlePOInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                    >
                      {UNIT_OPTIONS.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Unit Price</label>
                    <input
                      type="number"
                      name="unitPrice"
                      placeholder="0.00"
                      value={poFormData.unitPrice}
                      onChange={handlePOInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* PO Date and Expected Delivery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">PO Date</label>
                    <input
                      type="date"
                      name="poDate"
                      value={poFormData.poDate}
                      onChange={handlePOInputChange}
                      placeholder="mm/dd/yyyy"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">Expected Delivery</label>
                    <input
                      type="date"
                      name="expectedDelivery"
                      value={poFormData.expectedDelivery}
                      onChange={handlePOInputChange}
                      placeholder="mm/dd/yyyy"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">Status</label>
                  <select
                    name="status"
                    value={poFormData.status}
                    onChange={handlePOInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                  >
                    <option value="PO Released">PO Released</option>
                    <option value="Draft">Draft</option>
                    <option value="Pending Approval">Pending Approval</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-gray-200 flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 justify-end flex-shrink-0 bg-white">
              <button
                onClick={() => setIsPODialogOpen(false)}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePO}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-sm transition-colors"
              >
                Create PO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Order Details Dialog */}
      {isPODetailsDialogOpen && selectedPO && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsPODetailsDialogOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Purchase Order Details</h2>
                  <p className="text-sm text-gray-600 mt-0.5">{selectedPO.poNumber}</p>
                </div>
                <button
                  onClick={() => setIsPODetailsDialogOpen(false)}
                  className="text-gray-400 hover:text-gray-600 rounded-sm hover:bg-gray-100 p-1 -mr-1"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="space-y-6">
                {/* Two Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="min-w-0">
                    <h3 className="text-xs font-medium text-gray-500 mb-1">Project</h3>
                    <p className="text-sm text-gray-900 break-words">{selectedPO.project}</p>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-medium text-gray-500 mb-1">Milestone</h3>
                    <p className="text-sm text-gray-900 break-words">{selectedPO.milestone}</p>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-medium text-gray-500 mb-1">Product</h3>
                    <p className="text-sm text-gray-900 break-words">{selectedPO.product}</p>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-medium text-gray-500 mb-1">Status</h3>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium ${selectedPO.status === 'Received' ? 'bg-green-100 text-green-700' : selectedPO.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {selectedPO.status}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-medium text-gray-500 mb-1">Quantity</h3>
                    <p className="text-sm text-gray-900">{selectedPO.quantity} {selectedPO.unit}</p>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-medium text-gray-500 mb-1">Unit Price</h3>
                    <p className="text-sm text-gray-900 break-words">{formatCurrency(selectedPO.unitPrice)}</p>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-medium text-gray-500 mb-1">Total Value</h3>
                    <p className="text-sm font-semibold text-gray-900 break-words">{formatCurrency(selectedPO.total)}</p>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-medium text-gray-500 mb-1">Expected Delivery</h3>
                    <p className="text-sm text-gray-900">{selectedPO.estimatedDelivery}</p>
                  </div>
                </div>

                {/* Delivery History */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Delivery History</h3>
                  {selectedPO.deliveryHistory && selectedPO.deliveryHistory.length > 0 ? (
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      {/* Desktop Table */}
                      <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Delivery Date</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Quantity</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">GRN Reference</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedPO.deliveryHistory.map((delivery, index) => (
                              <tr key={index} className="border-t border-gray-200">
                                <td className="px-4 py-2 text-sm text-gray-900">{delivery.date}</td>
                                <td className="px-4 py-2 text-sm text-gray-900">{delivery.quantity} {delivery.unit}</td>
                                <td className="px-4 py-2 text-sm text-gray-900">{delivery.grnReference}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile Cards */}
                      <div className="sm:hidden divide-y divide-gray-200">
                        {selectedPO.deliveryHistory.map((delivery, index) => (
                          <div key={index} className="p-3 space-y-2">
                            <div className="flex justify-between gap-2">
                              <span className="text-xs text-gray-500">Date:</span>
                              <span className="text-sm font-medium text-gray-900">{delivery.date}</span>
                            </div>
                            <div className="flex justify-between gap-2">
                              <span className="text-xs text-gray-500">Quantity:</span>
                              <span className="text-sm text-gray-900">{delivery.quantity} {delivery.unit}</span>
                            </div>
                            <div className="flex justify-between gap-2">
                              <span className="text-xs text-gray-500">GRN:</span>
                              <span className="text-sm text-gray-900">{delivery.grnReference}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No delivery history available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}