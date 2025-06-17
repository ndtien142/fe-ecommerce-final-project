import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'src/common/redux/store';
import { PATH_AUTH } from 'src/common/routes/paths';
import { setAccessToken, setLogin } from '../auth.slice';
import { ILoginCallback } from '../interface';
import { getLogout } from '../service';

export const useAuthlogout = (callback: ILoginCallback) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      await getLogout?.();
      dispatch(setLogin(false));
      dispatch(setAccessToken(''));
      navigate(PATH_AUTH.login, { replace: true });
      callback.onSuccess && callback.onSuccess();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Đăng xuất thất bại';
      callback.onError && callback.onError(message);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
};
