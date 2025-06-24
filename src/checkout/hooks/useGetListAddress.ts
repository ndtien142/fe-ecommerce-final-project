import { useQuery } from 'react-query';
import { IAddressResponse } from '../../common/@types/address/address.interface';
import { getAddress } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export const useGetListAddress = () =>
  useQuery<IAddressResponse>([QUERY_KEYS.ADDRESS_LIST], getAddress, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
