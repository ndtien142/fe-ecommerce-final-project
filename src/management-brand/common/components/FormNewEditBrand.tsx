import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {
  FormProvider,
  RHFEditor,
  RHFTextField,
  RHFUploadAvatar,
} from 'src/common/components/hook-form';
import { useCallback } from 'react';
import { fData } from 'src/common/utils/formatNumber';
import { BrandFormValuesProps } from 'src/common/@types/product/brand.interface';
import { BrandSchema } from '../schema';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

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

  const handleFormSubmit = (data: BrandFormValuesProps) => {
    if (onSubmit) {
      onSubmit(data);
    }
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
            <Stack spacing={3} sx={{ width: { xs: '100%', sm: '60%' } }}>
              <RHFTextField name="name" label="Tên thương hiệu" fullWidth />
              <RHFTextField name="status" label="Trạng thái" fullWidth />
            </Stack>
            <RHFUploadAvatar
              name="logUrl"
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
          </Stack>
          <div>
            <LabelStyle>Mô tả</LabelStyle>
            <RHFEditor simple name="description" />
          </div>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Lưu
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
