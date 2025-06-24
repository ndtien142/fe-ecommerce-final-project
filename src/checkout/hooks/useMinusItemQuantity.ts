import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { minusItemQuantity } from '../service';

export function useMinusItemQuantity() {
  const queryClient = useQueryClient();

  return useMutation(minusItemQuantity, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.CART);
      queryClient.invalidateQueries(QUERY_KEYS.CART_COUNT);
    },
  });
}
