import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { default as useMessage } from 'src/common/hooks/useMessage';
// hooks
import useIsMountedRef from 'src/common/hooks/useIsMountedRef';
// components
import Iconify from 'src/common/components/Iconify';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import { RegisterFormValues } from '../register.interface';
import { useCreateNewAccount } from '../hooks/useCreateNewAccount';
import { useNavigate } from 'react-router';
import { PATH_AUTH } from 'src/common/routes/paths';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();

  const isMountedRef = useIsMountedRef();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    username: Yup.string()
      .required('Tên đăng nhập là bắt buộc')
      .min(8, 'Tên đăng nhập phải có ít nhất 8 ký tự'),
    dateOfBirth: Yup.string().required('Ngày sinh là bắt buộc'),
    firstName: Yup.string().required('Họ là bắt buộc'),
    lastName: Yup.string().required('Tên là bắt buộc'),
    email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: Yup.string().required('Mật khẩu là bắt buộc'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
      .required('Xác nhận mật khẩu là bắt buộc'),
  });

  const defaultValues = {
    username: '',
    dateOfBirth: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm<RegisterFormValues>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const { mutate } = useCreateNewAccount({
    onSuccess: () => {
      showSuccessSnackbar('Tạo tài khoản thành công!');
      reset();
      navigate(PATH_AUTH.login);
    },
    onError: (error: any) => {
      showErrorSnackbar(error?.message || 'Tạo tài khoản thất bại!');
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      mutate(data);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="username" label="Username" />
        <Controller
          name="dateOfBirth"
          control={methods.control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              label="Date of Birth"
              value={field.value}
              onChange={(newValue) => field.onChange(newValue)}
              renderInput={(params) => (
                <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
              )}
            />
          )}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          type={showPassword ? 'text' : 'password'}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
