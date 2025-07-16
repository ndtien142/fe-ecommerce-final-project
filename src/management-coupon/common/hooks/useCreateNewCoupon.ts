import { useMutation, useQueryClient } from 'react-query';
import { createNewCoupon } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export const useCreateNewCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation(createNewCoupon, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.COUPON_LIST]);
    },
  });
};
