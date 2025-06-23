import { IProductDetailResponse } from 'src/common/@types/product/product.interface';
import { API_PRODUCT } from 'src/common/constant/api.constant';
import { axiosInstance3 } from 'src/common/utils/axios';

export const getProductBySlug = async (slug: string) =>
  axiosInstance3.get<unknown, IProductDetailResponse>(`${API_PRODUCT}/slug/${slug}`);
