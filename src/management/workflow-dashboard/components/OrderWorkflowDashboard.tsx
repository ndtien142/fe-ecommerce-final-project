import React, { useState } from 'react';
// @mui
import { Box, Grid, CircularProgress } from '@mui/material';
// hooks
import {
  useGetWorkflowStatistics,
  useGetTimeSeriesData,
  useGetRecentOrders,
  useClearCache,
} from '../hooks/useOrderWorkflow';
// components
import DashboardHeader from './DashboardHeader';
import DashboardMenu from './DashboardMenu';
import DateRangeFilter from './DateRangeFilter';
import WorkflowAnalyticsChart from './WorkflowAnalyticsChart';
import WorkflowDonutChart from './WorkflowDonutChart';
import WorkflowWidgetSummary from './WorkflowWidgetSummary';
import RecentOrdersList from './RecentOrdersList';

// ----------------------------------------------------------------------

type PeriodType = 'today' | '7days' | 'month' | 'quarter' | 'year' | 'custom';

interface Props {
  dateRange?: {
    period?: PeriodType;
    startDate?: string;
    endDate?: string;
    timezone?: string;
  };
}

export default function OrderWorkflowDashboard({ dateRange: initialDateRange }: Props) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [dateRange, setDateRange] = useState<{
    period?: PeriodType;
    startDate?: string;
    endDate?: string;
    timezone?: string;
  }>(
    initialDateRange || {
      period: '7days',
      timezone: 'Asia/Ho_Chi_Minh',
    }
  );

  // Pagination state for recent orders
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersLimit, setOrdersLimit] = useState(10);

  // Helper function to map frontend PeriodType to backend-compatible format
  const mapToBackendPeriod = (period?: PeriodType, timezone: string = 'Asia/Ho_Chi_Minh') => {
    const now = new Date();

    switch (period) {
      case 'quarter': {
        const currentQuarter = Math.floor(now.getMonth() / 3);
        const quarterStartMonth = currentQuarter * 3;
        const startOfQuarter = new Date(now.getFullYear(), quarterStartMonth, 1);
        const endOfQuarter = new Date(now.getFullYear(), quarterStartMonth + 3, 0);

        return {
          period: 'custom',
          startDate: startOfQuarter.toISOString().split('T')[0],
          endDate: endOfQuarter.toISOString().split('T')[0],
        };
      }
      case 'year': {
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const endOfYear = new Date(now.getFullYear(), 11, 31);

        return {
          period: 'custom',
          startDate: startOfYear.toISOString().split('T')[0],
          endDate: endOfYear.toISOString().split('T')[0],
        };
      }
      default:
        return { period };
    }
  };

  // Create backend-compatible dateRange
  const mappedPeriod = mapToBackendPeriod(dateRange?.period, dateRange?.timezone);
  const backendDateRange = {
    ...dateRange,
    ...mappedPeriod,
  };

  // All API hooks
  const { data: workflowStats, isLoading: workflowLoading } = useGetWorkflowStatistics(
    backendDateRange as any
  );
  const { data: timeSeriesData, isLoading: timeSeriesLoading } = useGetTimeSeriesData({
    period: (backendDateRange.period || '7days') as any,
    startDate: backendDateRange.startDate,
    endDate: backendDateRange.endDate,
    granularity: 'day',
    metrics: 'orders,revenue,actions,momoSuccess,cashSuccess',
  });
  const { data: recentOrders, isLoading: ordersLoading } = useGetRecentOrders({
    page: ordersPage,
    limit: ordersLimit,
  });
  const clearCacheMutation = useClearCache();

  // Handle pagination
  const handleOrdersPageChange = (newPage: number) => {
    setOrdersPage(newPage);
  };

  const handleOrdersLimitChange = (newLimit: number) => {
    setOrdersLimit(newLimit);
    setOrdersPage(1); // Reset to first page when limit changes
  };

  const isLoading = workflowLoading || timeSeriesLoading || ordersLoading;

  // Debug: Log the data being received
  React.useEffect(() => {
    if (workflowStats) {
      console.log('Workflow Stats:', workflowStats);
    }
    if (timeSeriesData) {
      console.log('Time Series Data:', timeSeriesData);
    }
    if (recentOrders) {
      console.log('Recent Orders:', recentOrders);
    }
  }, [workflowStats, timeSeriesData, recentOrders]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleRefresh = () => {
    // Clear cache and refresh data
    clearCacheMutation.mutate();
  };

  const handleDateRangeChange = (newDateRange: {
    period: PeriodType;
    startDate?: string;
    endDate?: string;
    timezone?: string;
  }) => {
    setDateRange(newDateRange);
  };

  // Extract metadata from API responses
  const workflowMetadata = workflowStats?.metadata;
  const timeSeriesMetadata = timeSeriesData?.metadata;
  const ordersMetadata = recentOrders?.metadata;

  return (
    <Box>
      {/* Header with clearCache functionality */}
      <DashboardHeader
        onRefresh={handleRefresh}
        onMenuOpen={handleMenuOpen}
        isRefreshing={clearCacheMutation.isLoading}
      />

      {/* Date Range Filter */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <DateRangeFilter value={dateRange} onChange={handleDateRangeChange} />
        </Grid>
        <Grid item xs={12} md={8}>
          {/* Summary Widgets */}
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <WorkflowWidgetSummary
                title="Tổng đơn hàng"
                total={
                  workflowMetadata?.ordersByStatus?.reduce(
                    (sum: number, item: any) => sum + item.count,
                    0
                  ) || 0
                }
                icon="solar:bag-bold"
                color="primary"
                trend={
                  workflowMetadata?.trends?.totalOrders
                    ? {
                        value: workflowMetadata.trends.totalOrders.percentage,
                        isIncrease: workflowMetadata.trends.totalOrders.isIncrease,
                      }
                    : {
                        value: 12.5,
                        isIncrease: true,
                      }
                }
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <WorkflowWidgetSummary
                title="Đơn hàng mới"
                total={
                  workflowMetadata?.ordersByStatus
                    ?.filter((item: any) =>
                      ['pending_confirmation', 'pending_payment'].includes(item.status)
                    )
                    ?.reduce((sum: number, item: any) => sum + item.count, 0) || 0
                }
                icon="solar:add-circle-bold"
                color="success"
                trend={
                  workflowMetadata?.trends?.newOrders
                    ? {
                        value: workflowMetadata.trends.newOrders.percentage,
                        isIncrease: workflowMetadata.trends.newOrders.isIncrease,
                      }
                    : {
                        value: 8.2,
                        isIncrease: true,
                      }
                }
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <WorkflowWidgetSummary
                title="Đang xử lý"
                total={
                  workflowMetadata?.ordersByStatus
                    ?.filter((item: any) =>
                      ['pending_confirmation', 'pending_pickup', 'shipping'].includes(item.status)
                    )
                    ?.reduce((sum: number, item: any) => sum + item.count, 0) || 0
                }
                icon="solar:clock-circle-bold"
                color="warning"
                trend={
                  workflowMetadata?.trends?.processingOrders
                    ? {
                        value: workflowMetadata.trends.processingOrders.percentage,
                        isIncrease: workflowMetadata.trends.processingOrders.isIncrease,
                      }
                    : {
                        value: 5.1,
                        isIncrease: false,
                      }
                }
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <WorkflowWidgetSummary
                title="Hoàn thành"
                total={
                  workflowMetadata?.ordersByStatus
                    ?.filter((item: any) =>
                      ['delivered', 'customer_confirmed'].includes(item.status)
                    )
                    ?.reduce((sum: number, item: any) => sum + item.count, 0) || 0
                }
                icon="solar:check-circle-bold"
                color="info"
                trend={
                  workflowMetadata?.trends?.completedOrders
                    ? {
                        value: workflowMetadata.trends.completedOrders.percentage,
                        isIncrease: workflowMetadata.trends.completedOrders.isIncrease,
                      }
                    : {
                        value: 2.3,
                        isIncrease: true,
                      }
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <WorkflowAnalyticsChart
            title="Biểu đồ thống kê theo thời gian"
            subheader={`Dữ liệu từ ${dateRange?.startDate || 'gần đây'} - ${
              dateRange?.period || '7 ngày'
            }`}
            chartLabels={timeSeriesMetadata?.timeSeries?.map((item: any) => item.date) || []}
            chartData={[
              {
                name: 'Đơn hàng',
                type: 'bar',
                fill: 'gradient',
                data: timeSeriesMetadata?.timeSeries?.map((item: any) => item.orders || 0) || [],
                yAxisIndex: 0, // Use primary Y-axis
              },
              {
                name: 'Doanh thu',
                type: 'line',
                data: timeSeriesMetadata?.timeSeries?.map((item: any) => item.revenue || 0) || [],
                yAxisIndex: 1, // Use secondary Y-axis
              },
              {
                name: 'Hoạt động',
                type: 'line',
                data: timeSeriesMetadata?.timeSeries?.map((item: any) => item.actions || 0) || [],
                yAxisIndex: 0, // Use primary Y-axis
              },
              {
                name: 'MoMo thành công',
                type: 'line',
                data:
                  timeSeriesMetadata?.timeSeries?.map((item: any) => item.momoSuccess || 0) || [],
                yAxisIndex: 0, // Use primary Y-axis
              },
              {
                name: 'Tiền mặt thành công',
                type: 'line',
                data:
                  timeSeriesMetadata?.timeSeries?.map((item: any) => item.cashSuccess || 0) || [],
                yAxisIndex: 0, // Use primary Y-axis
              },
            ]}
            summary={{
              total:
                workflowMetadata?.ordersByStatus?.reduce(
                  (sum: number, item: any) => sum + item.count,
                  0
                ) || 0,
              trend: 12.5,
              icon: 'solar:chart-2-bold',
              color: 'primary',
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <WorkflowDonutChart
            title="Phân bổ trạng thái đơn hàng"
            chartData={
              workflowMetadata?.ordersByStatus?.map((item: any) => ({
                label: item.displayName || item.statusName,
                value: item.count,
                color: item.color,
                icon: 'solar:bag-bold',
              })) || []
            }
            total={
              workflowMetadata?.ordersByStatus?.reduce(
                (sum: number, item: any) => sum + item.count,
                0
              ) || 0
            }
          />
        </Grid>
      </Grid>

      {/* Recent Orders */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RecentOrdersList
            title="Đơn hàng mới nhất"
            subheader={`${ordersMetadata?.pagination?.total || 0} đơn hàng gần đây`}
            orders={ordersMetadata?.orders || []}
            pagination={ordersMetadata?.pagination}
            onPageChange={handleOrdersPageChange}
            onRowsPerPageChange={handleOrdersLimitChange}
          />
        </Grid>
      </Grid>

      {/* Menu */}
      <DashboardMenu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        onClearCache={() => clearCacheMutation.mutate()}
        isClearingCache={clearCacheMutation.isLoading}
      />
    </Box>
  );
}
