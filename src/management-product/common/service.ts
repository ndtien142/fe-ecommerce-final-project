import { IParamsProduct, IProductListResponse } from 'src/common/@types/product/product.interface';
import { API_PRODUCT } from 'src/common/constant/api.constant';
import axiosInstance from 'src/common/utils/axios';

export const createNewProduct = async (productData: any) =>
  axiosInstance.post(API_PRODUCT, productData);

export const getListProduct = (params: {
  page?: number;
  limit?: number;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  gender?: string[];
  colors?: string[];
  rating?: string;
  sortBy?: string;
  search?: string;
}) => {
  const searchParams = new URLSearchParams();

  // Add all filter parameters to the request
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.categorySlug) searchParams.append('categorySlug', params.categorySlug);
  if (params.minPrice) searchParams.append('minPrice', params.minPrice.toString());
  if (params.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());
  if (params.gender && params.gender.length > 0) {
    params.gender.forEach((g) => searchParams.append('gender', g));
  }
  if (params.colors && params.colors.length > 0) {
    params.colors.forEach((c) => searchParams.append('colors', c));
  }
  if (params.rating) searchParams.append('rating', params.rating);
  if (params.sortBy) searchParams.append('sortBy', params.sortBy);
  if (params.search) searchParams.append('search', params.search);

  return axiosInstance.get<unknown, IProductListResponse>(
    `${API_PRODUCT}?${searchParams.toString()}`
  );
};
