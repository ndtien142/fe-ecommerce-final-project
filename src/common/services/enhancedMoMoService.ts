import {
  createOrderWithMoMo,
  checkMoMoPaymentStatus,
  checkMoMoTransactionStatus,
  getMoMoPaymentExpiration,
  cancelMoMoPayment,
  processMoMoRefund,
  getMoMoRefundHistory,
} from '../../checkout/service';
import {
  IFormCreateMoMoOrder,
  IMoMoRefundRequest,
  IMoMoItemInfo,
  IMoMoUserInfo,
  IMoMoDeliveryInfo,
} from '../@types/payment/momo.interface';

export class EnhancedMoMoService {
  // Generate unique order ID
  static generateUniqueOrderId(internalOrderId: string): string {
    return `ORDER_${internalOrderId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Create enhanced MoMo payment
  static async createPayment(paymentData: {
    orderId?: string;
    internalOrderId: string;
    amount: number;
    orderInfo: string;
    items?: IMoMoItemInfo[];
    deliveryInfo?: IMoMoDeliveryInfo;
    userInfo?: IMoMoUserInfo;
    referenceId?: string;
    storeName?: string;
    subPartnerCode?: string;
    cart: any;
    addressId: number;
    paymentMethodId: number;
    shippingMethodId: number;
    note?: string;
    couponCode?: string;
    shippingFee?: number;
  }) {
    try {
      const momoPayload: IFormCreateMoMoOrder = {
        cart: paymentData.cart,
        addressId: paymentData.addressId,
        paymentMethodId: paymentData.paymentMethodId,
        shippingMethodId: paymentData.shippingMethodId,
        note: paymentData.note || '',
        shippingFee: paymentData.shippingFee || 0,
        orderInfo: paymentData.orderInfo,
        items: paymentData.items || [],
        deliveryInfo: paymentData.deliveryInfo || undefined,
        userInfo: paymentData.userInfo || undefined,
        referenceId: paymentData.referenceId || `REF_${paymentData.internalOrderId}`,
        storeName: paymentData.storeName || 'Your Store',
        subPartnerCode: paymentData.subPartnerCode || undefined,
        internalOrderId: paymentData.internalOrderId,
        couponCode: paymentData.couponCode || '',
      };

      const response = await createOrderWithMoMo(momoPayload);
      return {
        success: true,
        data: response,
      };
    } catch (error: any) {
      console.error('MoMo payment creation failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Payment creation failed',
      };
    }
  }

  // Get payment status
  static async getPaymentStatus(orderId: string) {
    try {
      const response = await checkMoMoPaymentStatus(orderId);
      return {
        success: true,
        data: response,
      };
    } catch (error: any) {
      console.error('Failed to get payment status:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to get payment status',
      };
    }
  }

  // Check transaction status with MoMo
  static async checkTransactionStatus(orderId: string, lang: string = 'vi') {
    try {
      const response = await checkMoMoTransactionStatus(orderId, lang);
      return {
        success: true,
        data: response,
      };
    } catch (error: any) {
      console.error('Failed to check transaction status:', error);
      return {
        success: false,
        error:
          error.response?.data?.message || error.message || 'Failed to check transaction status',
      };
    }
  }

  // Get payment expiration status
  static async getPaymentExpiration(orderId: string) {
    try {
      const response = await getMoMoPaymentExpiration(orderId);
      return {
        success: true,
        data: response,
      };
    } catch (error: any) {
      console.error('Failed to get expiration status:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to get expiration status',
      };
    }
  }

  // Cancel payment
  static async cancelPayment(orderId: string, reason: string = 'User cancelled') {
    try {
      const response = await cancelMoMoPayment(orderId, reason);
      return {
        success: true,
        data: response,
      };
    } catch (error: any) {
      console.error('Failed to cancel payment:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to cancel payment',
      };
    }
  }

  // Process refund
  static async processRefund(refundRequest: IMoMoRefundRequest) {
    try {
      const response = await processMoMoRefund(
        refundRequest.orderId,
        refundRequest.amount,
        refundRequest.reason,
        refundRequest.items
      );
      return {
        success: true,
        data: response,
      };
    } catch (error: any) {
      console.error('Failed to process refund:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to process refund',
      };
    }
  }

  // Get refund history
  static async getRefundHistory(orderId: string) {
    try {
      const response = await getMoMoRefundHistory(orderId);
      return {
        success: true,
        data: response,
      };
    } catch (error: any) {
      console.error('Failed to get refund history:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to get refund history',
      };
    }
  }

  // Format payment items from cart
  static formatPaymentItems(cartItems: any[]): IMoMoItemInfo[] {
    return cartItems.map((item, index) => ({
      id: item.productId || item.id || `item_${index}`,
      name: item.name || `Product ${index + 1}`,
      description: item.description || '',
      category: item.category || 'general',
      imageUrl: item.imageUrl || item.image || '',
      manufacturer: item.brand || item.manufacturer || '',
      price: item.price || 0,
      quantity: item.quantity || 1,
      unit: item.unit || 'piece',
      taxAmount: item.tax || 0,
    }));
  }

  // Format delivery info
  static formatDeliveryInfo(deliveryData: any): IMoMoDeliveryInfo {
    return {
      deliveryAddress: deliveryData.address || '',
      deliveryFee: (deliveryData.fee || 0).toString(),
      quantity: (deliveryData.quantity || 1).toString(),
    };
  }

  // Format user info
  static formatUserInfo(userData: any): IMoMoUserInfo {
    return {
      name: userData.name || userData.fullName || '',
      phoneNumber: userData.phone || userData.phoneNumber || '',
      email: userData.email || '',
    };
  }

  // Get payment status message in Vietnamese
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

  // Format time left display
  static formatTimeLeft(seconds: number): string {
    if (seconds <= 0) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  // Generate order info string
  static generateOrderInfo(orderId: string, customerName?: string): string {
    const timestamp = new Date().getTime();
    return `Đơn hàng ${orderId} - ${customerName || 'Khách hàng'} - ${timestamp}`;
  }
}
