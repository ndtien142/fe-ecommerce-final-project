import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Grid, MenuItem, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField, RHFSelect, RHFSwitch } from 'src/common/components/hook-form';
import { ICoupon } from 'src/common/@types/coupon/coupon.interface';
import { CouponSchema } from '../schema';
import { COUPON_TYPE_OPTIONS } from '../constant';
import { default as useMessage } from 'src/common/hooks/useMessage';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

type FormValuesProps = Omit<ICoupon, 'id'>;

const formatDateForInput = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16);
};

export default function FormNewEditCoupon({
  initialValues,
  isEdit = false,
  couponId,
}: {
  initialValues?: Partial<FormValuesProps>;
  isEdit?: boolean;
  couponId?: string;
}) {
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CouponSchema),
    defaultValues: {
      code: '',
      name: '',
      description: '',
      type: 'percent',
      value: 0,
      minOrderAmount: undefined,
      maxDiscountAmount: undefined,
      usageLimit: undefined,
      usageLimitPerUser: undefined,
      startDate: formatDateForInput(new Date().toISOString()),
      endDate: formatDateForInput(new Date().toISOString()),
      isActive: true,
      firstOrderOnly: false,
      ...initialValues,
      ...(initialValues?.startDate && { startDate: formatDateForInput(initialValues.startDate) }),
      ...(initialValues?.endDate && { endDate: formatDateForInput(initialValues.endDate) }),
    },
  });

  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();
  const navigate = useNavigate();

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const watchType = watch('type');

  const handleFormSubmit = async (data: FormValuesProps) => {
    const formData = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    };

    try {
      // Temporary implementation - replace with actual API calls
      console.log('Form data:', formData);
      showSuccessSnackbar(
        isEdit ? 'Coupon đã được cập nhật thành công' : 'Coupon đã được tạo thành công'
      );
      navigate(PATH_DASHBOARD.coupon.root);
    } catch (error: any) {
      showErrorSnackbar(error?.message || 'Đã xảy ra lỗi');
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Typography variant="h6" gutterBottom>
                Thông tin cơ bản
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="code" label="Mã giảm giá" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="name" label="Tên coupon" />
                </Grid>
              </Grid>

              <RHFTextField name="description" label="Mô tả" multiline rows={3} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <RHFSelect name="type" label="Loại coupon">
                    {COUPON_TYPE_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField
                    name="value"
                    label={watchType === 'percent' ? 'Phần trăm giảm (%)' : 'Số tiền giảm (VND)'}
                    type="number"
                    disabled={watchType === 'free_shipping'}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Điều kiện sử dụng
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <RHFTextField
                    name="minOrderAmount"
                    label="Đơn hàng tối thiểu (VND)"
                    type="number"
                    helperText="Để trống nếu không có điều kiện"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField
                    name="maxDiscountAmount"
                    label="Giảm tối đa (VND)"
                    type="number"
                    helperText="Chỉ áp dụng cho loại phần trăm"
                    disabled={watchType !== 'percent'}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <RHFTextField
                    name="usageLimit"
                    label="Giới hạn sử dụng tổng"
                    type="number"
                    helperText="Để trống nếu không giới hạn"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField
                    name="usageLimitPerUser"
                    label="Giới hạn sử dụng mỗi người"
                    type="number"
                    helperText="Để trống nếu không giới hạn"
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Thời gian hiệu lực
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <RHFTextField
                    name="startDate"
                    label="Ngày bắt đầu"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField
                    name="endDate"
                    label="Ngày kết thúc"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Typography variant="h6" gutterBottom>
                Cài đặt
              </Typography>

              <RHFSwitch name="isActive" label="Kích hoạt coupon" />

              <RHFSwitch name="firstOrderOnly" label="Chỉ áp dụng đơn hàng đầu tiên" />

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                size="large"
                sx={{ mt: 3 }}
              >
                {isEdit ? 'Cập nhật' : 'Tạo mới'} Coupon
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
