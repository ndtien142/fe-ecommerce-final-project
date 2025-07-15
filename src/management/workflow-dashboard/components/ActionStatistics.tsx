import React from 'react';
// @mui
import { Card, Typography, Stack, Chip } from '@mui/material';
// components
import Iconify from '../../../common/components/Iconify';
import { fPercent } from '../../../common/utils/formatNumber';

// ----------------------------------------------------------------------

interface ActionStatisticsProps {
  actionStats?: Array<{
    action: string;
    count: number;
    percentage: number;
    trend: 'up' | 'down' | 'stable';
  }>;
}

export default function ActionStatistics({ actionStats }: ActionStatisticsProps) {
  if (!actionStats || actionStats.length === 0) {
    return (
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Thống kê hành động
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Không có dữ liệu
        </Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Thống kê hành động
      </Typography>
      <Stack spacing={2}>
        {actionStats.map((item) => (
          <Stack
            key={item.action}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Chip
                label={item.action}
                size="small"
                variant="outlined"
                color={
                  item.trend === 'up' ? 'success' : item.trend === 'down' ? 'error' : 'default'
                }
              />
              <Typography variant="body2">{item.count}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify
                icon={
                  item.trend === 'up'
                    ? 'eva:trending-up-fill'
                    : item.trend === 'down'
                    ? 'eva:trending-down-fill'
                    : 'eva:minus-fill'
                }
                sx={{
                  color:
                    item.trend === 'up'
                      ? 'success.main'
                      : item.trend === 'down'
                      ? 'error.main'
                      : 'text.secondary',
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {fPercent(item.percentage)}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
