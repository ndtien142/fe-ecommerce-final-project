import React from 'react';
// @mui
import { Card, Typography, Stack, Chip } from '@mui/material';
import { fCurrency } from '../../../common/utils/formatNumber';

// ----------------------------------------------------------------------

interface PaymentMethodsProps {
  paymentsByStatusAndMethod?: Array<{
    method: string;
    status: string;
    count: number;
    totalAmount: number;
  }>;
}

export default function PaymentMethods({ paymentsByStatusAndMethod }: PaymentMethodsProps) {
  if (!paymentsByStatusAndMethod || paymentsByStatusAndMethod.length === 0) {
    return (
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Phương thức thanh toán
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
        Phương thức thanh toán
      </Typography>
      <Stack spacing={2}>
        {paymentsByStatusAndMethod.map((item) => (
          <Stack
            key={`${item.method}-${item.status}`}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Chip
                label={item.method}
                size="small"
                color={item.status === 'completed' ? 'success' : 'default'}
              />
              <Typography variant="body2">{item.count} đơn</Typography>
            </Stack>
            <Typography variant="subtitle2">{fCurrency(item.totalAmount)}</Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
