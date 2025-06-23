import sum from 'lodash/sum';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Grid, Card, Button, CardHeader, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../common/redux/store';
import {
  deleteCart,
  onNextStep,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
} from '../../../common/redux/slices/product';
// routes
import { PATH_CUSTOMER } from '../../../common/routes/paths';
// components
import Iconify from '../../../common/components/Iconify';
import Scrollbar from '../../../common/components/Scrollbar';
import EmptyContent from '../../../common/components/EmptyContent';
import CheckoutSummary from './CheckoutSummary';
import CheckoutProductList from './CheckoutProductList';

// ----------------------------------------------------------------------

const CheckoutCart = () => {
  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.product);

  const { cart, total, discount, subtotal } = checkout;

  const totalItems = sum(cart.map((item) => item.quantity));

  const isEmptyCart = cart.length === 0;

  const handleDeleteCart = (productId: string) => {
    dispatch(deleteCart(productId));
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleIncreaseQuantity = (productId: string) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleApplyDiscount = (value: number) => {
    dispatch(applyDiscount(value));
  };

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
                products={cart}
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
          to={PATH_CUSTOMER.home}
          startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
        >
          Tiếp tục mua sắm
        </Button>
      </Grid>

      <Grid item xs={12} md={4}>
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
