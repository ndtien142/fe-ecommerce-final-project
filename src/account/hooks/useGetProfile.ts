import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';
import { getUserProfile } from '../services';

export const useGetProfile = () =>
  useQuery([QUERY_KEYS.PROFILE], getUserProfile, {
    select: (data) => data?.metadata,
  });
