import { useQuery } from 'react-query';

// Types
export interface DashboardStatistics {
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

interface DateRange {
  period?: 'today' | '7days' | 'month' | 'custom';
  startDate?: string;
  endDate?: string;
  timezone?: string;
}

// API Response Interface
interface DashboardStatisticsResponse {
  message: string;
  status: number;
  metadata: DashboardStatistics;
}

// Mock data for development
const mockDashboardStats: DashboardStatistics = {
  period: {
    type: '7days',
    startDate: '2025-07-08',
    endDate: '2025-07-14',
    timezone: 'Asia/Ho_Chi_Minh',
  },
  totalOrders: 156,
  totalActions: 423,
  completionRate: 87.5,
  averageProcessingTime: 45,
  trends: {
    ordersGrowth: 12.5,
    actionsGrowth: 8.3,
    completionRateChange: 0.0,
    processingTimeChange: -5.2,
  },
  pendingAlerts: {
    pendingConfirmation: 12,
    pendingPickup: 8,
    overdueOrders: 3,
    paymentIssues: 2,
  },
  actionStats: [
    {
      action: 'payment_completed',
      displayName: 'Thanh toán hoàn tất',
      count: 145,
      percentage: 34.3,
      trend: 'up',
      trendValue: 12.5,
    },
    {
      action: 'confirmed',
      displayName: 'Xác nhận đơn hàng',
      count: 132,
      percentage: 31.2,
      trend: 'up',
      trendValue: 8.7,
    },
    {
      action: 'picked_up',
      displayName: 'Lấy hàng',
      count: 89,
      percentage: 21.0,
      trend: 'stable',
      trendValue: 0.2,
    },
    {
      action: 'delivered',
      displayName: 'Giao hàng thành công',
      count: 78,
      percentage: 18.4,
      trend: 'up',
      trendValue: 15.3,
    },
    {
      action: 'cancelled',
      displayName: 'Hủy đơn hàng',
      count: 15,
      percentage: 3.5,
      trend: 'down',
      trendValue: -23.1,
    },
  ],
  actorStats: [
    {
      actorType: 'admin',
      displayName: 'Quản trị viên',
      count: 189,
      percentage: 44.7,
      averageResponseTime: 15,
      activeCount: 5,
    },
    {
      actorType: 'shipper',
      displayName: 'Người giao hàng',
      count: 156,
      percentage: 36.9,
      averageResponseTime: 30,
      activeCount: 12,
    },
    {
      actorType: 'payment_gateway',
      displayName: 'Cổng thanh toán',
      count: 145,
      percentage: 34.3,
      averageResponseTime: 2,
      activeCount: null,
    },
    {
      actorType: 'customer',
      displayName: 'Khách hàng',
      count: 23,
      percentage: 5.4,
      averageResponseTime: 120,
      activeCount: null,
    },
    {
      actorType: 'system',
      displayName: 'Hệ thống',
      count: 12,
      percentage: 2.8,
      averageResponseTime: 1,
      activeCount: null,
    },
  ],
};

// Hook
export const useGetDashboardStatistics = (dateRange?: DateRange) =>
  useQuery<DashboardStatisticsResponse>(
    ['dashboard-statistics', dateRange?.period, dateRange?.startDate, dateRange?.endDate],
    async () => {
      const params = new URLSearchParams();

      if (dateRange?.period) params.append('period', dateRange.period);
      if (dateRange?.startDate) params.append('startDate', dateRange.startDate);
      if (dateRange?.endDate) params.append('endDate', dateRange.endDate);
      if (dateRange?.timezone) params.append('timezone', dateRange.timezone);

      // TODO: Replace with actual API call
      // const response = await fetch(`/api/v1/dashboard/workflow/overview?${params}`);
      // return response.json();

      // Mock response for development
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        message: 'Lấy thống kê dashboard thành công',
        status: 200,
        metadata: mockDashboardStats,
      };
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      enabled: true,
    }
  );
