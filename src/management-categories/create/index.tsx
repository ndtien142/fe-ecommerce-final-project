import { Container } from '@mui/material';
import React from 'react';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import FormNewEditCategory from '../common/components/FormNewEditCategory';

const ReorderCategoriesContainer = () => {
  const { themeStretch } = useSettings();

  return (
    <Page title="Trang quản lý danh mục: Tạo mới danh mục">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Quản lý danh mục"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Quản lý danh mục',
              href: PATH_DASHBOARD.categories.root,
            },
            { name: 'Tạo mới' },
          ]}
        />
        <FormNewEditCategory isEdit={false} />
      </Container>
    </Page>
  );
};

export default ReorderCategoriesContainer;
