import React from 'react';
// @mui
import { Box, Card, Typography, Stack, LinearProgress } from '@mui/material';
import { fPercent } from '../../../common/utils/formatNumber';

// ----------------------------------------------------------------------

interface OrderStatusDistributionProps {
  ordersByStatus?: Array<{
    status: string;
    count: number;
    percentage: number;
  }>;
}

export default function OrderStatusDistribution({ ordersByStatus }: OrderStatusDistributionProps) {
  if (!ordersByStatus || ordersByStatus.length === 0) {
    return (
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Phân bố trạng thái đơn hàng
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
        Phân bố trạng thái đơn hàng
      </Typography>
      <Stack spacing={2}>
        {ordersByStatus.map((item) => (
          <Box key={item.status}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1 }}
            >
              <Typography variant="body2">{item.status}</Typography>
              <Typography variant="subtitle2">
                {item.count} ({fPercent(item.percentage)})
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={
                typeof item.percentage === 'number'
                  ? item.percentage
                  : parseFloat(item.percentage) || 0
              }
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'grey.300',
              }}
            />
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
