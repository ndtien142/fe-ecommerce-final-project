import { useMutation, useQueryClient } from 'react-query';
import { deleteCoupon } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteCoupon, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.COUPON_LIST]);
    },
  });
};
