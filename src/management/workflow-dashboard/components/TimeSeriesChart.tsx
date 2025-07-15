import React from 'react';
// @mui
import { Card, CardHeader, Box, Typography, Stack, Chip } from '@mui/material';

// ----------------------------------------------------------------------

interface TimeSeriesChartProps {
  timeSeriesData?: Array<{
    date: string;
    orders?: number;
    revenue?: number;
    actions?: number;
    completionRate?: number;
  }>;
  title?: string;
}

export default function TimeSeriesChart({
  timeSeriesData,
  title = 'Dữ liệu thời gian',
}: TimeSeriesChartProps) {
  if (!timeSeriesData || timeSeriesData.length === 0) {
    return (
      <Card>
        <CardHeader title={title} />
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Không có dữ liệu để hiển thị
          </Typography>
        </Box>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      month: 'short',
      day: 'numeric',
    });
  };

  // Helper function to safely format completion rate
  const formatCompletionRate = (rate: number | undefined) => {
    if (typeof rate === 'number') {
      return rate.toFixed(1);
    }
    const parsed = parseFloat(String(rate || 0));
    return isNaN(parsed) ? '0.0' : parsed.toFixed(1);
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      notation: 'compact',
    }).format(value);

  // Calculate totals
  const totals = timeSeriesData.reduce(
    (acc, item) => ({
      orders: acc.orders + (item.orders || 0),
      revenue: acc.revenue + (item.revenue || 0),
      actions: acc.actions + (item.actions || 0),
      completionRate:
        acc.completionRate +
        (typeof item.completionRate === 'number'
          ? item.completionRate
          : parseFloat(String(item.completionRate || 0)) || 0),
    }),
    { orders: 0, revenue: 0, actions: 0, completionRate: 0 }
  );

  const avgCompletionRate =
    timeSeriesData.length > 0 ? totals.completionRate / timeSeriesData.length : 0;

  return (
    <Card>
      <CardHeader title={title} />
      <Box sx={{ p: 3 }}>
        {/* Summary Stats */}
        <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
          <Chip label={`Tổng đơn hàng: ${totals.orders}`} color="primary" variant="outlined" />
          <Chip
            label={`Tổng doanh thu: ${formatCurrency(totals.revenue)}`}
            color="success"
            variant="outlined"
          />
          <Chip label={`Tổng hành động: ${totals.actions}`} color="info" variant="outlined" />
          <Chip
            label={`TB hoàn thành: ${formatCompletionRate(avgCompletionRate)}%`}
            color="secondary"
            variant="outlined"
          />
        </Stack>

        {/* Time Series Data Table */}
        <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
          {timeSeriesData.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1,
                px: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:last-child': { borderBottom: 'none' },
              }}
            >
              <Typography variant="body2" sx={{ minWidth: 80 }}>
                {formatDate(item.date)}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ flex: 1, justifyContent: 'flex-end' }}>
                <Typography variant="body2" color="primary.main">
                  {item.orders || 0} đơn
                </Typography>
                <Typography variant="body2" color="success.main">
                  {item.revenue ? formatCurrency(item.revenue) : '0đ'}
                </Typography>
                <Typography variant="body2" color="info.main">
                  {item.actions || 0} hành động
                </Typography>
                <Typography variant="body2" color="secondary.main">
                  {typeof item.completionRate === 'number'
                    ? item.completionRate.toFixed(1)
                    : (parseFloat(String(item.completionRate || 0)) || 0).toFixed(1)}
                  %
                </Typography>
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  );
}
