
// ============================================
// GANTT CHART TYPES
// ============================================
export interface Task {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'planned' | 'on-time' | 'delayed';
  isParent?: boolean;
  isExpanded?: boolean;
  children?: Task[];
}

// ============================================
// PROCUREMENT TYPES
// ============================================
export interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  description: string;
}

export interface ProcurementStats {
  totalProducts: number;
  totalPurchaseOrders: number;
  totalPOValue: number;
  inTransit: number;
}

export interface PurchaseOrder {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: 'pending' | 'received' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
}
export interface FundRequest {
  id: string;
  week: string;
  engineer: string;
  milestone: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  requestDate: string;
}

export interface FundRequestStats {
  pending: number;
  approved: number;
  rejected: number;
  totalAmountPending: number;
}

export interface Approval {
  id: string;
  title: string;
  description: string;
  requester: string;
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  requestedDate: string;
  dueDate?: string;
  category: string;
  amount?: number;
}
// In your types file, make sure FundRequest includes description
export interface FundRequest {
  id: string;
  week: string;
  engineer: string;
  milestone: string;
  amount: number;
  status: 'under-review' | 'pending' | 'approved' | 'rejected';
  requestDate: string;
  description: string; // Add this line
}