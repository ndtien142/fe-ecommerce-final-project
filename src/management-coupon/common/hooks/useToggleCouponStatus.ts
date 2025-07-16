import { useMutation, useQueryClient } from 'react-query';
import { toggleCouponStatus } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export const useToggleCouponStatus = () => {
  const queryClient = useQueryClient();

  return useMutation(toggleCouponStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.COUPON_LIST]);
    },
  });
};
