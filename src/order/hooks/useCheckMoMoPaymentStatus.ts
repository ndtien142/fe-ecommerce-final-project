import { useQuery } from 'react-query';
import { checkMoMoPaymentStatus } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export function useCheckMoMoPaymentStatus(orderId: number) {
  return useQuery([QUERY_KEYS.PAYMENT_STATUS, orderId], () => checkMoMoPaymentStatus(orderId), {
    enabled: !!orderId,
    staleTime: 30 * 1000, // 30 seconds
    cacheTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 30 * 1000, // Auto-refresh every 30 seconds
  });
}
