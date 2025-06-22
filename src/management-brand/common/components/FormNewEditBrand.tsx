import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, MenuItem, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {
  FormProvider,
  RHFEditor,
  RHFTextField,
  RHFUploadAvatar,
  RHFSelect,
} from 'src/common/components/hook-form';
import { useCallback } from 'react';
import { fData } from 'src/common/utils/formatNumber';
import { BrandFormValuesProps } from 'src/common/@types/product/brand.interface';
import { BrandSchema } from '../schema';
import useUploadImage from 'src/common/hooks/useUploadImage';
import { useCreateNewBrand } from '../hooks/useCreateNewBrand';
import { default as useMessage } from 'src/common/hooks/useMessage';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const STATUS_OPTIONS = [
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Không hoạt động' },
];

export default function FormNewEditBrand({
  initialValues,
  onSubmit,
}: {
  initialValues?: Partial<BrandFormValuesProps>;
  onSubmit?: (values: BrandFormValuesProps) => void;
}) {
  const methods = useForm<BrandFormValuesProps>({
    resolver: yupResolver(BrandSchema),
    defaultValues: {
      name: '',
      description: '',
      logoUrl: null,
      status: '',
      ...initialValues,
    },
  });

  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();
  const navigate = useNavigate();

  const { uploadImage } = useUploadImage();

  const { mutate } = useCreateNewBrand();

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'logoUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const handleFormSubmit = async (data: BrandFormValuesProps) => {
    console.log('Form data:', data);
    let updatedLogoUrl = data.logoUrl;
    if (data.logoUrl instanceof File) {
      updatedLogoUrl = await uploadImage(data.logoUrl);
    }

    mutate(
      { ...data, logoUrl: updatedLogoUrl },
      {
        onSuccess: () => {
          showSuccessSnackbar('Thương hiệu đã được tạo thành công');
          navigate(PATH_DASHBOARD.brand.root);
        },
        onError: (error: any) => {
          showErrorSnackbar(error?.message || 'Đã xảy ra lỗi khi tạo thương hiệu');
        },
      }
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <RHFUploadAvatar
              name="logoUrl"
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
            <Stack spacing={3} sx={{ width: { xs: '100%', sm: '60%' } }}>
              <RHFTextField name="name" label="Tên thương hiệu" fullWidth />
              <RHFSelect
                name="status"
                label="Trạng thái"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
              >
                {STATUS_OPTIONS.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Stack>
          </Stack>
          <div>
            <LabelStyle>Mô tả</LabelStyle>
            <RHFEditor name="description" />
          </div>
        </Stack>
      </Card>
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Lưu
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
