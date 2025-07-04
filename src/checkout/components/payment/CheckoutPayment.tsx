import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { useDispatch, useSelector } from 'src/common/redux/store';
import {
  onNextStep,
  onPrevStep,
  setActiveStep,
  setShippingMethodId,
} from 'src/checkout/checkout.slice';
// components
import Iconify from '../../../common/components/Iconify';
import { FormProvider } from '../../../common/components/hook-form';
// You need to implement or import these components
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';
import CheckoutSummary from '../cart/CheckoutSummary';
import { useGetListShippingMethod } from '../../hooks/useGetListShippingMethod';
import { useGetListPaymentMethod } from '../../hooks/useGetListPaymentMethod';
import { IFormCreateNewOrder } from 'src/common/@types/order/order.interface';
import { useCreateOrder } from 'src/checkout/hooks/useCreateOrder';
import { default as useMessage } from 'src/common/hooks/useMessage';

// ----------------------------------------------------------------------

type FormValuesProps = {
  delivery: number;
  payment: number;
};

export default function CheckoutPayment() {
  const dispatch = useDispatch();
  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();

  const { cart, address } = useSelector((state) => state.checkout);

  const subtotal = cart?.lineItems?.reduce((sum, item) => sum + Number(item.total), 0) || 0;
  const total = subtotal; // Adjust if you have shipping/discount logic
  const discount = 0; // Adjust if you have discount logic
  const shipping = 0; // Adjust if you have shipping logic

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onPrevStep());
  };

  const handleGotoStep = (step: number) => {
    dispatch(setActiveStep(step));
  };

  // You may want to implement this if you have shipping logic
  const handleApplyShipping = (value: number) => {
    dispatch(setShippingMethodId(value));
    // dispatch(applyShipping(value));
  };

  const { mutate } = useCreateOrder();

  const PaymentSchema = Yup.object().shape({
    payment: Yup.string().required('Vui lòng chọn phương thức thanh toán!'),
    delivery: Yup.number()
      .required('Vui lòng chọn phương thức giao hàng!')
      .min(1, 'Vui lòng chọn phương thức giao hàng!'),
  });

  const defaultValues = {
    delivery: 0,
    payment: 0,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(PaymentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    console.log('Form submitted with data:', data);
    if (!cart) {
      // Handle error or show a message to the user
      console.error('Cart is null');
      return;
    }
    const payload: IFormCreateNewOrder = {
      cart: cart,
      addressId: address?.id || 0,
      paymentMethodId: Number(data.payment),
      shippingMethodId: Number(data.delivery),
      note: '', // You can add a note field if needed
      shippingFee: 0,
    };

    mutate(payload, {
      onSuccess: () => {
        showSuccessSnackbar('Đặt hàng thành công!');
        handleNextStep();
      },
      onError: (error) => {
        console.error('Error creating order:', error);
        showErrorSnackbar('Đặt hàng thất bại! Vui lòng thử lại sau.');
      },
    });
    // Continue with your submit logic here
  };

  // Fetch shipping and payment methods from API
  const { data: shippingMethods } = useGetListShippingMethod();
  const { data: paymentMethods } = useGetListPaymentMethod();

  const DELIVERY_OPTIONS = shippingMethods || [];

  const PAYMENT_OPTIONS = paymentMethods || [];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <CheckoutDelivery
            onApplyShipping={handleApplyShipping}
            deliveryOptions={DELIVERY_OPTIONS}
          />
          <CheckoutPaymentMethods paymentOptions={PAYMENT_OPTIONS} cardOptions={[]} />
          <Button
            size="small"
            color="inherit"
            onClick={handleBackStep}
            startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
          >
            Quay lại
          </Button>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutBillingInfo onBackStep={handleBackStep} />

          <CheckoutSummary
            enableEdit
            total={total}
            subtotal={subtotal}
            discount={discount}
            shipping={shipping}
            onEdit={() => handleGotoStep(0)}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Hoàn tất đơn hàng
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
