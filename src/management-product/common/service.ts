import { API_PRODUCT } from 'src/common/constant/api.constant';
import axiosInstance from 'src/common/utils/axios';

export const createNewProduct = async (productData: any) =>
  axiosInstance.post(API_PRODUCT, productData);
