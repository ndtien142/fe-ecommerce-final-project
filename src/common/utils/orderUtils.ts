import { OrderManagementService } from '../services/orderManagementService';
import { mapOldStatusToNew } from './orderStatusMigration';

export class OrderUtils {
  static storePendingOrder(orderData: {
    orderId: string;
    amount: number;
    paymentMethod: string;
    couponCode?: string;
  }) {
    localStorage.setItem('pendingOrder', JSON.stringify(orderData));
  }

  static getPendingOrder() {
    const data = localStorage.getItem('pendingOrder');
    return data ? JSON.parse(data) : null;
  }

  static clearPendingOrder() {
    localStorage.removeItem('pendingOrder');
  }

  static clearCart() {
    localStorage.removeItem('cart');
  }

  static generateOrderInfo(cartId: string, customerName?: string) {
    const timestamp = new Date().getTime();
    return `Đơn hàng ${cartId} - ${customerName || 'Khách hàng'} - ${timestamp}`;
  }

  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  }

  /**
   * Handle payment return from MoMo
   */
  static handlePaymentReturn(): {
    orderId: string | null;
    resultCode: string | null;
    transId: string | null;
    amount: string | null;
    message: string | null;
  } {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      orderId: urlParams.get('orderId'),
      resultCode: urlParams.get('resultCode'),
      transId: urlParams.get('transId'),
      amount: urlParams.get('amount'),
      message: urlParams.get('message'),
    };
  }

  /**
   * Check if payment was successful
   */
  static isPaymentSuccessful(resultCode: string | null): boolean {
    return resultCode === '0';
  }

  /**
   * Map old status to new status system
   */
  static mapStatus(oldStatus: string): string {
    return mapOldStatusToNew(oldStatus);
  }

  /**
   * Get status configuration for display
   */
  static getStatusConfig(status: string): { color: string; text: string; icon: string } {
    return OrderManagementService.getStatusConfig(status);
  }

  /**
   * Get payment status configuration for display
   */
  static getPaymentStatusConfig(status: string): { color: string; text: string; icon: string } {
    return OrderManagementService.getPaymentStatusConfig(status);
  }

  /**
   * Check if order can be cancelled
   */
  static canCancelOrder(status: string): boolean {
    return ['pending_confirmation', 'pending_pickup'].includes(status);
  }

  /**
   * Check if order can be refunded
   */
  static canRefundOrder(status: string, paymentStatus: string): boolean {
    return status === 'delivered' && paymentStatus === 'completed';
  }

  /**
   * Check if order status can be updated
   */
  static canUpdateStatus(currentStatus: string, newStatus: string): boolean {
    const statusFlow: { [key: string]: string[] } = {
      pending_confirmation: ['pending_pickup', 'cancelled'],
      pending_pickup: ['shipping', 'cancelled'],
      shipping: ['delivered', 'returned'],
      delivered: ['returned'],
      cancelled: [],
      returned: [],
    };

    return statusFlow[currentStatus]?.includes(newStatus) || false;
  }

  /**
   * Get next possible statuses
   */
  static getNextStatuses(currentStatus: string): string[] {
    const statusFlow: { [key: string]: string[] } = {
      pending_confirmation: ['pending_pickup', 'cancelled'],
      pending_pickup: ['shipping', 'cancelled'],
      shipping: ['delivered', 'returned'],
      delivered: ['returned'],
      cancelled: [],
      returned: [],
    };

    return statusFlow[currentStatus] || [];
  }

  static getPaymentStatusMessage(resultCode: string): string {
    switch (resultCode) {
      case '0':
        return 'Thanh toán thành công';
      case '9000':
        return 'Giao dịch được xác thực thành công';
      case '8000':
        return 'Giao dịch đang được xử lý';
      case '7000':
        return 'Giao dịch bị từ chối bởi người dùng';
      case '1006':
        return 'Giao dịch bị từ chối do vượt quá hạn mức thanh toán';
      case '1005':
        return 'Giao dịch bị từ chối do URL hoặc QR code đã hết hạn';
      case '1004':
        return 'Số tiền vượt quá hạn mức';
      case '1000':
        return 'Tài khoản của khách hàng chưa được kích hoạt';
      case '99':
        return 'Lỗi không xác định';
      default:
        return 'Giao dịch thất bại';
    }
  }

  /**
   * Get order status color for UI
   */
  static getStatusColor(status: string): string {
    const config = this.getStatusConfig(status);
    return config.color;
  }

  /**
   * Get order status text for UI
   */
  static getStatusText(status: string): string {
    const config = this.getStatusConfig(status);
    return config.text;
  }

  /**
   * Get order status icon for UI
   */
  static getStatusIcon(status: string): string {
    const config = this.getStatusConfig(status);
    return config.icon;
  }

  /**
   * Format date for display
   */
  static formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
