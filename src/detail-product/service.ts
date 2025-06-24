import { IParamsAddToCart } from 'src/common/@types/cart/cart.interface';
import { IProductDetailResponse } from 'src/common/@types/product/product.interface';
import { API_CART, API_PRODUCT } from 'src/common/constant/api.constant';
import axiosInstance, { axiosInstance3 } from 'src/common/utils/axios';

export const addToCart = async (data: IParamsAddToCart) =>
  axiosInstance.patch(`${API_CART}/add`, data);

export const getProductBySlug = async (slug: string) =>
  axiosInstance3.get<unknown, IProductDetailResponse>(`${API_PRODUCT}/slug/${slug}`);
