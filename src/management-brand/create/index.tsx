// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/common/routes/paths';
// hooks
import useSettings from 'src/common/hooks/useSettings';
// components
import Page from 'src/common/components/Page';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import FormNewEditBrand from '../common/componenets/FormNewEditBrand';
// sections

// ----------------------------------------------------------------------

export default function BrandCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Trang quản lý sản phẩm: Tạo mới thương hiệu">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Tạo mới thương hiệu"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Quản lý thương hiệu',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: 'Tạo mới thương hiệu' },
          ]}
        />
        <FormNewEditBrand />
      </Container>
    </Page>
  );
}
