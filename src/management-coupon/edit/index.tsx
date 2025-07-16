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
import { useParams } from 'react-router-dom';
import { useGetCouponDetail } from '../common/hooks/useGetCouponDetail';

// ----------------------------------------------------------------------

export default function CouponEdit() {
  const { themeStretch } = useSettings();
  const { name } = useParams();
  const couponId = name || '';

  const { data: couponDetail, isLoading } = useGetCouponDetail(couponId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Page title="Chỉnh sửa coupon">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chỉnh sửa coupon"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Quản lý coupon',
              href: PATH_DASHBOARD.coupon.root,
            },
            { name: 'Chỉnh sửa coupon' },
          ]}
        />
        <FormNewEditCoupon initialValues={couponDetail} isEdit={true} couponId={couponId} />
      </Container>
    </Page>
  );
}
