import { useMutation, useQueryClient } from 'react-query';
import { removeItemFromCart } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export function useRemoveItemFromCart() {
  const queryClient = useQueryClient();

  return useMutation(removeItemFromCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.CART);
      queryClient.invalidateQueries(QUERY_KEYS.CART_COUNT);
    },
  });
}
