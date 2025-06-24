import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { getPaymentMethod } from '../service';
import { useQuery } from 'react-query';

export const useGetListPaymentMethod = () =>
  useQuery({
    queryKey: [QUERY_KEYS.PAYMENT_METHOD_LIST],
    queryFn: () => getPaymentMethod(),
    select: (data) => data.metadata,
    refetchOnWindowFocus: false,
  });
