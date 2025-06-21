import { BrandFormValuesProps } from 'src/common/@types/product/brand.interface';
import { API_BRAND } from 'src/common/constant/api.constant';
import axiosInstance from 'src/common/utils/axios';

export const crateNewBrand = async (data: BrandFormValuesProps) =>
  axiosInstance.post(API_BRAND, data);
