import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { getListProduct } from '../service';
import { useQuery } from 'react-query';

interface UseGetListProductParams {
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
}

export const useGetListProduct = (params: UseGetListProductParams = {}) =>
  useQuery([QUERY_KEYS.LIST_PRODUCT, params], () => getListProduct(params));
