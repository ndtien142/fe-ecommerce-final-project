import { useMutation, useQueryClient } from 'react-query';
import { updateCoupon } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation(({ id, data }: { id: string; data: any }) => updateCoupon(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.COUPON_LIST]);
      queryClient.invalidateQueries([QUERY_KEYS.COUPON_DETAIL]);
    },
  });
};
