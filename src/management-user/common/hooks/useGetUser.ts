import { useQuery } from 'react-query';
import { fetchUser } from '../user.service';

const useGetUser = (userId: string) =>
  useQuery(['user', userId], () => fetchUser(userId), {
    enabled: !!userId,
  });

export default useGetUser;
