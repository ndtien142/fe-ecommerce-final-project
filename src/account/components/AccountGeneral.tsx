import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography, MenuItem, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// hooks
import { useGetProfile } from '../hooks/useGetProfile';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
// utils
import { fData } from 'src/common/utils/formatNumber';
// _mock
// components
import { IProfileUpdateForm } from 'src/common/@types/user/account.interface';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from 'src/common/components/hook-form';
import { default as useMessage } from 'src/common/hooks/useMessage';
import useUploadImage from 'src/common/hooks/useUploadImage';

// ----------------------------------------------------------------------

// Gender options
const genders = [
  { value: 'male', label: 'Nam' },
  { value: 'female', label: 'Nữ' },
  { value: 'other', label: 'Khác' },
];

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { data: user, isLoading } = useGetProfile();

  const { mutate } = useUpdateProfile();

  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();

  const { uploadImage } = useUploadImage();

  const UpdateUserSchema = Yup.object().shape({
    phoneNumber: Yup.string().required('Số điện thoại là bắt buộc'),
    firstName: Yup.string().required('Họ là bắt buộc'),
    lastName: Yup.string().required('Tên là bắt buộc'),
    avatarUrl: Yup.mixed().required('Ảnh đại diện là bắt buộc'),
    address: Yup.string(),
    province: Yup.string(),
    district: Yup.string(),
    ward: Yup.string(),
    postalCode: Yup.string(),
    bio: Yup.string(),
  });

  const defaultValues: IProfileUpdateForm = {
    phoneNumber: user?.phoneNumber ?? '',
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    fullName: user?.fullName ?? '',
    avatarUrl: user?.avatarUrl ?? null,
    address: user?.address ?? '',
    province: user?.province ?? '',
    district: user?.district ?? '',
    ward: user?.ward ?? '',
    postalCode: user?.postalCode ?? '',
    bio: user?.bio ?? '',
    gender: user?.gender ?? '',
    nickname: user?.nickname ?? '',
    dateOfBirth: user?.dateOfBirth ?? '',
  };

  const methods = useForm<IProfileUpdateForm>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: IProfileUpdateForm) => {
    try {
      const { avatarUrl: originalAvatarUrl, ...restData } = data;
      let avatarUrl = originalAvatarUrl;
      if (avatarUrl instanceof File) {
        avatarUrl = await uploadImage(avatarUrl);
      }
      mutate({ ...restData, avatarUrl });
      showSuccessSnackbar('Cập nhật thành công!');
    } catch (error) {
      console.error('Error updating profile:', error);
      showErrorSnackbar('Cập nhật thất bại, vui lòng thử lại sau!');
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue('avatarUrl', Object.assign(file, { preview: URL.createObjectURL(file) }));
      }
    },
    [setValue]
  );

  useEffect(() => {
    if (user) {
      reset(defaultValues);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="avatarUrl"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="firstName" label="Họ" />
              <RHFTextField name="lastName" label="Tên" />
              <RHFTextField name="nickname" label="Biệt danh" />
              <RHFTextField name="phoneNumber" label="Số điện thoại" />
              <RHFSelect
                name="gender"
                label="Giới tính"
                placeholder="Giới tính"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
              >
                <MenuItem key="default" value="" />
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <Controller
                name="dateOfBirth"
                control={methods.control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Date of Birth"
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                  />
                )}
              />
              <RHFTextField name="address" label="Địa chỉ" />
              <RHFTextField name="province" label="Tỉnh/Thành phố" />
              <RHFTextField name="district" label="Quận/Huyện" />
              <RHFTextField name="ward" label="Phường/Xã" />
              <RHFTextField name="postalCode" label="Mã bưu điện" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="bio" multiline rows={4} label="Tiểu sử" />

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Lưu thay đổi
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
