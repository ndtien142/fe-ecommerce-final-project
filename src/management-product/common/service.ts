import { IProductListResponse } from 'src/common/@types/product/product.interface';
import { API_PRODUCT } from 'src/common/constant/api.constant';
import axiosInstance, { axiosInstance3 } from 'src/common/utils/axios';

export const createNewProduct = async (productData: any) =>
  axiosInstance.post(API_PRODUCT, productData);

export const updateProduct = async (data: any) => {
  const { id, ...productData } = data;
  return axiosInstance.put(`${API_PRODUCT}/${id}`, productData);
};

export const deleteProduct = async (id: number) => axiosInstance.delete(`${API_PRODUCT}${id}`);

export const getProductById = async (id: number) => axiosInstance3.get(`${API_PRODUCT}${id}`);

export const getProductBySlug = async (slug: string) =>
  axiosInstance3.get(`${API_PRODUCT}slug/${slug}`);

// Search products API for autocomplete
export const searchProducts = async (query: string, limit: number = 10) => {
  const searchParams = new URLSearchParams();
  searchParams.append('search', query);
  searchParams.append('limit', limit.toString());
  searchParams.append('status', 'active');

  return axiosInstance3.get(`${API_PRODUCT}?${searchParams.toString()}`);
};

export const getListProduct = (params: {
  page?: number;
  limit?: number;
  categorySlug?: string;
  status?: 'active' | 'inactive' | 'archived' | 'draft';
  brandId?: number;
  brandName?: string;
  minPrice?: number;
  maxPrice?: number;
  flag?: 'new' | 'popular' | 'featured' | 'on_sale' | 'none';
  search?: string;
  startDate?: string;
  endDate?: string;
  sortBy?:
    | 'id'
    | 'name'
    | 'price'
    | 'price_sale'
    | 'sold'
    | 'stock'
    | 'create_time'
    | 'update_time';
  sortOrder?: 'ASC' | 'DESC';
  // Legacy params for backward compatibility
  gender?: string[];
  colors?: string[];
  sizes?: string[];
  brands?: string[];
  rating?: string;
}) => {
  const searchParams = new URLSearchParams();

  // Add all filter parameters to the request according to API v1 documentation
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.categorySlug) searchParams.append('categorySlug', params.categorySlug);
  if (params.status) searchParams.append('status', params.status);
  if (params.brandId) searchParams.append('brandId', params.brandId.toString());
  if (params.brandName) searchParams.append('brandName', params.brandName);
  if (params.minPrice) searchParams.append('minPrice', params.minPrice.toString());
  if (params.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());
  if (params.flag) searchParams.append('flag', params.flag);
  if (params.search) searchParams.append('search', params.search);
  if (params.startDate) searchParams.append('startDate', params.startDate);
  if (params.endDate) searchParams.append('endDate', params.endDate);
  if (params.sortBy) searchParams.append('sortBy', params.sortBy);
  if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);

  // Legacy support - convert to new API format
  if (params.gender && params.gender.length > 0) {
    params.gender.forEach((g) => searchParams.append('gender', g));
  }
  if (params.colors && params.colors.length > 0) {
    params.colors.forEach((c) => searchParams.append('colors', c));
  }
  if (params.sizes && params.sizes.length > 0) {
    params.sizes.forEach((s) => searchParams.append('sizes', s));
  }
  if (params.brands && params.brands.length > 0) {
    params.brands.forEach((b) => searchParams.append('brands', b));
  }
  if (params.rating) searchParams.append('rating', params.rating);

  return axiosInstance3.get<unknown, IProductListResponse>(
    `${API_PRODUCT}?${searchParams.toString()}`
  );
};
