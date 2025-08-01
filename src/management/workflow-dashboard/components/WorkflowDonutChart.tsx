import React from 'react';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader, CardProps, Box, Typography, Stack } from '@mui/material';
// utils
import { fNumber, fPercent } from '../../../common/utils/formatNumber';
// components
import { BaseOptionChart } from '../../../common/components/chart';
import Iconify from '../../../common/components/Iconify';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 320;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important' as 'relative',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

interface ChartItem {
  label: string;
  value: number;
  color?: string;
  icon?: string;
}

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chartData: ChartItem[];
  chartColors?: string[];
  total?: number;
}

export default function WorkflowDonutChart({
  title,
  subheader,
  chartData,
  chartColors,
  total,
  ...other
}: Props) {
  const theme = useTheme();

  const chartLabels = chartData.map((item) => item.label);
  const chartSeries = chartData.map((item) => item.value);

  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.info.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.success.main,
    theme.palette.grey[500],
  ];

  const chartOptions = merge(BaseOptionChart(), {
    colors: chartColors || defaultColors,
    labels: chartLabels,
    stroke: {
      colors: [theme.palette.background.paper],
      width: 2,
    },
    legend: {
      floating: true,
      horizontalAlign: 'center',
      itemMargin: {
        horizontal: 8,
        vertical: 4,
      },
    },
    fill: {
      opacity: 0.8,
    },
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: false },
      style: {
        fontSize: '12px',
        fontWeight: 600,
      },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value: number) => fNumber(value),
        title: {
          formatter: (seriesName: string) => `${seriesName}: `,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              fontSize: '22px',
              fontWeight: 600,
              color: theme.palette.text.primary,
              formatter: () => fNumber(total || chartSeries.reduce((a, b) => a + b, 0)),
            },
            value: {
              show: true,
              fontSize: '16px',
              fontWeight: 600,
              color: theme.palette.text.primary,
              formatter: (val: string) => fNumber(Number(val)),
            },
            name: {
              show: true,
              fontSize: '13px',
              color: theme.palette.text.secondary,
              offsetY: 20,
            },
          },
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          total && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Iconify icon="eva:pie-chart-2-fill" width={20} />
              <Typography variant="h6">{fNumber(total)}</Typography>
            </Stack>
          )
        }
      />

      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="donut" series={chartSeries} options={chartOptions} height={280} />
      </ChartWrapperStyle>

      {/* Custom Legend with Icons */}
      <Box sx={{ px: 3, pb: 3 }}>
        <Stack spacing={1}>
          {chartData.map((item, index) => (
            <Stack key={item.label} direction="row" alignItems="center" spacing={2}>
              {item.icon && <Iconify icon={item.icon} width={20} />}
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: item.color || (chartColors || defaultColors)[index],
                }}
              />
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                {item.label}
              </Typography>
              <Typography variant="subtitle2">
                {fNumber(item.value)} (
                {fPercent((item.value / (total || chartSeries.reduce((a, b) => a + b, 0))) * 100)})
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Card>
  );
}
