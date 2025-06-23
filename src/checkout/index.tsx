import { styled } from '@mui/material/styles';
import { Box, Grid, Step, Stepper, Container, StepLabel, StepConnector } from '@mui/material';
// routes
import { PATH_CUSTOMER } from '../common/routes/paths';
// hooks
import useSettings from '../common/hooks/useSettings';
// components
import Page from '../common/components/Page';
import Iconify from '../common/components/Iconify';
import HeaderBreadcrumbs from '../common/components/HeaderBreadcrumbs';
// sections
import CheckoutCart from './components/cart/CheckoutCart';
import { HEADER } from 'src/config';

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

  return (
    <Box
      component="main"
      sx={{
        px: { lg: 2 },
        pt: {
          xs: `${HEADER.MOBILE_HEIGHT + 20}px`,
          lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 40}px`,
        },
        pb: {
          xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
          lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 24}px`,
        },
      }}
    >
      <Page title="Thanh toán">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Thanh toán"
            links={[
              { name: 'Trang chủ', href: PATH_CUSTOMER.home },
              {
                name: 'Mua sắm',
                href: PATH_CUSTOMER.root,
              },
              { name: 'Thanh toán' },
            ]}
          />

          <Grid container justifyContent={false ? 'center' : 'flex-start'}>
            <Grid item xs={12} md={8} sx={{ mb: 5 }}>
              <Stepper alternativeLabel activeStep={0} connector={<QontoConnector />}>
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

          <CheckoutCart />
        </Container>
      </Page>
    </Box>
  );
};

export default CheckoutContainer;
