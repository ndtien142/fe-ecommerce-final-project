import React, { useState } from 'react';
// @mui
import { Box, Grid, CircularProgress } from '@mui/material';
// hooks
import {
  useGetWorkflowStatistics,
  useGetDashboardOverview,
  useGetTimeSeriesData,
  useGetRealtimeMetrics,
  useClearCache,
} from '../hooks/useOrderWorkflow';
import { useGetDashboardStatistics } from '../hooks/useOrderLogs';
// components
import DashboardHeader from './DashboardHeader';
import DashboardMenu from './DashboardMenu';
import PendingAlerts from './PendingAlerts';
import StatsCards from './StatsCards';
import OrderStatusDistribution from './OrderStatusDistribution';
import ActionStatistics from './ActionStatistics';
import ActorPerformance from './ActorPerformance';
import PaymentMethods from './PaymentMethods';
import TimeSeriesChart from './TimeSeriesChart';
import RecentActivities from './RecentActivities';

// ----------------------------------------------------------------------

interface Props {
  dateRange?: {
    period?: 'today' | '7days' | 'month' | 'custom';
    startDate?: string;
    endDate?: string;
    timezone?: string;
  };
}

export default function OrderWorkflowDashboard({ dateRange }: Props) {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  // All API hooks
  const { data: workflowStats, isLoading: workflowLoading } = useGetWorkflowStatistics(dateRange);
  const { data: dashboardOverview, isLoading: overviewLoading } =
    useGetDashboardOverview(dateRange);
  const { data: timeSeriesData, isLoading: timeSeriesLoading } = useGetTimeSeriesData({
    period: dateRange?.period || '7days',
    startDate: dateRange?.startDate,
    endDate: dateRange?.endDate,
    granularity: 'day',
    metrics: 'orders,revenue,actions,completionRate',
  });
  const { data: realtimeMetrics, isLoading: realtimeLoading } = useGetRealtimeMetrics();
  const { data: dashboardStats, isLoading: dashboardLoading } =
    useGetDashboardStatistics(dateRange);
  const clearCacheMutation = useClearCache();

  const isLoading =
    workflowLoading || overviewLoading || timeSeriesLoading || realtimeLoading || dashboardLoading;

  // Debug: Log the data being received
  React.useEffect(() => {
    if (dashboardStats) {
      console.log('Dashboard Stats:', dashboardStats);
    }
    if (workflowStats) {
      console.log('Workflow Stats:', workflowStats);
    }
    if (dashboardOverview) {
      console.log('Dashboard Overview:', dashboardOverview);
    }
    if (timeSeriesData) {
      console.log('Time Series Data:', timeSeriesData);
    }
    if (realtimeMetrics) {
      console.log('Realtime Metrics:', realtimeMetrics);
    }
  }, [dashboardStats, workflowStats, dashboardOverview, timeSeriesData, realtimeMetrics]);

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

  // Extract metadata from API responses
  const workflowMetadata = workflowStats?.metadata;
  const dashboardMetadata = dashboardStats?.metadata;
  const overviewMetadata = dashboardOverview?.metadata;
  const timeSeriesMetadata = timeSeriesData?.metadata;
  const realtimeMetadata = realtimeMetrics?.metadata;

  return (
    <Box>
      {/* Header with clearCache functionality */}
      <DashboardHeader
        onRefresh={handleRefresh}
        onMenuOpen={handleMenuOpen}
        isRefreshing={clearCacheMutation.isLoading}
      />

      {/* Alerts using overview data */}
      <PendingAlerts
        pendingAlerts={overviewMetadata?.pendingAlerts || dashboardMetadata?.pendingAlerts}
        realtimeData={realtimeMetadata}
      />

      {/* Stats Cards using overview data */}
      <StatsCards
        dashboardStats={dashboardMetadata}
        overviewStats={overviewMetadata}
        timeSeriesStats={timeSeriesMetadata}
      />

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <OrderStatusDistribution ordersByStatus={workflowMetadata?.ordersByStatus} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ActionStatistics
            actionStats={overviewMetadata?.actionStats || dashboardMetadata?.actionStats}
          />
        </Grid>
      </Grid>

      {/* Actor Performance and Payment Methods */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <ActorPerformance
            actorStats={overviewMetadata?.actorStats || dashboardMetadata?.actorStats}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PaymentMethods paymentsByStatusAndMethod={workflowMetadata?.paymentsByStatusAndMethod} />
        </Grid>
      </Grid>

      {/* Time Series Chart */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <TimeSeriesChart
            timeSeriesData={timeSeriesMetadata?.timeSeries}
            title="Biểu đồ thời gian hoạt động"
          />
        </Grid>
      </Grid>

      {/* Recent Activities */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <RecentActivities
            activities={realtimeMetadata?.recentActivities}
            title="Hoạt động gần đây"
            maxItems={8}
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
