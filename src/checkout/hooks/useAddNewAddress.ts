import { useMutation, useQueryClient } from 'react-query';
import { IAddressForm } from '../../common/@types/address/address.interface';
import { addAddress } from '../service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export function useAddNewAddress() {
  const queryClient = useQueryClient();

  return useMutation((data: IAddressForm) => addAddress(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.ADDRESS_LIST);
    },
  });
}
