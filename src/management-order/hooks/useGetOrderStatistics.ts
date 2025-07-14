import { useQuery } from 'react-query';
import { getOrderStatistics } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export function useGetOrderStatistics() {
  return useQuery([QUERY_KEYS.ORDER_STATISTICS], () => getOrderStatistics(), {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}
