import { useMutation, useQueryClient } from 'react-query';
import { updateOrderStatus } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ orderId, status }: { orderId: number; status: string }) =>
      updateOrderStatus(orderId, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_LIST);
        queryClient.invalidateQueries(QUERY_KEYS.ORDER_ANALYTICS);
      },
    }
  );
}
