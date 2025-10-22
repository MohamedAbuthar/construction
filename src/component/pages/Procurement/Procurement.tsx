'use client';

import React, { useState } from 'react';
import { Search, Plus, Calendar, Building, Package, Truck, CheckCircle, Download, FileText } from 'lucide-react';
import { Button } from '@/component/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/component/ui/dialog';

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
    milestone: 'Structural Framework',
    product: '',
    quantity: 0,
    unit: 'Ton',
    unitPrice: 0,
    poDate: new Date().toLocaleDateString('en-US'),
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
        return 'bg-white-100 text-gray-900 border-gray-200';
      case 'In Transit':
        return 'bg-white-100 text-gray-900 border-gray-200';
      case 'In Production':
        return 'bg-white-100 text-gray-900 border-gray-200';
      default:
        return 'bg-white-100 text-gray-900 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Received':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'In Transit':
        return <Truck className="text-blue-600" size={20} />;
      case 'In Production':
        return <Package className="text-yellow-600" size={20} />;
      default:
        return <Package className="text-gray-600" size={20} />;
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
      [name]: name === 'quantity' || name === 'unitPrice' ? Number(value) : value
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
      unit: 'ton',
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
      milestone: poFormData.milestone,
      product: poFormData.product,
      quantity: poFormData.quantity,
      unit: poFormData.unit,
      unitPrice: poFormData.unitPrice,
      total: poFormData.quantity * poFormData.unitPrice,
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
      milestone: 'Structural Framework',
      product: '',
      quantity: 0,
      unit: 'Ton',
      unitPrice: 0,
      poDate: new Date().toLocaleDateString('en-US'),
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Procurement</h1>
        <p className="text-muted-foreground mt-1">Manage products and purchase orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Products</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
        </div>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Purchase Orders</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalPurchaseOrders}</p>
          <p className="text-xs text-gray-500 mt-1">1 received</p>
        </div>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total PO Value</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalPOValue)}</p>
        </div>
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">In Transit</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.inTransit}</p>
        </div>
      </div>

      {/* Tabs Container */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Tab Headers */}
        <div className="border-b border-gray-200 bg-gray-50/50 p-2">
          <nav className="flex space-x-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-2 px-4 font-medium text-sm transition-all duration-200 ease-in-out whitespace-nowrap rounded-lg border ${
                activeTab === 'products'
                  ? 'text-black-600 bg-white border-gray-200 shadow-sm'
                  : 'text-gray-400 bg-white/50 border-gray-200 backdrop-blur-xs hover:bg-white/70 hover:text-gray-900'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-2 px-4 font-medium text-sm transition-all duration-200 ease-in-out whitespace-nowrap rounded-lg border ${
                activeTab === 'orders'
                  ? 'text-black-600 bg-white border-gray-200 shadow-sm'
                  : 'text-gray-400 bg-white/50 border-gray-200 backdrop-blur-xs hover:bg-white/70 hover:text-gray-900'
              }`}
            >
              Purchase Orders
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Products Tab Content */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Product Catalog</h2>
                  <p className="text-sm text-gray-600">Master list of construction materials</p>
                </div>
                <Button
                  onClick={() => setIsProductDialogOpen(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Plus size={18} />
                  Add Product
                </Button>
              </div>

              {/* Search for Products */}
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={productSearchTerm}
                  onChange={(e) => setProductSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 text-gray-900 bg-gray-50"
                />
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300 bg-white-50">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Product Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Category</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Unit</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{product.category}</td>
                        <td className="px-6 py-4 text-xs text-gray-700">{product.unit}</td>
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
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Purchase Orders</h2>
                  <p className="text-sm text-gray-600">Track material orders and deliveries</p>
                </div>
                <Button 
                  onClick={() => setIsPODialogOpen(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Plus size={18} />
                  New PO
                </Button>
              </div>

              {/* Search for Orders */}
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search purchase orders..."
                  value={orderSearchTerm}
                  onChange={(e) => setOrderSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 text-gray-900 bg-gray-50"
                />
              </div>

              {/* Purchase Orders Table */}
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300 bg-white-50 hover:bg-gray-50">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Project</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Product</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Quantity</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Unit Price</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Total</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-500">Delivery</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr 
                        key={order.id} 
                        className="border-b border-gray-200 hover:bg-blue-300 transition cursor-pointer"
                        onClick={() => handlePOClick(order)}
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">{order.project}</div>
                          <div className="text-xs text-gray-600">{order.milestone}</div>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.product}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {order.quantity} {order.unit}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{formatCurrency(order.unitPrice)}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatCurrency(order.total)}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{ width: `${order.progress}%` }}
                                />
                              </div>
                            </div>
                            <span className="text-xs text-gray-600 whitespace-nowrap">{order.progress}%</span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                            <Calendar size={12} className="text-gray-500" />
                            {order.deliveryDate}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Add Product</DialogTitle>
            <DialogDescription className="text-gray-600">
              Create a new product in the catalog
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Product Name <span className="text-gray-700">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={productFormData.name}
                onChange={handleProductInputChange}
                className="w-full px-3 py-2 bg-gray-100 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 text-gray-900 transition-colors"
              />
            </div>

            {/* Category and Unit Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  placeholder="e.g., Cement, Steel"
                  value={productFormData.category}
                  onChange={handleProductInputChange}
                  className="w-full px-3 py-2 bg-gray-100 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 text-gray-900 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Unit
                </label>
                <select
                  name="unit"
                  value={productFormData.unit}
                  onChange={handleProductInputChange}
                  className="w-full px-3 py-2 bg-gray-100 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 text-gray-900 bg-white transition-colors"
                >
                  {UNIT_OPTIONS.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter product description"
                value={productFormData.description}
                onChange={handleProductInputChange}
                rows={4}
                className="h-12 w-full px-3 py-2 bg-gray-100 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 text-gray-900 resize-none transition-colors"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsProductDialogOpen(false)}
              className='bg-gray-100 hover:bg-blue-600 text-gray-900 hover:text-white'
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddProduct}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Purchase Order Dialog */}
      <Dialog open={isPODialogOpen} onOpenChange={setIsPODialogOpen}>
        <DialogContent className="bg-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Create Purchase Order</DialogTitle>
            <DialogDescription className="text-gray-600">
              Create a new purchase order for materials
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Project and Milestone Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Project <span className="text-red-500">*</span>
                </label>
                <select
                  name="project"
                  value={poFormData.project}
                  onChange={handlePOInputChange}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 text-gray-900 bg-white transition-colors"
                >
                  <option value="">Select project</option>
                  {PROJECT_OPTIONS.map(project => (
                    <option key={project} value={project}>{project}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Milestone <span className="text-red-500">*</span>
                </label>
                <select
                  name="milestone"
                  value={poFormData.milestone}
                  onChange={handlePOInputChange}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 text-gray-900 bg-white transition-colors"
                >
                  <option value="Structural Framework">Structural Framework</option>
                  <option value="Tower Construction">Tower Construction</option>
                  <option value="Foundation Work">Foundation Work</option>
                  <option value="MEP Installation">MEP Installation</option>
                </select>
              </div>
            </div>

            {/* Product */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Product <span className="text-red-500">*</span>
              </label>
              <select
                name="product"
                value={poFormData.product}
                onChange={handlePOInputChange}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 text-gray-900 bg-white transition-colors"
              >
                <option value="">Select product</option>
                {products.map(product => (
                  <option key={product.id} value={product.name}>{product.name}</option>
                ))}
              </select>
            </div>

            {/* Quantity, UOM, Unit Price Row */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Quantity & Pricing
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="0"
                    value={poFormData.quantity}
                    onChange={handlePOInputChange}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 text-gray-900 transition-colors"
                  />
                  <div className="text-xs text-gray-500 mt-1">Quantity</div>
                </div>
                <div>
                  <select
                    name="unit"
                    value={poFormData.unit}
                    onChange={handlePOInputChange}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 text-gray-900 bg-white transition-colors"
                  >
                    {UNIT_OPTIONS.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                  <div className="text-xs text-gray-500 mt-1">UOM</div>
                </div>
                <div>
                  <input
                    type="number"
                    name="unitPrice"
                    placeholder="0.00"
                    value={poFormData.unitPrice}
                    onChange={handlePOInputChange}
                    step="0.01"
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 text-gray-900 transition-colors"
                  />
                  <div className="text-xs text-gray-500 mt-1">Unit Price</div>
                </div>
              </div>
            </div>

            {/* PO Date and Expected Delivery Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  PO Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="poDate"
                    value={poFormData.poDate}
                    onChange={handlePOInputChange}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 text-gray-900 transition-colors"
                  />
                  <Calendar className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Expected Delivery
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="expectedDelivery"
                    placeholder="mm/dd/yyyy"
                    value={poFormData.expectedDelivery}
                    onChange={handlePOInputChange}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 text-gray-900 transition-colors"
                  />
                  <Calendar className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Status
              </label>
              <select
                name="status"
                value={poFormData.status}
                onChange={handlePOInputChange}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-0 text-gray-900 bg-white transition-colors"
              >
                <option value="PO Released">PO Released</option>
                <option value="Draft">Draft</option>
                <option value="Pending Approval">Pending Approval</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPODialogOpen(false)}
              className="bg-white hover:bg-gray-100 text-gray-900 border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreatePO}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Create PO
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Purchase Order Details Dialog */}
      <Dialog open={isPODetailsDialogOpen} onOpenChange={setIsPODetailsDialogOpen}>
        <DialogContent className="bg-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900 text-lg font-semibold">
              Purchase Order Details
            </DialogTitle>
            <DialogDescription className="text-gray-500 text-sm">
              View PO information and delivery history
            </DialogDescription>
          </DialogHeader>

          {selectedPO && (
            <div className="space-y-4 py-2">
              {/* Two Column Layout */}
              <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 mb-1">Project</h3>
                    <p className="text-sm text-gray-900">{selectedPO.project}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-medium text-gray-500 mb-1">Product</h3>
                    <p className="text-sm text-gray-900">{selectedPO.product}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-medium text-gray-500 mb-1">Quantity</h3>
                    <p className="text-sm text-gray-900">
                      {selectedPO.quantity} {selectedPO.unit}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-medium text-gray-500 mb-1">Total Value</h3>
                    <p className="text-sm text-gray-900">
                      {formatCurrency(selectedPO.total)}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 mb-1">Milestone</h3>
                    <p className="text-sm text-gray-900">{selectedPO.milestone}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-medium text-gray-500 mb-1">Status</h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      {selectedPO.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-medium text-gray-500 mb-1">Unit Price</h3>
                    <p className="text-sm text-gray-900">
                      {formatCurrency(selectedPO.unitPrice)}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-medium text-gray-500 mb-1">Expected Delivery</h3>
                    <p className="text-sm text-gray-900">
                      {selectedPO.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery History Table */}
              <div className="pt-2">
                <h3 className="text-xs font-medium text-gray-500 mb-3">Delivery History</h3>
                {selectedPO.deliveryHistory && selectedPO.deliveryHistory.length > 0 ? (
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 border-b border-gray-200">
                            Delivery Date
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 border-b border-gray-200">
                            Quantity
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 border-b border-gray-200">
                            GRN Reference
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {selectedPO.deliveryHistory.map((delivery, index) => (
                          <tr key={index} className="border-b border-gray-200 last:border-b-0">
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {delivery.date}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {delivery.quantity} {delivery.unit}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {delivery.grnReference}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No delivery history available</p>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="mt-4">
            {/* <Button
              variant="outline"
              onClick={() => setIsPODetailsDialogOpen(false)}
              className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
            >
              Close
            </Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}