import { IOrder } from './order.interface';

export type OrderStatus =
  | 'pending_confirmation'
  | 'pending_pickup'
  | 'shipping'
  | 'delivered'
  | 'customer_confirmed'
  | 'returned'
  | 'cancelled';

export type PaymentStatus =
  | 'pending'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'cancelled'
  | 'expired';

export interface IOrderWorkflowResponse {
  message: string;
  status: string;
  metadata: IOrderWorkflow;
}

export interface IOrderWorkflow {
  currentStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  availableActions: string[];
}

export interface IWorkflowActionRequest {
  note?: string;
  reason?: string;
  trackingNumber?: string;
  shippedBy?: string;
  amount?: number;
}

export interface IActionConfig {
  key: string;
  title: string;
  color: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  icon: string;
  requiresNote?: boolean;
  requiresTracking?: boolean;
  requiresReason?: boolean;
  nextStatus?: string;
  description?: string;
}

export interface IWorkflowActionResponse {
  status: string;
  message: string;
  metadata: {
    order: IOrder;
    previousStatus: string;
    newStatus: string;
    action: string;
    timestamp: string;
  };
}
