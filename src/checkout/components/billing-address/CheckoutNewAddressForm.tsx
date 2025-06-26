import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Stack,
  Dialog,
  Button,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import {
  FormProvider,
  RHFCheckbox,
  RHFSelect,
  RHFTextField,
  RHFRadioGroup,
} from '../../../common/components/hook-form';
import { useAddNewAddress } from '../../hooks/useAddNewAddress';
import { default as useMessage } from 'src/common/hooks/useMessage';
import { useDispatch } from 'src/common/redux/store';
import { setAddress } from 'src/checkout/checkout.slice';

// _mock
// You may want to replace this with your own country list or API
const countries = [
  { code: 'VN', label: 'Việt Nam' },
  { code: 'US', label: 'United States' },
];

// ----------------------------------------------------------------------

interface FormValuesProps {
  title: string;
  country: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  streetNumber: string;
  receiverName: string;
  phoneNumber: string;
  isDefault: boolean;
}

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onNextStep: VoidFunction;
};

export default function CheckoutNewAddressForm({ open, onClose, onNextStep }: Props) {
  const dispatch = useDispatch();

  const NewAddressSchema = Yup.object().shape({
    title: Yup.string().required('Tiêu đề là bắt buộc'),
    country: Yup.string().required('Quốc gia là bắt buộc'),
    city: Yup.string().required('Thành phố là bắt buộc'),
    district: Yup.string().required('Quận/Huyện là bắt buộc'),
    ward: Yup.string().required('Phường/Xã là bắt buộc'),
    street: Yup.string().required('Đường là bắt buộc'),
    streetNumber: Yup.string().required('Số nhà là bắt buộc'),
    receiverName: Yup.string().required('Tên người nhận là bắt buộc'),
    phoneNumber: Yup.string().required('Số điện thoại là bắt buộc'),
    isDefault: Yup.boolean(),
  });

  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();

  const defaultValues: FormValuesProps = {
    title: '',
    country: 'Việt Nam',
    city: '',
    district: '',
    ward: '',
    street: '',
    streetNumber: '',
    receiverName: '',
    phoneNumber: '',
    isDefault: true,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate, isLoading } = useAddNewAddress();

  const onSubmit = async (data: FormValuesProps) => {
    try {
      await mutate(data, {
        onSuccess: (res: any) => {
          showSuccessSnackbar('Thêm địa chỉ mới thành công!');
          dispatch(setAddress(res?.metadata));
          onNextStep();
        },
        onError: (error: any) => {
          showErrorSnackbar('Thêm địa chỉ mới thất bại!');
          console.error(error);
        },
      });
    } catch (error) {
      showErrorSnackbar('Thêm địa chỉ mới thất bại!');
      console.error(error);
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Thêm địa chỉ mới</DialogTitle>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={3}>
            <RHFTextField name="title" label="Tên địa chỉ" />

            <RHFTextField name="receiverName" label="Tên người nhận" />
            <RHFTextField name="phoneNumber" label="Số điện thoại" />

            <RHFSelect name="country" label="Quốc gia">
              <option value="Việt Nam">Việt Nam</option>
              <option value="United States">United States</option>
            </RHFSelect>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <RHFTextField name="city" label="Thành phố" />
              <RHFTextField name="district" label="Quận/Huyện" />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <RHFTextField name="ward" label="Phường/Xã" />
              <RHFTextField name="street" label="Đường" />
            </Stack>
            <RHFTextField name="streetNumber" label="Số nhà" />

            <RHFCheckbox
              name="isDefault"
              label="Sử dụng địa chỉ này làm mặc định."
              sx={{ mt: 3 }}
            />
          </Stack>
        </DialogContent>

        <Divider />

        <DialogActions>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={methods.formState.isSubmitting || isLoading}
          >
            Giao đến địa chỉ này
          </LoadingButton>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            Hủy
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
