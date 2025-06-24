import { useQuery } from 'react-query';
import { getCart } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export const useGetCart = () =>
  useQuery([QUERY_KEYS.CART], getCart, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
