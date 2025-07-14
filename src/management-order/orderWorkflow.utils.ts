import { IActionConfig } from 'src/common/@types/order/workflow.interface';

export const getActionConfig = (action: string): IActionConfig => {
  const actionConfigs: Record<string, IActionConfig> = {
    confirm: {
      key: 'confirm',
      title: 'Xác nhận đơn hàng',
      color: 'success',
      icon: 'eva:checkmark-circle-2-fill',
      requiresNote: true,
      nextStatus: 'pending_pickup',
      description: 'Xác nhận đơn hàng và chuyển sang trạng thái chờ lấy hàng',
    },
    pickup: {
      key: 'pickup',
      title: 'Lấy hàng',
      color: 'primary',
      icon: 'eva:archive-fill',
      requiresNote: true,
      requiresTracking: true,
      nextStatus: 'shipping',
      description: 'Xác nhận đã lấy hàng và bắt đầu vận chuyển',
    },
    deliver: {
      key: 'deliver',
      title: 'Giao hàng thành công',
      color: 'success',
      icon: 'eva:car-fill',
      requiresNote: true,
      nextStatus: 'delivered',
      description: 'Xác nhận đã giao hàng thành công',
    },
    'customer-confirm': {
      key: 'customer-confirm',
      title: 'Khách hàng xác nhận',
      color: 'success',
      icon: 'eva:person-done-fill',
      requiresNote: true,
      nextStatus: 'customer_confirmed',
      description: 'Khách hàng xác nhận đã nhận hàng',
    },
    'complete-cod': {
      key: 'complete-cod',
      title: 'Hoàn tất COD',
      color: 'info',
      icon: 'eva:credit-card-fill',
      requiresNote: true,
      nextStatus: 'cod_completed',
      description: 'Hoàn tất thanh toán COD',
    },
    return: {
      key: 'return',
      title: 'Trả hàng',
      color: 'warning',
      icon: 'eva:undo-fill',
      requiresNote: true,
      requiresReason: true,
      nextStatus: 'returned',
      description: 'Xử lý trả hàng với lý do cụ thể',
    },
    cancel: {
      key: 'cancel',
      title: 'Hủy đơn hàng',
      color: 'error',
      icon: 'eva:close-circle-fill',
      requiresNote: true,
      requiresReason: true,
      nextStatus: 'cancelled',
      description: 'Hủy đơn hàng và thông báo cho khách hàng',
    },
    refund: {
      key: 'refund',
      title: 'Hoàn tiền',
      color: 'warning',
      icon: 'eva:credit-card-fill',
      requiresNote: true,
      requiresReason: true,
      nextStatus: 'refunded',
      description: 'Xử lý hoàn tiền cho khách hàng',
    },
  };

  return (
    actionConfigs[action] || {
      key: action,
      title: action,
      color: 'primary',
      icon: 'eva:question-mark-circle-fill',
      description: 'Hành động không xác định',
    }
  );
};

export function getTimelineActionConfig(action: string): {
  icon: string;
  color: string;
  title: string;
} {
  const actionConfigs: { [key: string]: { icon: string; color: string; title: string } } = {
    created: { icon: '🆕', color: 'info', title: 'Tạo đơn hàng' },
    confirmed: { icon: '✅', color: 'success', title: 'Xác nhận đơn hàng' },
    picked_up: { icon: '📦', color: 'primary', title: 'Lấy hàng' },
    shipped: { icon: '🚚', color: 'primary', title: 'Đang giao hàng' },
    delivered: { icon: '📋', color: 'warning', title: 'Đã giao hàng' },
    customer_confirmed: { icon: '👤', color: 'success', title: 'Khách hàng xác nhận' },
    cod_completed: { icon: '💰', color: 'success', title: 'Hoàn tất COD' },
    returned: { icon: '🔄', color: 'secondary', title: 'Trả hàng' },
    cancelled: { icon: '❌', color: 'error', title: 'Hủy đơn hàng' },
    refunded: { icon: '💳', color: 'info', title: 'Hoàn tiền' },
  };

  return actionConfigs[action] || { icon: '❓', color: 'default', title: 'Không xác định' };
}
