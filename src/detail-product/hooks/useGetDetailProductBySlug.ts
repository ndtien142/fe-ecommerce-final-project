import { useQuery } from 'react-query';
import { getProductBySlug } from './service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export const useGetDetailProductBySlug = (slug: string) =>
  useQuery([QUERY_KEYS.PRODUCT_DETAIL, slug], () => getProductBySlug(slug), {
    enabled: !!slug,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });
