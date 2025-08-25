import { useMutation } from 'react-query';
import { ICallbackMutation } from 'src/common/@types/common.interface';
import { createAdmin } from '../user.service';
import { ICreateAdminData } from '../user.interface';

const useCreateAdmin = (callback: ICallbackMutation) =>
  useMutation((data: ICreateAdminData) => createAdmin(data), {
    onSuccess: () => {
      callback.onSuccess();
    },
    onError: (error) => {
      callback.onError();
      console.error(error);
    },
  });

export default useCreateAdmin;
