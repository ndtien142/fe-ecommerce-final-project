import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  FormProvider,
  RHFTextField,
  RHFSelect,
  RHFSwitch,
  RHFEditor,
} from 'src/common/components/hook-form';
import { ICoupon } from 'src/common/@types/coupon/coupon.interface';
import { CouponSchema } from '../schema';
import { COUPON_TYPE_OPTIONS } from '../constant';
import { default as useMessage } from 'src/common/hooks/useMessage';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { DateTimePicker } from '@mui/x-date-pickers';
import FormSelectProductId from './new-edit/FormSelectProductId';
import useToggle from 'src/common/hooks/useToggle';
import Iconify from 'src/common/components/Iconify';
import FormSelectCategoriesId from './new-edit/FormSelectCategoriesId';
import { useCreateNewCoupon } from '../hooks/useCreateNewCoupon';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

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
      minOrderAmount: 0,
      maxDiscountAmount: 0,
      usageLimit: 0,
      usageLimitPerUser: 0,
      startDate: formatDateForInput(new Date().toISOString()),
      endDate: formatDateForInput(new Date().toISOString()),
      isActive: true,
      firstOrderOnly: false,
      applicableProducts: [],
      applicableCategories: [],
      ...initialValues,
      ...(initialValues?.startDate && { startDate: formatDateForInput(initialValues.startDate) }),
      ...(initialValues?.endDate && { endDate: formatDateForInput(initialValues.endDate) }),
    },
  });

  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();
  const navigate = useNavigate();

  const { mutate: createCoupon } = useCreateNewCoupon();

  const {
    toggle: toggleSelectProduct,
    onClose: onCloseSelectProduct,
    onOpen: onOpenSelectProduct,
  } = useToggle();

  const {
    toggle: toggleSelectCategories,
    onClose: onCloseSelectCategories,
    onOpen: onOpenSelectCategories,
  } = useToggle();

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const watchType = watch('type');

  const handleSelectProduct = (selectedProducts: string[]) => {
    // Handle selected products logic here
    console.log('Selected products:', selectedProducts);
    setValue('applicableProducts', selectedProducts.map(Number));
    onCloseSelectProduct();
  };

  const handleSelectCategories = (selectedCategories: string[]) => {
    // Handle selected categories logic here
    console.log('Selected categories:', selectedCategories);
    setValue('applicableCategories', selectedCategories.map(Number));
    onCloseSelectCategories();
  };

  const handleFormSubmit = async (data: FormValuesProps) => {
    const formData = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    };

    if (isEdit && couponId) {
      // Update existing coupon
    } else {
      createCoupon(formData, {
        onSuccess: () => {
          showSuccessSnackbar('Coupon đã được tạo thành công');
          navigate(PATH_DASHBOARD.coupon.root);
        },
        onError: (error: any) => {
          showErrorSnackbar(error?.message || 'Đã xảy ra lỗi khi tạo coupon');
        },
      });
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={2}>
                <LabelStyle>Thông tin cơ bản</LabelStyle>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <RHFTextField name="code" label="Mã giảm giá" />
                  <RHFTextField name="name" label="Tên coupon" />
                </Stack>

                <RHFEditor name="description" />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <RHFSelect
                    name="type"
                    label="Loại coupon"
                    InputLabelProps={{ shrink: true }}
                    SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                  >
                    {COUPON_TYPE_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                  <RHFTextField
                    name="value"
                    label={watchType === 'percent' ? 'Phần trăm giảm (%)' : 'Số tiền giảm (VND)'}
                    type="number"
                    disabled={watchType === 'free_shipping'}
                  />
                </Stack>
                <LabelStyle>Điều kiện sử dụng</LabelStyle>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <RHFTextField
                    name="minOrderAmount"
                    label="Đơn hàng tối thiểu (VND)"
                    type="number"
                    helperText="Để trống nếu không có điều kiện"
                  />
                  <RHFTextField
                    name="maxDiscountAmount"
                    label="Giảm tối đa (VND)"
                    type="number"
                    helperText="Chỉ áp dụng cho loại phần trăm"
                    disabled={watchType !== 'percent'}
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <RHFTextField
                    name="usageLimit"
                    label="Giới hạn sử dụng tổng"
                    type="number"
                    helperText="Để trống nếu không giới hạn"
                  />
                  <RHFTextField
                    name="usageLimitPerUser"
                    label="Giới hạn sử dụng mỗi người"
                    type="number"
                    helperText="Để trống nếu không giới hạn"
                  />
                </Stack>
                <LabelStyle>Thời gian hiệu lực</LabelStyle>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Controller
                    name="startDate"
                    control={methods.control}
                    render={({ field, fieldState: { error } }) => (
                      <DateTimePicker
                        label="Ngày bắt đầu"
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
                  <Controller
                    name="endDate"
                    control={methods.control}
                    render={({ field, fieldState: { error } }) => (
                      <DateTimePicker
                        label="Ngày kết thúc"
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
                </Stack>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={2}>
                <LabelStyle>Cài đặt</LabelStyle>
                <Stack spacing={2}>
                  <RHFSwitch name="isActive" label="Kích hoạt coupon" />

                  <RHFSwitch name="firstOrderOnly" label="Chỉ áp dụng đơn hàng đầu tiên" />
                </Stack>
              </Stack>
            </Card>
            <Card sx={{ p: 3, mt: 3 }}>
              <Stack spacing={2}>
                <LabelStyle>Trường hợp áp dụng</LabelStyle>
                <Stack spacing={2}>
                  <Typography variant="body2">
                    Chọn sản phẩm áp dụng coupon này. Bạn có thể chọn nhiều sản phẩm. Có thể bỏ
                    trống nếu áp dụng cho tất cả sản phẩm.
                  </Typography>
                  <RHFTextField
                    name="applicableProducts"
                    label="ID sản phẩm"
                    placeholder="Nhập ID sản phẩm"
                    InputLabelProps={{ shrink: true }}
                    disabled
                  />
                  <Button
                    variant="outlined"
                    onClick={onOpenSelectProduct}
                    startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    Chọn sản phẩm
                  </Button>
                </Stack>
                <Stack spacing={2}>
                  <Typography variant="body2">
                    Chọn danh mục áp dụng coupon này. Bạn có thể chọn nhiều danh mục. Có thể để
                    trống nếu áp dụng cho tất cả danh mục.
                  </Typography>
                  <RHFTextField
                    name="applicableCategories"
                    label="ID danh mục"
                    placeholder="Nhập ID danh mục"
                    InputLabelProps={{ shrink: true }}
                    disabled
                  />
                  <Button
                    variant="outlined"
                    onClick={onOpenSelectCategories}
                    startIcon={<Iconify icon="eva:plus-fill" />}
                  >
                    Chọn danh mục
                  </Button>
                </Stack>
              </Stack>
            </Card>

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              size="large"
              sx={{ mt: 3 }}
            >
              {isEdit ? 'Cập nhật' : 'Tạo mới'} Coupon
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>
      <FormSelectProductId
        defaultSelected={watch('applicableProducts')?.map(String) || []}
        open={toggleSelectProduct}
        onClose={onCloseSelectProduct}
        onSelect={handleSelectProduct}
      />
      <FormSelectCategoriesId
        defaultSelected={watch('applicableCategories')?.map(String) || []}
        open={toggleSelectCategories}
        onClose={onCloseSelectCategories}
        onSelect={handleSelectCategories}
      />
    </>
  );
}
