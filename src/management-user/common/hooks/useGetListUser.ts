import { useQuery } from 'react-query';
import { fetchUsers } from '../user.service';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { IParamsUser } from '../user.interface';

const useGetListUser = (params: IParamsUser) =>
  useQuery([QUERY_KEYS.LIST_USER, params], () => fetchUsers(params));

export default useGetListUser;
