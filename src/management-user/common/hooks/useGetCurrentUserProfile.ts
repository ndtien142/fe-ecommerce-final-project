import { useQuery } from 'react-query';
import { fetchCurrentUserProfile } from '../user.service';

const useGetCurrentUserProfile = () =>
  useQuery(['user', 'profile'], () => fetchCurrentUserProfile());

export default useGetCurrentUserProfile;
