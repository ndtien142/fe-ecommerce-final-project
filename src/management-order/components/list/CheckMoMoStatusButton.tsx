import { useState } from 'react';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { useCheckMoMoPaymentStatus } from '../../hooks/useCheckMoMoPaymentStatus';
import Iconify from '../../../common/components/Iconify';
import { IOrder } from '../../../common/@types/order/order.interface';

// ----------------------------------------------------------------------

interface CheckMoMoStatusButtonProps {
  order: IOrder;
}

export default function CheckMoMoStatusButton({ order }: CheckMoMoStatusButtonProps) {
  const { mutate: checkStatus, isLoading } = useCheckMoMoPaymentStatus();
  const [isChecking, setIsChecking] = useState(false);

  const { id, payment } = order;
  const paymentMethod = payment?.paymentMethod || '';
  const paymentStatus = payment?.status || '';

  // Chỉ hiển thị button nếu thanh toán bằng MoMo và trạng thái không phải completed
  if (paymentMethod !== 'momo' || paymentStatus === 'completed') {
    return null;
  }

  const handleCheckStatus = async () => {
    setIsChecking(true);
    try {
      // Gọi API để kiểm tra trạng thái thanh toán thực tế từ MoMo
      // Hữu ích khi: đơn hàng đã thanh toán nhưng chưa được cập nhật trong hệ thống
      // hoặc cần xác nhận lại trạng thái thanh toán
      await checkStatus(id);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Tooltip
      title={
        <div style={{ whiteSpace: 'pre-line' }}>
          <strong>Kiểm tra trạng thái thanh toán MoMo</strong>
          {'\n\n'}
          Sử dụng tính năng này khi:
          {'\n'}• Đơn hàng đã thanh toán nhưng hệ thống chưa cập nhật
          {'\n'}• Trạng thái thanh toán vẫn đang pending
          {'\n'}• Cần xác nhận lại trạng thái từ MoMo
          {'\n'}• Kiểm tra lý do giao dịch thất bại
          {'\n\n'}
          Hệ thống sẽ gọi API để kiểm tra trạng thái thực tế từ MoMo và hiển thị thông báo chi tiết.
        </div>
      }
      placement="top"
    >
      <Button
        size="small"
        variant="outlined"
        color="warning"
        onClick={handleCheckStatus}
        disabled={isLoading || isChecking}
        startIcon={
          isLoading || isChecking ? (
            <CircularProgress size={12} />
          ) : (
            <Iconify icon="eva:refresh-fill" width={12} height={12} />
          )
        }
        sx={{
          minWidth: 'auto',
          fontSize: '0.75rem',
          py: 0.5,
          px: 1,
        }}
      >
        {isLoading || isChecking ? 'Đang kiểm tra...' : 'Kiểm tra MoMo'}
      </Button>
    </Tooltip>
  );
}
