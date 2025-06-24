import React from 'react';
import { Stack, Typography, Box, CircularProgress } from '@mui/material';
// utils
import { fShortenNumber } from '../../../common/utils/formatNumber';
// components
import Iconify from '../../../common/components/Iconify';
import { useTheme } from '@mui/material/styles';
import { useGetAnalyticsOrder } from '../../hooks/useGetAnalyticsOrder';

// ----------------------------------------------------------------------

type AnalyticItem = {
  icon: string;
  title: string;
  value: number;
  color: string;
};

const STATUS_ANALYTICS: AnalyticItem[] = [
  {
    icon: 'eva:clock-outline',
    title: 'Chờ xác nhận',
    value: 0,
    color: 'warning.main',
  },
  {
    icon: 'eva:archive-outline',
    title: 'Chờ lấy hàng',
    value: 0,
    color: 'primary.main',
  },
  {
    icon: 'eva:car-outline',
    title: 'Đang giao',
    value: 0,
    color: 'info.main',
  },
  {
    icon: 'eva:checkmark-circle-2-outline',
    title: 'Đã giao',
    value: 0,
    color: 'success.main',
  },
  {
    icon: 'eva:refresh-outline',
    title: 'Trả hàng',
    value: 0,
    color: 'default',
  },
  {
    icon: 'eva:close-circle-outline',
    title: 'Đã hủy',
    value: 0,
    color: 'error.main',
  },
];

type Analytics = {
  pendingConfirmation?: number;
  pendingPickup?: number;
  shipping?: number;
  delivered?: number;
  returned?: number;
  cancelled?: number;
};

const OrderAnalytic = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetAnalyticsOrder();

  const analytics: Analytics = data?.metadata || {};

  const total =
    (analytics.pendingConfirmation || 0) +
    (analytics.pendingPickup || 0) +
    (analytics.shipping || 0) +
    (analytics.delivered || 0) +
    (analytics.returned || 0) +
    (analytics.cancelled || 0);

  const items: AnalyticItem[] = [
    {
      icon: 'eva:clock-outline',
      title: 'Chờ xác nhận',
      value: analytics.pendingConfirmation || 0,
      color: theme.palette.warning.main,
    },
    {
      icon: 'eva:archive-outline',
      title: 'Chờ lấy hàng',
      value: analytics.pendingPickup || 0,
      color: theme.palette.primary.main,
    },
    {
      icon: 'eva:car-outline',
      title: 'Đang giao',
      value: analytics.shipping || 0,
      color: theme.palette.info.main,
    },
    {
      icon: 'eva:checkmark-circle-2-outline',
      title: 'Đã giao',
      value: analytics.delivered || 0,
      color: theme.palette.success.main,
    },
    {
      icon: 'eva:refresh-outline',
      title: 'Trả hàng',
      value: analytics.returned || 0,
      color: theme.palette.text.secondary,
    },
    {
      icon: 'eva:close-circle-outline',
      title: 'Đã hủy',
      value: analytics.cancelled || 0,
      color: theme.palette.error.main,
    },
  ];

  if (isLoading) {
    return (
      <Stack direction="row" spacing={2} sx={{ py: 2 }}>
        {items.map((item) => (
          <Stack
            key={item.title}
            alignItems="center"
            justifyContent="center"
            sx={{ minWidth: 200 }}
          >
            <CircularProgress size={56} thickness={4} />
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              {item.title}
            </Typography>
          </Stack>
        ))}
      </Stack>
    );
  }

  return (
    <Stack
      direction="row"
      divider={<Box sx={{ width: 1, borderRight: 1, borderColor: 'divider' }} />}
      sx={{ py: 2 }}
    >
      {items.map((item) => (
        <Stack
          key={item.title}
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ width: 1, minWidth: 200 }}
        >
          <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
            <Iconify
              icon={item.icon}
              sx={{ color: item.color, width: 24, height: 24, position: 'absolute' }}
            />

            <CircularProgress
              variant="determinate"
              value={total ? (item.value / total) * 100 : 0}
              size={56}
              thickness={4}
              sx={{ color: item.color, opacity: 0.48 }}
            />

            <CircularProgress
              variant="determinate"
              value={100}
              size={56}
              thickness={4}
              sx={{ color: 'grey.50016', position: 'absolute', top: 0, left: 0, opacity: 0.48 }}
            />
          </Stack>

          <Stack spacing={0.5} sx={{ ml: 2 }}>
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="subtitle2">
              {fShortenNumber(item.value)}{' '}
              <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
                đơn
              </Box>
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default OrderAnalytic;
