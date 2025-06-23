import { useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Step, Stepper, Container, StepLabel, StepConnector } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../common/redux/store';
import { getCart, createBilling } from '../common/redux/slices/product';
// routes
import { PATH_CUSTOMER } from '../common/routes/paths';
// hooks
import useIsMountedRef from '../common/hooks/useIsMountedRef';
import useSettings from '../common/hooks/useSettings';
// components
import Page from '../common/components/Page';
import Iconify from '../common/components/Iconify';
import HeaderBreadcrumbs from '../common/components/HeaderBreadcrumbs';
// sections
import CheckoutCart from './components/cart/CheckoutCart';

// ----------------------------------------------------------------------

const STEPS = ['Giỏ hàng', 'Thông tin & địa chỉ', 'Thanh toán'];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

function QontoStepIcon({ active, completed }: { active: boolean; completed: boolean }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'text.disabled',
      }}
    >
      {completed ? (
        <Iconify
          icon={'eva:checkmark-fill'}
          sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }}
        />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Box>
  );
}

const CheckoutContainer = () => {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const isMountedRef = useIsMountedRef();

  const { checkout } = useSelector((state) => state.product);

  const { cart, billing, activeStep } = checkout;

  const isComplete = activeStep === STEPS.length;

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  useEffect(() => {
    if (activeStep === 1) {
      dispatch(createBilling(null));
    }
  }, [dispatch, activeStep]);

  return (
    <Page title="Thanh toán">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Thanh toán"
          links={[
            { name: 'Trang chủ', href: PATH_CUSTOMER.home },
            {
              name: 'Mua sắm',
              href: PATH_CUSTOMER.eCommerce.root,
            },
            { name: 'Thanh toán' },
          ]}
        />

        <Grid container justifyContent={isComplete ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    sx={{
                      '& .MuiStepLabel-label': {
                        typography: 'subtitle2',
                        color: 'text.disabled',
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>

        {!isComplete ? (
          <>
            {activeStep === 0 && <CheckoutCart />}
            {/* {activeStep === 1 && <CheckoutBillingAddress />} */}
            {/* {activeStep === 2 && billing && <CheckoutPayment />} */}
          </>
        ) : (
          //   <CheckoutOrderComplete open={isComplete} />
          <></>
        )}
      </Container>
    </Page>
  );
};

export default CheckoutContainer;
