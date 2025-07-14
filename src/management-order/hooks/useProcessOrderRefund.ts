import { useMutation, useQueryClient } from 'react-query';
import { processOrderRefund } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export function useProcessOrderRefund() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ orderId, amount }: { orderId: number; amount?: number }) =>
      processOrderRefund(orderId, amount),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_LIST);
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_ANALYTICS);
      },
    }
  );
}
