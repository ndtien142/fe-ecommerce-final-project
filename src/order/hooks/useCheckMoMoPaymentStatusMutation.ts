import { useMutation, useQueryClient } from 'react-query';
import { checkMoMoPaymentStatus } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { useSnackbar } from 'notistack';

export function useCheckMoMoPaymentStatusMutation() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (orderId: number) => checkMoMoPaymentStatus(orderId),    onSuccess: (data) => {
      const { resultCode, message } = data.metadata;
      const code = typeof resultCode === 'string' ? parseInt(resultCode) : resultCode;
      
      // Map MoMo result codes to user-friendly messages
      const getStatusMessage = (code: number, originalMessage: string) => {
        switch (code) {
          case 0:
            return { message: 'Thanh toán thành công!', variant: 'success' as const };
          case 1006:
            return { message: 'Giao dịch bị từ chối bởi người dùng', variant: 'error' as const };
          case 1001:
            return { message: 'Giao dịch thất bại', variant: 'error' as const };
          case 1002:
            return { message: 'Giao dịch bị từ chối bởi ngân hàng', variant: 'error' as const };
          case 1003:
            return { message: 'Giao dịch bị hủy', variant: 'warning' as const };
          case 1004:
            return { message: 'Giao dịch bị từ chối do vượt quá hạn mức thanh toán', variant: 'error' as const };
          case 1005:
            return { message: 'Giao dịch bị từ chối do url hoặc QR code đã hết hạn', variant: 'error' as const };
          case 1007:
            return { message: 'Giao dịch bị từ chối do tài khoản người dùng đang bị khóa', variant: 'error' as const };
          case 2001:
            return { message: 'Giao dịch đang chờ xử lý', variant: 'info' as const };
          case 2006:
            return { message: 'Giao dịch đang chờ xác nhận', variant: 'warning' as const };
          default:
            return { message: originalMessage || 'Trạng thái không xác định', variant: 'info' as const };
        }
      };

      const statusInfo = getStatusMessage(code, message);
      enqueueSnackbar(statusInfo.message, { variant: statusInfo.variant });

      // Invalidate and refetch order list
      queryClient.invalidateQueries([QUERY_KEYS.ORDER_LIST]);
      queryClient.invalidateQueries([QUERY_KEYS.ORDER]);
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.message || 'Có lỗi xảy ra khi kiểm tra trạng thái thanh toán', {
        variant: 'error',
      });
    },
  });
}
