import React from 'react';
// @mui
import { Grid } from '@mui/material';
// components
import StatCard from './StatCard';
import { fPercent } from '../../../common/utils/formatNumber';

// ----------------------------------------------------------------------

interface StatsCardsProps {
  dashboardStats?: {
    totalOrders: number;
    totalActions: number;
    completionRate: number;
    averageProcessingTime: number;
  };
  overviewStats?: {
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
  };
  timeSeriesStats?: {
    timeSeries: Array<{
      date: string;
      orders?: number;
      revenue?: number;
      actions?: number;
      completionRate?: number;
    }>;
  };
}

export default function StatsCards({
  dashboardStats,
  overviewStats,
  timeSeriesStats,
}: StatsCardsProps) {
  // Use overview stats if available, otherwise fallback to dashboard stats
  const stats = overviewStats || dashboardStats;
  const trends = overviewStats?.trends;

  // Calculate revenue from time series if available
  const totalRevenue =
    timeSeriesStats?.timeSeries?.reduce((sum, item) => sum + (item.revenue || 0), 0) || 0;

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Tổng đơn hàng"
          value={stats?.totalOrders || 0}
          icon="eva:shopping-bag-fill"
          color="primary"
          trend={trends?.ordersGrowth ? (trends.ordersGrowth > 0 ? 'up' : 'down') : 'stable'}
          trendValue={Math.abs(trends?.ordersGrowth || 0)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Tổng hành động"
          value={stats?.totalActions || 0}
          icon="eva:activity-fill"
          color="info"
          trend={trends?.actionsGrowth ? (trends.actionsGrowth > 0 ? 'up' : 'down') : 'stable'}
          trendValue={Math.abs(trends?.actionsGrowth || 0)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Tỷ lệ hoàn thành"
          value={stats?.completionRate || 0}
          icon="eva:checkmark-circle-2-fill"
          color="success"
          trend={
            trends?.completionRateChange
              ? trends.completionRateChange > 0
                ? 'up'
                : 'down'
              : 'stable'
          }
          trendValue={Math.abs(trends?.completionRateChange || 0)}
          subtitle={fPercent(stats?.completionRate || 0)}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard
          title="Thời gian xử lý TB"
          value={stats?.averageProcessingTime || 0}
          icon="eva:clock-fill"
          color="warning"
          trend={
            trends?.processingTimeChange
              ? trends.processingTimeChange < 0
                ? 'up'
                : 'down'
              : 'stable'
          }
          trendValue={Math.abs(trends?.processingTimeChange || 0)}
          subtitle="phút"
        />
      </Grid>
      {totalRevenue > 0 && (
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tổng doanh thu"
            value={totalRevenue}
            icon="eva:trending-up-fill"
            color="secondary"
            trend="stable"
            trendValue={0}
            subtitle={new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(totalRevenue)}
          />
        </Grid>
      )}
    </Grid>
  );
}
