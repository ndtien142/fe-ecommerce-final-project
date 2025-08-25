import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  Typography,
  FormControlLabel,
  Button,
  Divider,
} from '@mui/material';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from 'src/common/components/hook-form';
import Label from 'src/common/components/Label';
import { CustomFile } from 'src/common/components/upload';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { fData } from 'src/common/utils/formatNumber';
import useShowSnackbar from 'src/common/hooks/useMessage';
import useCreateUser from 'src/management-user/common/hooks/useCreateUser';
import useCreateAdmin from 'src/management-user/common/hooks/useCreateAdmin';
import useUpdateUser from 'src/management-user/common/hooks/useUpdateUser';
import useUploadImage from 'src/common/hooks/useUploadImage';
import { useGetAllRole } from 'src/common/hooks/useGetAllRole';
import { IUser } from 'src/common/@types/user/user.interface';

interface FormValuesProps {
  username: string;
  password?: string;
  email: string;
  roleId?: number;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address?: string;
  avatarUrl?: CustomFile | string | null;
  userStatus?: 'normal' | 'pending' | 'blocked' | 'deleted' | 'suspended';
}

type Props = {
  isEdit: boolean;
  currentUser?: IUser;
};

export default function UserNewEditForm({ isEdit, currentUser }: Props) {
  const navigate = useNavigate();
  const [isCreateAdmin, setIsCreateAdmin] = useState(false);

  const { uploadImage } = useUploadImage();
  const { data: listRole } = useGetAllRole({ page: 1, limit: 20 });
  const { showErrorSnackbar, showSuccessSnackbar } = useShowSnackbar();

  const { mutate: updateUser } = useUpdateUser({
    onError: () => {
      showErrorSnackbar('Cập nhật thông tin thất bại');
    },
    onSuccess: () => {
      showSuccessSnackbar('Cập nhật thông tin thành công');
      navigate(PATH_DASHBOARD.user.list);
    },
  });

  const { mutate: createUser } = useCreateUser({
    onError: () => {
      showErrorSnackbar('Tạo user thất bại');
    },
    onSuccess: () => {
      showSuccessSnackbar('Tạo user thành công');
      navigate(PATH_DASHBOARD.user.list);
    },
  });

  const { mutate: createAdmin } = useCreateAdmin({
    onError: () => {
      showErrorSnackbar('Tạo admin thất bại');
    },
    onSuccess: () => {
      showSuccessSnackbar('Tạo admin thành công');
      navigate(PATH_DASHBOARD.user.list);
    },
  });

  const defaultValues = useMemo(
    () => ({
      username: currentUser?.username || '',
      email: currentUser?.email || '',
      firstName: currentUser?.profile?.firstName || '',
      lastName: currentUser?.profile?.lastName || '',
      phoneNumber: currentUser?.profile?.phoneNumber || '',
      address: currentUser?.profile?.address || '',
      avatarUrl: currentUser?.profile?.avatarUrl || null,
      roleId: currentUser?.role?.id || undefined,
      userStatus: currentUser?.userStatus || 'normal',
      password: '',
    }),
    [currentUser]
  );

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentUser, reset, defaultValues]);

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      try {
        let avatarUrl = '';
        if (data.avatarUrl && typeof data.avatarUrl !== 'string') {
          const res = await uploadImage(data.avatarUrl);
          avatarUrl = res as string;
        } else if (typeof data.avatarUrl === 'string') {
          avatarUrl = data.avatarUrl;
        }

        if (!isEdit) {
          // Tạo mới
          const userData = {
            username: data.username,
            password: data.password!,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            address: data.address,
            avatarUrl,
          };

          if (isCreateAdmin) {
            createAdmin(userData);
          } else {
            createUser({
              ...userData,
              roleId: data.roleId!,
            });
          }
        } else {
          // Cập nhật
          updateUser({
            userId: currentUser!.userId,
            username: data.username,
            email: data.email,
            roleId: data.roleId,
            userStatus: data.userStatus,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            address: data.address,
            avatarUrl,
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [isEdit, currentUser, isCreateAdmin, uploadImage, createUser, createAdmin, updateUser]
  );

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatarUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            <Label
              color={values.userStatus !== 'normal' ? 'error' : 'success'}
              sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
            >
              {values.userStatus}
            </Label>

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                accept={{ 'image/*': [] }}
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
                    Cho phép *.jpeg, *.jpg, *.png, *.gif
                    <br /> Kích thước tối đa {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {isEdit && (
              <Controller
                name="userStatus"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    labelPlacement="start"
                    control={
                      <Switch
                        {...field}
                        checked={field.value === 'blocked'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'blocked' : 'normal')
                        }
                      />
                    }
                    label={
                      <>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          Khóa tài khoản
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Khóa/mở khóa tài khoản người dùng
                        </Typography>
                      </>
                    }
                    sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                  />
                )}
              />
            )}

            {!isEdit && (
              <>
                <Divider sx={{ my: 2 }} />
                <FormControlLabel
                  control={
                    <Switch
                      checked={isCreateAdmin}
                      onChange={(e) => setIsCreateAdmin(e.target.checked)}
                    />
                  }
                  label={<Typography variant="subtitle2">Tạo tài khoản Admin</Typography>}
                />
              </>
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField
                name="username"
                label="Tên đăng nhập"
                disabled={isEdit}
                required={!isEdit}
              />
              <RHFTextField name="email" label="Email" type="email" required />

              {!isEdit && (
                <RHFTextField name="password" type="password" label="Mật khẩu" required />
              )}

              <RHFTextField name="firstName" label="Tên" required />
              <RHFTextField name="lastName" label="Họ" required />
              <RHFTextField name="phoneNumber" label="Số điện thoại" />
              <RHFTextField name="address" label="Địa chỉ" />

              {!isCreateAdmin && (
                <RHFSelect
                  name="roleId"
                  label="Vai trò"
                  placeholder="Chọn vai trò"
                  required={!isEdit}
                >
                  <option value="" />
                  {listRole?.metadata?.metadata?.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </RHFSelect>
              )}
            </Box>

            <Stack direction="row" spacing={3} alignItems="center" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting} size="large">
                {!isEdit ? (isCreateAdmin ? 'Tạo Admin' : 'Tạo User') : 'Cập nhật'}
              </LoadingButton>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate(PATH_DASHBOARD.user.list)}
              >
                Hủy
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
