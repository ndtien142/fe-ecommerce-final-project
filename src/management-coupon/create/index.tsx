// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/common/routes/paths';
// hooks
import useSettings from 'src/common/hooks/useSettings';
// components
import Page from 'src/common/components/Page';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import FormNewEditCoupon from '../common/components/FormNewEditCoupon';

// ----------------------------------------------------------------------

export default function CouponCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Tạo coupon mới">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Tạo coupon mới"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Quản lý coupon',
              href: PATH_DASHBOARD.coupon.root,
            },
            { name: 'Tạo coupon mới' },
          ]}
        />
        <FormNewEditCoupon />
      </Container>
    </Page>
  );
}
