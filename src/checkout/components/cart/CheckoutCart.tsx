import sum from 'lodash/sum';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// hooks
import { useGetCart } from '../../hooks/useGetCart';
import { useMinusItemQuantity } from '../../hooks/useMinusItemQuantity';
import { usePlusItemQuantity } from '../../hooks/usePlusItemQuantity';
import { useRemoveItemFromCart } from '../../hooks/useRemoveItemFromCart';
// components
import Iconify from '../../../common/components/Iconify';
import Scrollbar from '../../../common/components/Scrollbar';
import EmptyContent from '../../../common/components/EmptyContent';
import CheckoutSummary from './CheckoutSummary';
import CheckoutProductList from './CheckoutProductList';
// coupon components
import CheckoutCoupon from '../../../coupon/components/CheckoutCoupon';
// routes
import { useDispatch } from 'src/common/redux/store';
import { onNextStep, setCart } from 'src/checkout/checkout.slice';
import { useEffect, useState } from 'react';
import { ICouponValidationResult, IUserCoupon } from 'src/common/@types/coupon/coupon.interface';

// ----------------------------------------------------------------------

const CheckoutCart = () => {
  const dispatch = useDispatch();
  // Get cart data from API
  const { data: cartData, isLoading } = useGetCart();
  const minusItem = useMinusItemQuantity();
  const plusItem = usePlusItemQuantity();
  const removeItem = useRemoveItemFromCart();

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<ICouponValidationResult | null>(null);

  useEffect(() => {
    if (cartData?.metadata) {
      dispatch(setCart(cartData.metadata));
    }
  }, [cartData, dispatch]);

  const cart = cartData?.metadata?.lineItems || [];
  const subtotal = cart.reduce((sum, item) => sum + Number(item.total), 0);

  // Calculate discount from applied coupon
  const discount = appliedCoupon
    ? appliedCoupon.discount.discountAmount + appliedCoupon.discount.shippingDiscount
    : 0;

  const total = subtotal - discount;

  const totalItems = sum(cart.map((item) => item.quantity));
  const isEmptyCart = cart.length === 0;

  const handleDeleteCart = (id: string) => {
    removeItem.mutate({ productId: id });
  };

  const handleIncreaseQuantity = (id: string) => {
    plusItem.mutate({ productId: id });
  };

  const handleDecreaseQuantity = (id: string) => {
    minusItem.mutate({ productId: id });
  };

  const handleApplyDiscount = (value: number) => {
    // Implement discount logic if needed
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  // Coupon handlers
  const handleCouponApplied = (coupon: IUserCoupon | ICouponValidationResult) => {
    // Convert IUserCoupon to ICouponValidationResult if needed
    if ('userId' in coupon) {
      const userCoupon = coupon as IUserCoupon;

      // Calculate discount based on coupon type
      let discountAmount = 0;
      let shippingDiscount = 0;

      if (userCoupon.coupon.type === 'percent') {
        discountAmount = Math.min(
          (subtotal * userCoupon.coupon.value) / 100,
          userCoupon.coupon.maxDiscountAmount || Infinity
        );
      } else if (userCoupon.coupon.type === 'fixed') {
        discountAmount = userCoupon.coupon.value;
      } else if (userCoupon.coupon.type === 'free_shipping') {
        shippingDiscount = 30000; // Shipping fee
      }

      const validationResult: ICouponValidationResult = {
        coupon: userCoupon.coupon,
        discount: {
          discountAmount: discountAmount,
          shippingDiscount: shippingDiscount,
        },
      };
      setAppliedCoupon(validationResult);
    } else {
      setAppliedCoupon(coupon as ICouponValidationResult);
    }
  };

  const handleCouponRemoved = () => {
    setAppliedCoupon(null);
  };

  // Map API cart line items to UI CartItem type if needed by CheckoutProductList
  const uiCart = cart.map((item) => ({
    id: String(item.productId),
    name: item.product.name,
    cover: item.product.thumbnail ?? '', // Ensure cover is always a string
    available: item.product.stock,
    price: Number(item.price),
    color: '', // Not in API, fallback to empty
    size: '', // Not in API, fallback to empty
    quantity: item.quantity,
    subtotal: Number(item.total),
  }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Giỏ hàng
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({totalItems} sản phẩm)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <Scrollbar>
              <CheckoutProductList
                products={uiCart}
                onDelete={handleDeleteCart}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            </Scrollbar>
          ) : (
            <EmptyContent
              title="Giỏ hàng trống"
              description="Có vẻ như bạn chưa có sản phẩm nào trong giỏ hàng."
              img="/assets/illustrations/illustration_empty_cart.svg"
            />
          )}
        </Card>

        <Button
          color="inherit"
          component={RouterLink}
          to={'/'}
          startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
        >
          Tiếp tục mua sắm
        </Button>
      </Grid>

      <Grid item xs={12} md={4}>
        {/* Coupon Section */}
        <Card sx={{ mb: 3 }}>
          <CheckoutCoupon
            cartData={{
              subtotal,
              shippingFee: 30000,
              items: cart.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: Number(item.price),
              })),
            }}
            onCouponApplied={handleCouponApplied}
            onCouponRemoved={handleCouponRemoved}
            appliedCoupon={appliedCoupon}
          />
        </Card>

        <CheckoutSummary
          enableDiscount
          total={total}
          discount={discount}
          subtotal={subtotal}
          onApplyDiscount={handleApplyDiscount}
        />
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={cart.length === 0}
          onClick={handleNextStep}
        >
          Thanh toán
        </Button>
      </Grid>
    </Grid>
  );
};

export default CheckoutCart;
