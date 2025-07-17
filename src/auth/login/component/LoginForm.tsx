// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack } from '@mui/material';
// components
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useDispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { FormProvider, RHFCheckbox, RHFTextField } from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import { defaultValues } from '../constants';
import { useAuthLogin } from '../hook/useLogin';
import { IFormLoginValuesProps } from '../interface/interface';
import { setShowPassword, showPasswordSelector, setUsername } from '../login.slice';
import { LoginSchema } from '../schema/login.schema';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import {
  selectLastVisitedProduct,
  clearLastVisitedProduct,
} from 'src/common/redux/slices/lastVisited';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { useDeepCompareEffect } = useDeepEffect();
  const showPassword = useSelector(showPasswordSelector);
  const lastVisitedProduct = useSelector(selectLastVisitedProduct);
  const dispatch = useDispatch();
  const methods = useForm<IFormLoginValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = (response: any) => {
    const roleName = response?.metadata?.user?.role?.name;
    enqueueSnackbar('Đăng nhập thành công', {
      variant: 'success',
      autoHideDuration: 1000,
    });

    // Redirect to the last visited product page if exists
    if (roleName === 'admin') {
      navigate(PATH_DASHBOARD.root);
    } else if (lastVisitedProduct) {
      navigate(lastVisitedProduct);
      dispatch(clearLastVisitedProduct());
    } else if (roleName === 'customer') {
      navigate('/');
    } else {
      navigate('/');
    }
  };
  const onError = (message: string) => {
    enqueueSnackbar(message || 'Đăng nhập thất bại ! xin kiểm tra lại thông tin', {
      variant: 'error',
    });
  };

  const { login, loading } = useAuthLogin({ onSuccess, onError });

  const onSubmit = (data: IFormLoginValuesProps) => {
    dispatch(setUsername(data.username));
    login({ username: data.username, password: data.password });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="username" label="Tên đăng nhập" />
        <RHFTextField
          name="password"
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => dispatch(setShowPassword(!showPassword))} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Ghi nhớ đăng nhập" />
        {/* <Typography sx={{ fontSize: '13px' }}>
          <Link to={PATH_AUTH.forgotPassword}>Forgot Password</Link>
        </Typography> */}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={loading || isSubmitting}
      >
        Đăng nhập
      </LoadingButton>
    </FormProvider>
  );
}
