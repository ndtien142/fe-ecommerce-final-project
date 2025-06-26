import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { getOrderById } from '../service';

export const useGetOrderById = (id: number | string) =>
  useQuery([QUERY_KEYS.ORDER, id], () => getOrderById(Number(id)), {
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
