import { IFormCreateNewOrder } from '../order/order.interface';

export interface IMoMoPaymentResponse {
  id: string;
  amount: number;
  payUrl: string;
  deeplink: string;
  qrCodeUrl: string;
  deeplinkMiniApp?: string;
}

export interface IMoMoOrderResponse {
  message: string;
  status: number;
  metadata: {
    order: {
      id: string;
      totalAmount: number;
      status: string;
    };
    momoPayment: IMoMoPaymentResponse;
  };
}

export interface IMoMoStatusResponse {
  message: string;
  status: number;
  metadata: {
    orderId: string;
    amount: number;
    resultCode: string;
    message: string;
    payType: string;
    transId: number;
    signature: string;
    status?: string;
    isExpired?: boolean;
    timeLeft?: number;
    found?: boolean;
  };
}

export interface IMoMoItemInfo {
  id: string;
  name: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  manufacturer?: string;
  price: number;
  quantity: number;
  unit?: string;
  taxAmount?: number;
}

export interface IMoMoDeliveryInfo {
  deliveryAddress: string;
  deliveryFee: string;
  quantity: string;
}

export interface IMoMoUserInfo {
  name: string;
  phoneNumber: string;
  email: string;
}

export interface IFormCreateMoMoOrder extends IFormCreateNewOrder {
  orderInfo?: string;
  items?: IMoMoItemInfo[];
  deliveryInfo?: IMoMoDeliveryInfo;
  userInfo?: IMoMoUserInfo;
  referenceId?: string;
  storeName?: string;
  subPartnerCode?: string;
  internalOrderId?: string;
}

export interface IMoMoRefundRequest {
  orderId: string;
  amount?: number;
  reason?: string;
  items?: IMoMoItemInfo[];
}

export interface IMoMoExpirationResponse {
  message: string;
  status: number;
  metadata: {
    found: boolean;
    isExpired: boolean;
    timeLeft: number;
    status: string;
  };
}
