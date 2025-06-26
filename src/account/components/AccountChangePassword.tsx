import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import { useChangePassword } from '../hooks/useChangePassword';
import { default as useMessage } from 'src/common/hooks/useMessage';

// ----------------------------------------------------------------------

type FormValuesProps = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Mật khẩu cũ là bắt buộc'),
    newPassword: Yup.string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .required('Mật khẩu mới là bắt buộc'),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      'Mật khẩu xác nhận không khớp'
    ),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate } = useChangePassword();

  const onSubmit = async (data: FormValuesProps) => {
    mutate(
      {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      },
      {
        onSuccess: () => {
          enqueueSnackbar('Thay đổi mật khẩu thành công', { variant: 'success' });
          reset();
        },
        onError: (error) => {
          console.error(error);
          enqueueSnackbar('Thay đổi mật khẩu thất bại', { variant: 'error' });
        },
      }
    );
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="oldPassword" type="password" label="Mật khẩu cũ" />

          <RHFTextField name="newPassword" type="password" label="Mật khẩu mới" />

          <RHFTextField name="confirmNewPassword" type="password" label="Xác nhận mật khẩu mới" />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Lưu thay đổi
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
