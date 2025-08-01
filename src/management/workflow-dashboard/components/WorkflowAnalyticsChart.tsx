import React from 'react';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, Box, CardProps, Stack, Typography, Chip } from '@mui/material';
// utils
import { fNumber, fShortenNumber } from '../../../common/utils/formatNumber';
// components
import { BaseOptionChart } from '../../../common/components/chart';
import Iconify from '../../../common/components/Iconify';

// ----------------------------------------------------------------------

interface ChartDataItem {
  name: string;
  type: 'line' | 'bar' | 'area';
  fill?: 'solid' | 'gradient';
  data: number[];
  yAxisIndex?: number;
}

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chartLabels: string[];
  chartData: ChartDataItem[];
  chartColors?: string[];
  summary?: {
    total: number;
    trend: number;
    icon: string;
    color: 'primary' | 'success' | 'warning' | 'error';
  };
}

export default function WorkflowAnalyticsChart({
  title,
  subheader,
  chartLabels,
  chartData,
  chartColors,
  summary,
  ...other
}: Props) {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    chart: {
      type: 'line',
      stacked: false,
      toolbar: {
        show: true,
      },
    },
    stroke: {
      width: chartData.map((item) => (item.type === 'bar' ? 0 : 2)),
      curve: 'smooth',
    },
    plotOptions: {
      bar: {
        columnWidth: '24%',
        borderRadius: 4,
      },
    },
    fill: {
      type: chartData.map((item) => (item.fill === 'gradient' ? 'gradient' : 'solid')),
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.3,
        gradientToColors: chartColors,
        inverseColors: true,
        opacityFrom: 0.8,
        opacityTo: 0.6,
        stops: [0, 100],
      },
    },
    colors: chartColors || [
      theme.palette.primary.main, // Đơn hàng (bar)
      theme.palette.info.main, // Doanh thu (line)
      theme.palette.warning.main, // Hoạt động (line)
      theme.palette.success.main, // MoMo thành công (line)
      theme.palette.error.main, // Tiền mặt thành công (line)
    ],
    labels: chartLabels,
    xaxis: {
      type: 'category',
      categories: chartLabels,
    },
    yaxis: [
      {
        // Primary Y-axis for orders, actions, momo, cash (smaller numbers)
        title: {
          text: 'Số lượng',
        },
        labels: {
          formatter: (value: number) => fNumber(value),
        },
      },
      {
        // Secondary Y-axis for revenue (larger numbers)
        opposite: true,
        title: {
          text: 'Doanh thu (VNĐ)',
        },
        labels: {
          formatter: (value: number) => fShortenNumber(value),
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => fNumber(value),
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
    grid: {
      strokeDashArray: 3,
      borderColor: theme.palette.divider,
    },
    dataLabels: {
      enabled: false,
    },
  });

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return 'eva:trending-up-fill';
    if (trend < 0) return 'eva:trending-down-fill';
    return 'eva:minus-fill';
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'success';
    if (trend < 0) return 'error';
    return 'default';
  };

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          summary && (
            <Stack direction="row" spacing={2} alignItems="center">
              <Stack alignItems="flex-end">
                <Typography variant="h4" color={`${summary.color}.main`}>
                  {fShortenNumber(summary.total)}
                </Typography>
                <Chip
                  size="small"
                  icon={<Iconify icon={getTrendIcon(summary.trend)} width={16} />}
                  label={`${summary.trend > 0 ? '+' : ''}${summary.trend.toFixed(1)}%`}
                  color={getTrendColor(summary.trend) as any}
                  variant="outlined"
                />
              </Stack>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: `${summary.color}.main`,
                  bgcolor: (theme) => theme.palette[summary.color].lighter,
                }}
              >
                <Iconify icon={summary.icon} width={24} />
              </Box>
            </Stack>
          )
        }
      />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        {chartData && chartData.length > 0 ? (
          <ReactApexChart
            type="line"
            series={chartData.map((item) => ({
              name: item.name,
              type: item.type,
              data: item.data,
              fill: item.fill,
              yAxisIndex: item.yAxisIndex || 0,
            }))}
            options={{
              ...chartOptions,
              chart: {
                ...chartOptions.chart,
                type: 'line',
              },
            }}
            height={364}
          />
        ) : (
          <Box
            sx={{
              height: 364,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary',
            }}
          >
            <Typography variant="body2">Không có dữ liệu để hiển thị</Typography>
          </Box>
        )}
      </Box>
    </Card>
  );
}
