import { useState } from 'react';
import { dispatch } from 'src/common/redux/store';
import { setAccessToken, setLogin, setRefreshToken, setUser } from '../auth.slice';
import { IAuth } from '../interface';
import { getAuth } from '../service';

type ILoginCallback = {
  onSuccess: (res: any) => void;
  onError: (message: string) => void;
};

export const useAuthLogin = ({ onError, onSuccess }: ILoginCallback) => {
  const [loading, setLoading] = useState(false);

  const login = async (params: IAuth) => {
    setLoading(true);
    try {
      const response = await getAuth(params);
      if (!response) throw new Error('No response');
      const { data } = response;
      dispatch(setAccessToken('' + data?.metadata?.tokens?.accessToken));
      dispatch(setUser(data?.metadata?.user));
      dispatch(setRefreshToken(data?.metadata?.tokens?.refreshToken));
      dispatch(setLogin(true));
      onSuccess(data);
    } catch (error) {
      // Pass error message to onError for toast
      console.error('Login error:', error);
      const message = error instanceof Error ? error.message : 'Đăng nhập thất bại';
      onError(message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
