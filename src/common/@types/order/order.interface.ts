import { ICart } from '../cart/cart.interface';
import { IAddress } from '../address/address.interface';
import { IShippingMethod } from '../shipping/shipping.interface';
import { IProductApiResponse } from '../product/product.interface';
import { PaginationMeta } from '../common.interface';

export interface IOrderLineItem {
  id: number;
  orderId: number;
  quantity: number;
  price: string;
  total: string;
  createTime: string;
  updateTime: string;
  productId: number;
  product: IProductApiResponse;
}

export interface IOrderUser {
  id: number;
  userLogin: string;
  userPass: string;
  userNickname: string | null;
  userEmail: string;
  userUrl: string | null;
  userRegistered: string;
  userStatus: string;
  userDateOfBirth: string | null;
  createTime: string;
  updateTime: string;
  roleId: number;
}

export interface IOrderPayment {
  id: number;
  orderId: number;
  paymentMethod: string;
  paymentMethodId: number;
  transactionId: string | null;
  transactionCode: string | null;
  status: string;
  amount: string;
  gatewayResponse: string | null;
  paidAt: string | null;
  customerPaymentOptionId: number | null;
  createTime: string;
  updateTime: string;
}

export type OrderStatus =
  | 'pending_confirmation'
  | 'pending_pickup'
  | 'shipping'
  | 'delivered'
  | 'returned'
  | 'cancelled';

export interface IOrder {
  id: number;
  userId: number;
  addressId: number;
  paymentId: number;
  status: OrderStatus;
  totalAmount: string;
  note: string;
  orderedDate: string;
  shippedDate: string | null;
  deliveredDate: string | null;
  shippingMethodId: number;
  shippingFee: string;
  trackingNumber: string | null;
  shippedBy: string | null;
  createTime: string;
  updateTime: string;
  user: IOrderUser;
  lineItems: IOrderLineItem[];
  address: IAddress;
  shippingMethod: IShippingMethod;
  payment: IOrderPayment;
}

export interface IOrderListResponse {
  message: string;
  status: string;
  metadata: {
    items: IOrder[];
    meta: PaginationMeta;
  };
}

export interface IOrderResponse {
  message: string;
  status: string;
  metadata: IOrder;
}

export interface IOrderParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface IFormCreateNewOrder {
  cart: ICart;
  addressId: number;
  paymentMethodId: number;
  shippingMethodId: number;
  note?: string;
  shippingFee?: number;
}

export interface IOrderAnalytics {
  pendingConfirmation: number;
  pendingPickup: number;
  shipping: number;
  delivered: number;
  returned: number;
  cancelled: number;
  [key: string]: number;
}

export interface IOrderAnalyticsResponse {
  message: string;
  status: string;
  metadata: IOrderAnalytics;
}
