import axiosInstance from 'src/common/utils/axios';

// Types
export interface WorkflowStatistics {
  period: {
    type: string;
    startDate: string;
    endDate: string;
    timezone: string;
  };
  ordersByStatus: Array<{
    status: string;
    displayName: string;
    count: number;
    percentage: number;
    color: string;
  }>;
  paymentsByStatusAndMethod: Array<{
    method: string;
    displayName: string;
    status: string;
    count: number;
    totalAmount: number;
    percentage: number;
  }>;
  trends?: {
    totalOrders?: {
      percentage: number;
      isIncrease: boolean;
    };
    newOrders?: {
      percentage: number;
      isIncrease: boolean;
    };
    processingOrders?: {
      percentage: number;
      isIncrease: boolean;
    };
    completedOrders?: {
      percentage: number;
      isIncrease: boolean;
    };
  };
}

export interface DashboardOverview {
  period: {
    type: string;
    startDate: string;
    endDate: string;
    timezone: string;
  };
  totalOrders: number;
  totalActions: number;
  completionRate: number;
  averageProcessingTime: number;
  trends: {
    ordersGrowth: number;
    actionsGrowth: number;
    completionRateChange: number;
    processingTimeChange: number;
  };
  pendingAlerts: {
    pendingConfirmation: number;
    pendingPickup: number;
    overdueOrders: number;
    paymentIssues: number;
  };
  actionStats: Array<{
    action: string;
    displayName: string;
    count: number;
    percentage: number;
    trend: 'up' | 'down' | 'stable';
    trendValue: number;
  }>;
  actorStats: Array<{
    actorType: string;
    displayName: string;
    count: number;
    percentage: number;
    averageResponseTime: number;
    activeCount: number | null;
  }>;
}

export interface TimeSeriesDataPoint {
  date: string;
  orders?: number;
  revenue?: number;
  actions?: number;
  completionRate?: number;
  momoSuccess?: number;
  cashSuccess?: number;
}

export interface TimeSeriesData {
  period: {
    type: string;
    startDate: string;
    endDate: string;
    granularity: string;
  };
  timeSeries: TimeSeriesDataPoint[];
}

export interface RealtimeMetrics {
  activeUsers: number;
  recentOrders: number;
  recentActivities: Array<{
    id: string;
    title: string;
    description?: string;
    time: string;
    type: string;
    actor?: {
      name: string;
      role: string;
    };
    metadata?: Record<string, any>;
  }>;
}

export interface RecentOrder {
  id: string;
  total_amount: number;
  status: string;
  create_time: string;
  user?: {
    id: string;
    user_nickname: string;
    user_email: string;
  };
  payments?: Array<{
    payment_method: string;
    status: string;
    amount: number;
  }>;
}

export interface RecentOrdersParams {
  page?: number;
  limit?: number;
  status?: string;
  userId?: number;
  startDate?: string;
  endDate?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface RecentOrdersResponse {
  orders: RecentOrder[];
  pagination: PaginationInfo;
}

// API Response Interface
export interface ApiResponse<T> {
  message: string;
  status: number;
  metadata: T;
}

// Query Parameters Interface
export interface DateRangeParams {
  period?: 'today' | '7days' | 'month' | 'custom';
  startDate?: string;
  endDate?: string;
  timezone?: string;
}

export interface TimeSeriesParams extends DateRangeParams {
  granularity?: 'hour' | 'day' | 'week';
  metrics?: string;
}

// API Service - Functional approach with arrow functions
// Get workflow statistics
export const getWorkflowStatistics = (params: DateRangeParams = {}) =>
  axiosInstance.get<unknown, ApiResponse<WorkflowStatistics>>('/dashboard/workflow/statistics', {
    params: {
      period: params.period || '7days',
      startDate: params.startDate,
      endDate: params.endDate,
      timezone: params.timezone || 'Asia/Ho_Chi_Minh',
    },
  });

// Get dashboard overview
export const getDashboardOverview = (params: DateRangeParams = {}) =>
  axiosInstance.get<unknown, ApiResponse<DashboardOverview>>('/dashboard/workflow/overview', {
    params: {
      period: params.period || '7days',
      startDate: params.startDate,
      endDate: params.endDate,
      timezone: params.timezone || 'Asia/Ho_Chi_Minh',
    },
  });

// Get time series data
export const getTimeSeriesData = (params: TimeSeriesParams = {}) =>
  axiosInstance.get<unknown, ApiResponse<TimeSeriesData>>('/dashboard/workflow/timeseries', {
    params: {
      period: params.period || '7days',
      startDate: params.startDate,
      endDate: params.endDate,
      granularity: params.granularity || 'day',
      metrics: params.metrics || 'orders,revenue,actions',
    },
  });

// Get real-time metrics
export const getRealtimeMetrics = () =>
  axiosInstance.get<unknown, ApiResponse<RealtimeMetrics>>('/dashboard/workflow/realtime');

// Clear cache
export const clearCache = () =>
  axiosInstance.delete<unknown, ApiResponse<void>>('/dashboard/workflow/cache');

// Get recent orders
export const getRecentOrders = (params: RecentOrdersParams = {}) =>
  axiosInstance.get<unknown, ApiResponse<RecentOrdersResponse>>('/dashboard/recent-orders', {
    params,
  });

// Service object for backward compatibility (if needed)
export const workflowDashboardService = {
  getWorkflowStatistics,
  getDashboardOverview,
  getTimeSeriesData,
  getRealtimeMetrics,
  clearCache,
  getRecentOrders,
};
