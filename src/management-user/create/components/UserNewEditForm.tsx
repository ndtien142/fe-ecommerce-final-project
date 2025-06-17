import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
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
import { useBlockUser } from 'src/management-user/common/hooks/useBlockUser';
import useUploadImage from 'src/common/hooks/useUploadImage';
import { useGetAllRole } from 'src/common/hooks/useGetAllRole';
import { IUser } from 'src/common/@types/user/user.interface';

interface FormValuesProps extends Omit<IUser, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
  roleId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  password: string;
}

type Props = {
  isEdit: boolean;
  currentUser?: IUser;
};

export default function UserNewEditForm({ isEdit, currentUser }: Props) {
  const navigate = useNavigate();

  const { uploadImage } = useUploadImage();

  const { data: listRole } = useGetAllRole({ page: 1, limit: 20 });

  const { showErrorSnackbar, showSuccessSnackbar } = useShowSnackbar();
  const { mutate: updateUser } = useBlockUser({
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
      showSuccessSnackbar('Tạo mới thành công');
      navigate(PATH_DASHBOARD.user.list);
    },
    onSuccess: () => {
      showSuccessSnackbar('Tạo mới thành công');
      navigate(PATH_DASHBOARD.user.list);
    },
  });

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = useMemo(
    () => ({
      userCode: currentUser !== undefined ? currentUser.userCode : '',
      // username: currentUser !== undefined ? currentUser.username : '',
      // firstName: currentUser !== undefined ? currentUser.profiles[0]?.firstName : '',
      // lastName: currentUser !== undefined ? currentUser.profiles[0]?.lastName : '',
      // phoneNumber: currentUser !== undefined ? currentUser.profiles[0]?.phoneNumber : '',
      // avatarUrl: currentUser !== undefined ? currentUser.profiles[0]?.avatarUrl : '',
      // address: currentUser !== undefined ? currentUser.profiles[0]?.address : '',
      // isBlock: currentUser !== undefined ? currentUser.isBlock : false,
      // roleId: currentUser !== undefined ? currentUser.role?.id : 0,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data: FormValuesProps) => {
    // let updateImageUrl = currentUser?.profiles[0]?.avatarUrl;
    // if (data.avatarUrl !== currentUser?.profiles[0]?.avatarUrl && data.avatarUrl instanceof File) {
    //   updateImageUrl = await uploadImage(data.avatarUrl);
    // }
    // if (isEdit) {
    //   updateUser({ userCode: data.userCode, isBlock: data.isBlock });
    // }
  };

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
            {isEdit && (
              <Label
                color={values.isBlock ? 'error' : 'success'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.isBlock ? 'banned' : 'non-block'}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
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
            </Box>

            {isEdit && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="isBlock"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value}
                        onChange={(event) => field.onChange(event.target.checked ? true : false)}
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Khóa
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Áp dụng khóa tài khoản
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
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
              {!isEdit && (
                <>
                  <RHFTextField name="username" label="Tên đăng nhập" disabled />
                  <RHFTextField name="password" type="password" label="Mật khẩu" disabled />
                </>
              )}
              <RHFTextField name="lastName" label="Tên" disabled />
              <RHFTextField name="firstName" label="Tên họ" disabled />
              <RHFTextField name="phoneNumber" label="Số điện thoại" disabled />
              <RHFTextField name="address" label="Địa chỉ" disabled />
              <RHFSelect name="roleId" label="Vai trò" placeholder="Vai trò">
                <option value="" />
                {listRole?.metadata?.metadata?.map((option) => (
                  <option key={option.id} value={option.id}>
                    <Typography color={'black'}>{option.name}</Typography>
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Tạo người dùng mới' : 'Lưu thay đổi'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
