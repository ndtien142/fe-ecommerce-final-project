import { useMutation, useQueryClient } from 'react-query';
import { updateUserProfile } from '../services';
import { QUERY_KEYS } from 'src/common/constant/queryKeys.constant';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUserProfile, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEYS.PROFILE]);
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
    },
  });
};
