import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { getListProduct } from '../service';
import { useQuery } from 'react-query';

interface UseGetListProductParams {
  page?: number;
  limit?: number;
  categorySlug?: string;
  status?: 'active' | 'inactive' | 'archived' | 'draft';
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
  flag?: 'new' | 'popular' | 'featured' | 'on_sale' | 'none';
  search?: string;
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
}

export const useGetListProduct = (params: UseGetListProductParams = {}) => {
  // Set default values according to API documentation
  const defaultParams = {
    page: 1,
    limit: 20,
    status: 'active' as const,
    sortBy: 'create_time' as const,
    sortOrder: 'DESC' as const,
    ...params,
  };

  return useQuery([QUERY_KEYS.LIST_PRODUCT, defaultParams], () => getListProduct(defaultParams), {
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
