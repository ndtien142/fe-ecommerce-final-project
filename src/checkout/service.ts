import {
  ICartResponse,
  IParamsAddToCart,
  IParamsChangeItemQuantity,
  IParamsRemoveItemFromCart,
} from 'src/common/@types/cart/cart.interface';
import { API_CART } from 'src/common/constant/api.constant';
import axiosInstance from 'src/common/utils/axios';

export const getCart = () => axiosInstance.get<unknown, ICartResponse>(`${API_CART}/user`);

export const addToCart = (data: IParamsAddToCart) => axiosInstance.patch(`${API_CART}/add`, data);

export const minusItemQuantity = (data: IParamsChangeItemQuantity) =>
  axiosInstance.patch(`${API_CART}/minus`, data);

export const plusItemQuantity = (data: IParamsChangeItemQuantity) =>
  axiosInstance.patch(`${API_CART}/plus`, data);

export const removeItemFromCart = (data: IParamsRemoveItemFromCart) =>
  axiosInstance.patch(`${API_CART}/remove`, data);
