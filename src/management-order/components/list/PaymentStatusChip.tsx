import { Stack, Typography, Chip } from '@mui/material';
import { IOrderPayment } from '../../../common/@types/order/order.interface';
import Iconify from '../../../common/components/Iconify';

// ----------------------------------------------------------------------

interface PaymentStatusChipProps {
  payment: IOrderPayment;
}

export default function PaymentStatusChip({ payment }: PaymentStatusChipProps) {
  const paymentMethod = payment?.paymentMethod || '';
  const paymentStatus = payment?.status || '';

  // Payment method icon mapping
  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'momo':
        return 'eva:smartphone-outline';
      case 'vnpay':
        return 'eva:credit-card-outline';
      case 'cod':
        return 'eva:cash-outline';
      case 'bank_transfer':
        return 'eva:clipboard-outline';
      default:
        return 'eva:credit-card-outline';
    }
  };

  // Payment status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      case 'cancelled':
        return 'error';
      case 'expired':
        return 'error';
      case 'refunded':
        return 'info';
      default:
        return 'default';
    }
  };

  // Payment status label mapping
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Đã thanh toán';
      case 'pending':
        return 'Chờ thanh toán';
      case 'failed':
        return 'Thất bại';
      case 'cancelled':
        return 'Đã hủy';
      case 'expired':
        return 'Hết hạn';
      case 'refunded':
        return 'Đã hoàn tiền';
      default:
        return 'Không xác định';
    }
  };

  // Payment method label mapping
  const getMethodLabel = (method: string) => {
    switch (method) {
      case 'momo':
        return 'MoMo';
      case 'vnpay':
        return 'VNPay';
      case 'cod':
        return 'COD';
      case 'bank_transfer':
        return 'Chuyển khoản';
      default:
        return method;
    }
  };

  return (
    <Stack spacing={0.5} minWidth={100}>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Iconify icon={getPaymentIcon(paymentMethod)} width={14} height={14} />
        <Typography variant="caption" color="text.secondary">
          {getMethodLabel(paymentMethod)}
        </Typography>
      </Stack>
      <Chip
        label={getStatusLabel(paymentStatus)}
        color={getStatusColor(paymentStatus) as any}
        variant="outlined"
        size="small"
        sx={{
          height: 20,
          fontSize: '0.75rem',
          fontWeight: 500,
        }}
      />
    </Stack>
  );
}
