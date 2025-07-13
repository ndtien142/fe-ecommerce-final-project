export class OrderUtils {
  static storePendingOrder(orderData: { orderId: string; amount: number; paymentMethod: string }) {
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
}
