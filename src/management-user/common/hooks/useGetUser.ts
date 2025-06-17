import { useQuery } from 'react-query';
import { fetchUser } from '../user.service';

const useGetUser = (userCode: string) =>
  useQuery(['user', userCode], () => fetchUser(userCode), {
    enabled: !!userCode,
  });

export default useGetUser;
