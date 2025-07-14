import React from 'react';
// @mui
import { Box, Typography, Stack, Avatar, Card } from '@mui/material';
// components
import Iconify from '../../../common/components/Iconify';
import { fNumber } from '../../../common/utils/formatNumber';

// ----------------------------------------------------------------------

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
  subtitle?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color,
  trend,
  trendValue,
  subtitle,
}: StatCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return 'eva:trending-up-fill';
      case 'down':
        return 'eva:trending-down-fill';
      default:
        return 'eva:minus-fill';
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'success.main';
      case 'down':
        return 'error.main';
      default:
        return 'text.secondary';
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h3" color={`${color}.main`}>
            {fNumber(value)}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Avatar
          variant="rounded"
          sx={{
            bgcolor: `${color}.lighter`,
            color: `${color}.main`,
            width: 64,
            height: 64,
          }}
        >
          <Iconify icon={icon} width={32} height={32} />
        </Avatar>
      </Stack>

      {trend && trendValue !== undefined && (
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
          <Iconify icon={getTrendIcon()} sx={{ color: getTrendColor() }} />
          <Typography variant="caption" sx={{ color: getTrendColor() }}>
            {trendValue > 0 ? '+' : ''}
            {trendValue}%
          </Typography>
          <Typography variant="caption" color="text.secondary">
            so với kỳ trước
          </Typography>
        </Stack>
      )}
    </Card>
  );
}
