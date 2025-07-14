import { axiosInstance2 as axiosInstance } from '../utils/axios';

export interface IOrderItem {
  product_id: number;
  quantity: number;
  price: number;
  product?: {
    name: string;
    image: string;
  };
}

export interface IShippingAddress {
  id: number;
  address: string;
  city: string;
  phone: string;
  receiverName: string;
}

export interface IOrderPayment {
  status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'expired' | 'refunded';
  method: string;
  amount: number;
  paid_at?: string;
  transaction_id?: string;
}

export interface IOrder {
  id: number;
  user_id: number;
  total_amount: number;
  status:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'returned';
  note?: string;
  created_at: string;
  updated_at?: string;
  items: IOrderItem[];
  shipping_address: IShippingAddress;
  payment: IOrderPayment;
}

export interface ICreateOrderData {
  shipping_address_id: number;
  note?: string;
  items: Array<{
    product_id: number;
    quantity: number;
    price: number;
  }>;
}

export interface ICreateOrderResponse {
  status: string;
  message: string;
  metadata: {
    order: IOrder;
    payment: {
      payUrl: string;
      deeplink: string;
      qrCodeUrl: string;
      orderId: number;
      requestId: string;
      amount: number;
    };
  };
}

export interface IOrderListResponse {
  status: string;
  message: string;
  metadata: {
    orders: IOrder[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface IOrderDetailResponse {
  status: string;
  message: string;
  metadata: {
    order: IOrder;
  };
}

export interface IPaymentStatusResponse {
  status: string;
  message: string;
  metadata: {
    paymentStatus: string;
    transactionId: string;
    paidAt?: string;
    amount: number;
    orderId: number;
  };
}

export interface IOrderFilters {
  page?: number;
  limit?: number;
  status?: string;
  userId?: number;
}

export class OrderManagementService {
  private static baseUrl = '/v1/api';

  /**
   * Create order with MoMo payment
   */
  static async createOrderWithMoMo(orderData: ICreateOrderData): Promise<ICreateOrderResponse> {
    try {
      const response = await axiosInstance.post(
        `${this.baseUrl}/order/create-with-momo`,
        orderData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create order');
    }
  }

  /**
   * Get order details by ID
   */
  static async getOrderById(orderId: number): Promise<IOrderDetailResponse> {
    try {
      const response = await axiosInstance.get(`${this.baseUrl}/order/${orderId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get order details');
    }
  }

  /**
   * Get user orders with filtering
   */
  static async getUserOrders(
    userId: number,
    filters: IOrderFilters = {}
  ): Promise<IOrderListResponse> {
    try {
      const params = new URLSearchParams();

      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.status) params.append('status', filters.status);

      const response = await axiosInstance.get(
        `${this.baseUrl}/order/user/${userId}?${params.toString()}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get user orders');
    }
  }

  /**
   * Get all orders for admin (with pagination and filters)
   */
  static async getAllOrders(filters: IOrderFilters = {}): Promise<IOrderListResponse> {
    try {
      const params = new URLSearchParams();

      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.status) params.append('status', filters.status);
      if (filters.userId) params.append('userId', filters.userId.toString());

      const response = await axiosInstance.get(
        `${this.baseUrl}/order/admin/all?${params.toString()}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get orders');
    }
  }

  /**
   * Update order status (admin only)
   */
  static async updateOrderStatus(orderId: number, status: string): Promise<any> {
    try {
      const response = await axiosInstance.put(`${this.baseUrl}/order/${orderId}/status`, {
        status,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update order status');
    }
  }

  /**
   * Cancel order
   */
  static async cancelOrder(orderId: number): Promise<any> {
    try {
      const response = await axiosInstance.put(`${this.baseUrl}/order/${orderId}/cancel`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to cancel order');
    }
  }

  /**
   * Check payment status
   */
  static async checkPaymentStatus(orderId: number): Promise<IPaymentStatusResponse> {
    try {
      const response = await axiosInstance.get(`${this.baseUrl}/momo/status/${orderId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to check payment status');
    }
  }

  /**
   * Get order statistics for admin dashboard
   */
  static async getOrderStatistics(): Promise<any> {
    try {
      const response = await axiosInstance.get(`${this.baseUrl}/order/admin/statistics`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get order statistics');
    }
  }

  /**
   * Process order refund
   */
  static async processRefund(orderId: number, amount?: number): Promise<any> {
    try {
      const response = await axiosInstance.post(`${this.baseUrl}/order/${orderId}/refund`, {
        amount,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to process refund');
    }
  }

  /**
   * Get order status history
   */
  static async getOrderStatusHistory(orderId: number): Promise<any> {
    try {
      const response = await axiosInstance.get(`${this.baseUrl}/order/${orderId}/history`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to get order history');
    }
  }

  /**
   * Handle payment return from MoMo
   */
  static handlePaymentReturn(): { orderId: string | null; resultCode: string | null } {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    const resultCode = urlParams.get('resultCode');

    return { orderId, resultCode };
  }

  /**
   * Get error message for error codes
   */
  static getErrorMessage(errorCode: string): string {
    const errorMessages: { [key: string]: string } = {
      CART_EMPTY: 'Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi đặt hàng.',
      INSUFFICIENT_STOCK: 'Một số sản phẩm hết hàng. Vui lòng cập nhật giỏ hàng.',
      INVALID_ADDRESS: 'Vui lòng cung cấp địa chỉ giao hàng hợp lệ.',
      PAYMENT_FAILED: 'Thanh toán thất bại. Vui lòng kiểm tra phương thức thanh toán.',
      ORDER_NOT_FOUND: 'Không tìm thấy đơn hàng.',
      UNAUTHORIZED: 'Bạn không có quyền truy cập.',
      payment_expired: 'Thanh toán đã hết hạn. Vui lòng thử lại.',
      payment_cancelled: 'Thanh toán đã bị hủy.',
      payment_failed: 'Thanh toán thất bại. Vui lòng kiểm tra phương thức thanh toán.',
      insufficient_funds: 'Số dư không đủ. Vui lòng nạp tiền vào tài khoản.',
      invalid_signature: 'Xác thực thanh toán thất bại. Vui lòng thử lại.',
    };

    return errorMessages[errorCode] || 'Đã xảy ra lỗi không mong muốn.';
  }

  /**
   * Get status display configuration
   */
  static getStatusConfig(status: string): { color: string; text: string; icon: string } {
    const statusConfig: { [key: string]: { color: string; text: string; icon: string } } = {
      pending_confirmation: { color: 'warning', text: 'Chờ xác nhận', icon: 'eva:clock-outline' },
      pending_pickup: { color: 'info', text: 'Chờ lấy hàng', icon: 'eva:checkmark-circle-outline' },
      shipping: { color: 'primary', text: 'Đang giao', icon: 'eva:car-outline' },
      delivered: { color: 'success', text: 'Đã giao', icon: 'eva:checkmark-circle-2-outline' },
      returned: { color: 'secondary', text: 'Đã trả hàng', icon: 'eva:undo-outline' },
      cancelled: { color: 'error', text: 'Đã hủy', icon: 'eva:close-circle-outline' },
    };

    return (
      statusConfig[status] || {
        color: 'default',
        text: 'Không xác định',
        icon: 'eva:question-mark-circle-outline',
      }
    );
  }

  /**
   * Get payment status display configuration
   */
  static getPaymentStatusConfig(status: string): { color: string; text: string; icon: string } {
    const statusConfig: { [key: string]: { color: string; text: string; icon: string } } = {
      pending: { color: 'warning', text: 'Chờ thanh toán', icon: 'eva:clock-outline' },
      completed: { color: 'success', text: 'Đã thanh toán', icon: 'eva:checkmark-circle-outline' },
      failed: { color: 'error', text: 'Thanh toán thất bại', icon: 'eva:close-circle-outline' },
      cancelled: { color: 'error', text: 'Đã hủy thanh toán', icon: 'eva:close-outline' },
      expired: { color: 'error', text: 'Hết hạn thanh toán', icon: 'eva:clock-outline' },
      refunded: { color: 'info', text: 'Đã hoàn tiền', icon: 'eva:undo-outline' },
    };

    return (
      statusConfig[status] || {
        color: 'default',
        text: 'Không xác định',
        icon: 'eva:question-mark-circle-outline',
      }
    );
  }

  /**
   * Format currency
   */
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  }

  /**
   * Format date
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
