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
