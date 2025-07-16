import { useState } from 'react';
import { Button, CircularProgress, Tooltip } from '@mui/material';
import { useCheckMoMoPaymentStatusMutation } from '../../hooks/useCheckMoMoPaymentStatusMutation';
import Iconify from '../../../common/components/Iconify';
import { IOrder } from '../../../common/@types/order/order.interface';

// ----------------------------------------------------------------------

interface CheckMoMoStatusButtonProps {
  order: IOrder;
}

export default function CheckMoMoStatusButton({ order }: CheckMoMoStatusButtonProps) {
  const { mutate: checkStatus, isLoading } = useCheckMoMoPaymentStatusMutation();
  const [isChecking, setIsChecking] = useState(false);

  const { id, payment } = order;
  const paymentMethod = payment?.paymentMethod || '';
  const paymentStatus = payment?.status || '';

  // Chỉ hiển thị button nếu thanh toán bằng MoMo và trạng thái chưa completed
  if (paymentMethod !== 'momo' || paymentStatus === 'completed') {
    return null;
  }

  const handleCheckStatus = async () => {
    setIsChecking(true);
    try {
      // Gọi API để kiểm tra trạng thái thanh toán thực tế từ MoMo
      // Hữu ích khi: đã thanh toán nhưng chưa được cập nhật trong hệ thống
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
          Nếu bạn đã thanh toán nhưng đơn hàng vẫn chưa được cập nhật, hãy nhấn để kiểm tra lại
          trạng thái thanh toán.
          {'\n\n'}
          Hệ thống sẽ hiển thị thông báo chi tiết về tình trạng giao dịch.
        </div>
      }
      placement="top"
    >
      <Button
        size="small"
        variant="outlined"
        color="primary"
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
        {isLoading || isChecking ? 'Đang kiểm tra...' : 'Kiểm tra thanh toán'}
      </Button>
    </Tooltip>
  );
}
