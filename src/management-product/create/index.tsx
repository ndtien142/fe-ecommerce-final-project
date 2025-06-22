// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/common/routes/paths';
// hooks
import useSettings from 'src/common/hooks/useSettings';
// components
import Page from 'src/common/components/Page';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import ProductNewEditForm from '../common/ProductNewEditForm';
// sections

// ----------------------------------------------------------------------

export default function ProductCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Trang quản lý sản phẩm: Tạo mới sản phẩm">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Tạo mới sản phẩm"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Quản lý sản phẩm',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: 'Tạo mới sản phẩm' },
          ]}
        />
        <ProductNewEditForm />
      </Container>
    </Page>
  );
}
