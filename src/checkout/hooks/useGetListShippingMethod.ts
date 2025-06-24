import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { getShippingMethod } from '../service';
import { useQuery } from 'react-query';

export const useGetListShippingMethod = () =>
  useQuery({
    queryKey: [QUERY_KEYS.SHIPPING_METHOD_LIST],
    queryFn: () => getShippingMethod(),
    select: (data) => data.metadata,
    refetchOnWindowFocus: false,
  });
