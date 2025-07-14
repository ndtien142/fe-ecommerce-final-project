import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getWorkflowStatistics,
  getDashboardOverview,
  getTimeSeriesData,
  getRealtimeMetrics,
  clearCache,
  WorkflowStatistics,
  DashboardOverview,
  TimeSeriesData,
  RealtimeMetrics,
  DateRangeParams,
  TimeSeriesParams,
  ApiResponse,
} from '../service';

// Re-export types for convenience
export type {
  WorkflowStatistics,
  DashboardOverview,
  TimeSeriesData,
  RealtimeMetrics,
  DateRangeParams,
  TimeSeriesParams,
};

// Hook for workflow statistics
export const useGetWorkflowStatistics = (dateRange?: DateRangeParams) =>
  useQuery<ApiResponse<WorkflowStatistics>>(
    ['workflow-statistics', dateRange?.period, dateRange?.startDate, dateRange?.endDate],
    () => getWorkflowStatistics(dateRange),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

// Hook for dashboard overview
export const useGetDashboardOverview = (dateRange?: DateRangeParams) =>
  useQuery<ApiResponse<DashboardOverview>>(
    ['dashboard-overview', dateRange?.period, dateRange?.startDate, dateRange?.endDate],
    () => getDashboardOverview(dateRange),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

// Hook for time series data
export const useGetTimeSeriesData = (params?: TimeSeriesParams) =>
  useQuery<ApiResponse<TimeSeriesData>>(
    [
      'time-series-data',
      params?.period,
      params?.startDate,
      params?.endDate,
      params?.granularity,
      params?.metrics,
    ],
    () => getTimeSeriesData(params),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

// Hook for real-time metrics
export const useGetRealtimeMetrics = () =>
  useQuery<ApiResponse<RealtimeMetrics>>(['realtime-metrics'], () => getRealtimeMetrics(), {
    staleTime: 30 * 1000, // 30 seconds
    cacheTime: 60 * 1000, // 1 minute
    refetchInterval: 30 * 1000, // Auto-refresh every 30 seconds
    refetchOnWindowFocus: false,
  });

// Hook for clearing cache
export const useClearCache = () => {
  const queryClient = useQueryClient();

  return useMutation(() => clearCache(), {
    onSuccess: () => {
      // Invalidate all dashboard queries
      queryClient.invalidateQueries(['workflow-statistics']);
      queryClient.invalidateQueries(['dashboard-overview']);
      queryClient.invalidateQueries(['time-series-data']);
      queryClient.invalidateQueries(['realtime-metrics']);
    },
  });
};
