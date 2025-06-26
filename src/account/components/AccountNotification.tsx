import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFSwitch } from 'src/common/components/hook-form';

// ----------------------------------------------------------------------

const APPLICATION_OPTIONS = [
  { value: 'applicationNews', label: 'Tin tức và thông báo' },
  { value: 'applicationProduct', label: 'Cập nhật sản phẩm hàng tuần' },
  { value: 'applicationBlog', label: 'Tổng hợp blog hàng tuần' },
] as const;

const NOTIFICATION_SETTINGS = {
  applicationNews: true,
  applicationProduct: false,
  applicationBlog: false,
};

// ----------------------------------------------------------------------

type FormValuesProps = {
  applicationNews: boolean;
  applicationProduct: boolean;
  applicationBlog: boolean;
};

export default function AccountNotifications() {
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    applicationNews: NOTIFICATION_SETTINGS.applicationNews,
    applicationProduct: NOTIFICATION_SETTINGS.applicationProduct,
    applicationBlog: NOTIFICATION_SETTINGS.applicationBlog,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Cập nhật thành công!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <Stack spacing={2} sx={{ width: 1 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              Ứng dụng
            </Typography>
            <Stack spacing={1}>
              {APPLICATION_OPTIONS.map((application) => (
                <RHFSwitch
                  key={application.value}
                  name={application.value}
                  label={application.label}
                  sx={{ m: 0 }}
                />
              ))}
            </Stack>
          </Stack>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Lưu thay đổi
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
