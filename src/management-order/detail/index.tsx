import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../../common/hooks/useSettings';
// components
import Page from '../../common/components/Page';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
// sections
import { useGetOrderById } from '../hooks/useGetOrderById';
// import OrderDetailSection from '../components/detail/OrderDetailSection';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import NewOrderDetailSection from '../components/new-detail/NewOrderDetailSection';

// ----------------------------------------------------------------------

export default function OrderDetail() {
  const { themeStretch } = useSettings();
  const { id } = useParams<{ id: string }>();

  const { data } = useGetOrderById(id as string);
  const order = data?.metadata;

  return (
    <Page title="Chi tiết đơn hàng">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Chi tiết đơn hàng"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Đơn hàng', href: PATH_DASHBOARD.general.orders.list },
            { name: `Đơn #${order?.id}` || '' },
          ]}
        />

        <NewOrderDetailSection order={order} />
      </Container>
    </Page>
  );
}
