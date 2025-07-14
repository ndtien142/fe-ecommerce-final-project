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
  timestamp: string;
  activeOrders: number;
  totalUsers: number;
  pendingActions: number;
  systemHealth: {
    status: string;
    responseTime: number;
    uptime: number;
  };
  recentActivities: Array<{
    id: number;
    orderId: number;
    action: string;
    actorType: string;
    actorName: string;
    timestamp: string;
    description: string;
  }>;
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

// Service object for backward compatibility (if needed)
export const workflowDashboardService = {
  getWorkflowStatistics,
  getDashboardOverview,
  getTimeSeriesData,
  getRealtimeMetrics,
  clearCache,
};
