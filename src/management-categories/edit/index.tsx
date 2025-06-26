import { Container } from '@mui/material';
import React from 'react';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useGetDetailCategory } from '../common/hooks/useGetDetailCategory';
import { useParams } from 'react-router';
import FormEditCategory from './FormNewEditCategory';

const EditCategoriesContainer = () => {
  const { themeStretch } = useSettings();

  const params = useParams();

  const { data: category } = useGetDetailCategory(Number(params.id));

  console.log('category', category);

  return (
    <Page title="Trang quản lý danh mục: Chỉnh sửa danh mục">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Quản lý danh mục"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Quản lý danh mục',
              href: PATH_DASHBOARD.categories.root,
            },
            { name: 'Chỉnh sửa' },
          ]}
        />
        <FormEditCategory isEdit={true} currentCategory={category?.metadata} />
      </Container>
    </Page>
  );
};

export default EditCategoriesContainer;
