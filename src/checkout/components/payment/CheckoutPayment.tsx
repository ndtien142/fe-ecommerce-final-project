import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Button, Box, CircularProgress, Typography } from '@mui/material';
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
import { IFormCreateMoMoOrder } from 'src/common/@types/payment/momo.interface';
import { useCreateOrder } from 'src/checkout/hooks/useCreateOrder';
import { useCreateMoMoOrder } from 'src/checkout/hooks/useCreateMoMoOrder';
import { default as useMessage } from 'src/common/hooks/useMessage';
import { OrderUtils } from 'src/common/utils/orderUtils';
import EnhancedPaymentButton from 'src/common/components/EnhancedPaymentButton';
import { useState } from 'react';

// ----------------------------------------------------------------------

type FormValuesProps = {
  delivery: number;
  payment: number;
};

export default function CheckoutPayment() {
  const dispatch = useDispatch();
  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();
  const [loading, setLoading] = useState(false);

  const { cart, address, appliedCoupon } = useSelector((state) => state.checkout);

  const subtotal = cart?.lineItems?.reduce((sum, item) => sum + Number(item.total), 0) || 0;
  const total = subtotal; // Adjust if you have shipping/discount logic
  const discount = appliedCoupon?.metadata?.discount?.discountAmount || 0;
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
  const { mutate: createMoMoOrder } = useCreateMoMoOrder();

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
    setLoading(true);
    if (!cart) {
      // Handle error or show a message to the user
      console.error('Cart is null');
      return;
    }

    // Find the selected payment method to check if it's MoMo
    const selectedPaymentMethod = paymentMethods?.find(
      (method) => method.id === Number(data.payment)
    );
    const isMoMoPayment = selectedPaymentMethod?.provider === 'momo';

    if (isMoMoPayment) {
      // Handle MoMo payment

      const momoPayload: IFormCreateMoMoOrder = {
        cart: cart,
        addressId: address?.id || 0,
        paymentMethodId: Number(data.payment),
        shippingMethodId: Number(data.delivery),
        note: '', // You can add a note field if needed
        shippingFee: 0,
        couponCode: appliedCoupon?.metadata?.coupon?.code || '',
        orderInfo: OrderUtils.generateOrderInfo(cart.id?.toString() || 'unknown'),
      };
      createMoMoOrder(momoPayload, {
        onSuccess: (response) => {
          // Store order info for later reference
          OrderUtils.storePendingOrder({
            orderId: response.metadata.order.id,
            amount: response.metadata.order.totalAmount,
            paymentMethod: 'momo',
          });

          // Redirect to MoMo payment
          window.location.href = response.metadata.momoPayment.payUrl;
        },
        onError: (error: any) => {
          showErrorSnackbar(
            error?.response?.data?.message || 'Tạo đơn hàng MoMo thất bại! Vui lòng thử lại sau.'
          );
        },
      });
    } else {
      // Handle regular payment (cash, etc.)
      const payload: IFormCreateNewOrder = {
        cart: cart,
        addressId: address?.id || 0,
        paymentMethodId: Number(data.payment),
        shippingMethodId: Number(data.delivery),
        note: '', // You can add a note field if needed
        shippingFee: 0,
        couponCode: appliedCoupon?.metadata?.coupon?.code || '',
      };

      mutate(payload, {
        onSuccess: () => {
          showSuccessSnackbar('Đặt hàng thành công!');
          handleNextStep();
        },
        onError: (error: any) => {
          showErrorSnackbar(
            error?.response?.data?.message || 'Đặt hàng thất bại! Vui lòng thử lại sau.'
          );
        },
      });
    }
    setLoading(false);
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

          {/* Enhanced MoMo Payment Button */}
          {paymentMethods?.find((method) => method.id === Number(methods.watch('payment')))
            ?.provider === 'momo' ? (
            <EnhancedPaymentButton
              order={{
                id: cart?.id?.toString() || 'unknown',
                total: total,
                couponCode: appliedCoupon?.metadata?.coupon?.code || '',
                items: cart?.lineItems || [],
                deliveryInfo: {
                  address: address
                    ? `${address.streetNumber} ${address.street}, ${address.ward}, ${address.district}, ${address.city}, ${address.country}`
                    : '',
                  fee: shipping,
                },
                referenceId: `REF_${cart?.id || Date.now()}`,
              }}
              customer={{
                name: address?.receiverName || '',
                phone: address?.phoneNumber || '',
                email: '', // IAddress doesn't have email field
              }}
              cart={cart}
              addressId={address?.id || 0}
              paymentMethodId={Number(methods.watch('payment'))}
              shippingMethodId={Number(methods.watch('delivery'))}
              note=""
              shippingFee={shipping}
              onSuccess={() => {
                showSuccessSnackbar('Thanh toán MoMo thành công!');
                handleNextStep();
              }}
              onError={(error: any) => {
                showErrorSnackbar(`Lỗi thanh toán MoMo: ${error.message}`);
              }}
            />
          ) : (
            <>
              <LoadingButton
                fullWidth
                sx={{
                  backgroundColor: loading ? 'grey.400' : '',
                  '&:hover': {
                    backgroundColor: loading ? 'grey.400' : '',
                  },
                  py: 1.5,
                }}
                size="large"
                type="submit"
                variant="contained"
                loading={loading}
              >
                {isSubmitting ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    <Typography>Đang tạo thanh toán...</Typography>
                  </Box>
                ) : (
                  'Hoàn tất đơn hàng'
                )}
              </LoadingButton>
            </>
          )}
        </Grid>
      </Grid>
    </FormProvider>
  );
}
