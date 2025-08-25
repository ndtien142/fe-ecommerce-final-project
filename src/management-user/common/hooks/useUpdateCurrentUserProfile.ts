import { useMutation } from 'react-query';
import { ICallbackMutation } from 'src/common/@types/common.interface';
import { updateCurrentUserProfile } from '../user.service';
import { IUpdateProfileData } from '../user.interface';

const useUpdateCurrentUserProfile = (callback: ICallbackMutation) =>
  useMutation((data: IUpdateProfileData) => updateCurrentUserProfile(data), {
    onSuccess: () => {
      callback.onSuccess();
    },
    onError: (error) => {
      callback.onError();
      console.error(error);
    },
  });

export default useUpdateCurrentUserProfile;
