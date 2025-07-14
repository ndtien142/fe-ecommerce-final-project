// Interface for order timeline log item
export interface IOrderTimelineLog {
  id: number;
  orderId: number;
  fromStatus: string;
  toStatus: string;
  action: string;
  actorType: string;
  actorId: number | null;
  actorName: string;
  note: string | null;
  metadata: any; // Can be string (JSON) or object or null
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  updatedAt: string;
  icon: string;
  color: string;
  title: string;
  description: string;
}

// Interface for the timeline metadata
export interface IOrderTimelineMetadata {
  timeline: IOrderTimelineLog[];
}

// Interface for the complete API response
export interface IOrderTimelineResponse {
  message: string;
  status: number;
  metadata: IOrderTimelineMetadata;
}

// Common order statuses (based on the data)
export type OrderStatus =
  | 'pending_confirmation'
  | 'pending_pickup'
  | 'shipping'
  | 'delivered'
  | 'cancelled';

// Common order actions (based on the data)
export type OrderAction =
  | 'payment_completed'
  | 'confirmed'
  | 'picked_up'
  | 'delivered'
  | 'cancelled';

// Actor types
export type ActorType = 'payment_gateway' | 'admin' | 'shipper' | 'customer' | 'system';

// Action colors for UI
export type ActionColor = 'green' | 'orange' | 'cyan' | 'red' | 'blue' | 'gray';
