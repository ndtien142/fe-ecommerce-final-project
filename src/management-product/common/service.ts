import { ISimpleParams } from 'src/common/@types/common.interface';
import { IProductListResponse } from 'src/common/@types/product/product.interface';
import { API_PRODUCT } from 'src/common/constant/api.constant';
import axiosInstance from 'src/common/utils/axios';

export const createNewProduct = async (productData: any) =>
  axiosInstance.post(API_PRODUCT, productData);

export const getListProduct = async (params: ISimpleParams) =>
  axiosInstance.get<unknown, IProductListResponse>(API_PRODUCT, { params });
