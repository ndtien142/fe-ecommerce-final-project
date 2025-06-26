import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { getOrderAnalytics } from '../service';

export const useGetAnalyticsOrder = () =>
  useQuery([QUERY_KEYS.ORDER_ANALYTICS], getOrderAnalytics, {
    refetchOnWindowFocus: false,
  });
