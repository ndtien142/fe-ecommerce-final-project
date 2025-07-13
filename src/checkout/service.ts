import {
  IAddressForm,
  IAddressResponse,
  IDetailAddressResponse,
} from 'src/common/@types/address/address.interface';
import {
  ICartResponse,
  IParamsAddToCart,
  IParamsChangeItemQuantity,
  IParamsRemoveItemFromCart,
} from 'src/common/@types/cart/cart.interface';
import { IFormCreateNewOrder } from 'src/common/@types/order/order.interface';
import { IPaymentMethodResponse } from 'src/common/@types/payment/payment.interface';
import {
  IFormCreateMoMoOrder,
  IMoMoOrderResponse,
  IMoMoStatusResponse,
} from 'src/common/@types/payment/momo.interface';
import { IShippingMethodResponse } from 'src/common/@types/shipping/shipping.interface';
import {
  API_ADDRESS,
  API_CART,
  API_ORDER,
  API_PAYMENT_METHOD,
  API_SHIPPING_METHOD,
} from 'src/common/constant/api.constant';
import axiosInstance from 'src/common/utils/axios';

// CART
export const getCart = () => axiosInstance.get<unknown, ICartResponse>(`${API_CART}/user`);

export const addToCart = (data: IParamsAddToCart) => axiosInstance.patch(`${API_CART}/add`, data);

export const minusItemQuantity = (data: IParamsChangeItemQuantity) =>
  axiosInstance.patch(`${API_CART}/minus`, data);

export const plusItemQuantity = (data: IParamsChangeItemQuantity) =>
  axiosInstance.patch(`${API_CART}/plus`, data);

export const removeItemFromCart = (data: IParamsRemoveItemFromCart) =>
  axiosInstance.patch(`${API_CART}/remove`, data);

// ADDRESS
export const getAddress = () => axiosInstance.get<unknown, IAddressResponse>(`${API_ADDRESS}/user`);

export const addAddress = (data: IAddressForm) =>
  axiosInstance.post<unknown, IDetailAddressResponse>(`${API_ADDRESS}`, data);

// SHIPPING
export const getShippingMethod = () =>
  axiosInstance.get<unknown, IShippingMethodResponse>(`${API_SHIPPING_METHOD}`);

// PAYMENT
export const getPaymentMethod = () =>
  axiosInstance.get<unknown, IPaymentMethodResponse>(`${API_PAYMENT_METHOD}`);

// ORDER
export const createOrder = (data: IFormCreateNewOrder) => axiosInstance.post(`${API_ORDER}`, data);

// MOMO PAYMENT
export const createOrderWithMoMo = (data: IFormCreateMoMoOrder) =>
  axiosInstance.post<unknown, IMoMoOrderResponse>(`${API_ORDER}/momo`, data);

export const checkMoMoPaymentStatus = (orderId: string) =>
  axiosInstance.get<unknown, IMoMoStatusResponse>(`/momo/status/${orderId}`);

// Enhanced MoMo API endpoints
export const checkMoMoTransactionStatus = (orderId: string, lang: string = 'vi') =>
  axiosInstance.get<unknown, IMoMoStatusResponse>(`/momo/transaction-status/${orderId}`, {
    params: { lang },
  });

export const getMoMoPaymentExpiration = (orderId: string) =>
  axiosInstance.get<unknown, any>(`/momo/expiration/${orderId}`);

export const cancelMoMoPayment = (orderId: string, reason: string = 'User cancelled') =>
  axiosInstance.post<unknown, any>(`/momo/cancel/${orderId}`, { reason });

export const processMoMoRefund = (
  orderId: string,
  amount?: number,
  reason?: string,
  items?: any[]
) =>
  axiosInstance.post<unknown, any>(`/momo/refund/${amount ? 'partial' : 'full'}`, {
    orderId,
    amount,
    reason,
    items,
  });

export const getMoMoRefundHistory = (orderId: string) =>
  axiosInstance.get<unknown, any>(`/momo/refund/history/${orderId}`);
