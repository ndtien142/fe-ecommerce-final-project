// Migration utility to map old status to new status system
export const mapOldStatusToNew = (oldStatus: string): string => {
  const statusMap: { [key: string]: string } = {
    pending_confirmation: 'pending_confirmation',
    pending_pickup: 'pending_pickup',
    shipping: 'shipping',
    delivered: 'delivered',
    returned: 'returned',
    cancelled: 'cancelled',
  };

  return statusMap[oldStatus] || 'pending_confirmation';
};

// Updated status configuration to match router documentation
export const ORDER_STATUS_CONFIG = {
  pending_confirmation: { color: 'warning', text: 'Chờ xác nhận', icon: 'eva:clock-outline' },
  pending_pickup: { color: 'info', text: 'Chờ lấy hàng', icon: 'eva:checkmark-circle-outline' },
  shipping: { color: 'primary', text: 'Đang giao', icon: 'eva:car-outline' },
  delivered: { color: 'success', text: 'Đã giao', icon: 'eva:checkmark-circle-2-outline' },
  returned: { color: 'secondary', text: 'Đã trả hàng', icon: 'eva:undo-outline' },
  cancelled: { color: 'error', text: 'Đã hủy', icon: 'eva:close-circle-outline' },
};

export const PAYMENT_STATUS_CONFIG = {
  pending: { color: 'warning', text: 'Chờ thanh toán', icon: 'eva:clock-outline' },
  completed: { color: 'success', text: 'Đã thanh toán', icon: 'eva:checkmark-circle-outline' },
  failed: { color: 'error', text: 'Thanh toán thất bại', icon: 'eva:close-circle-outline' },
  cancelled: { color: 'error', text: 'Đã hủy thanh toán', icon: 'eva:close-outline' },
  expired: { color: 'error', text: 'Hết hạn thanh toán', icon: 'eva:clock-outline' },
  refunded: { color: 'info', text: 'Đã hoàn tiền', icon: 'eva:undo-outline' },
};
