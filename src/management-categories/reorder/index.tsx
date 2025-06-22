import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import SortableList from '../common/components/reorder/SortableList';
import { useDispatch } from 'src/common/redux/store';
import { useGetListCategories } from '../common/hooks/useGetListCategories';
import { setItemsCategory } from '../common/category.slice';

const ReorderCategoriesContainer = () => {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  const { data } = useGetListCategories({ limit: 100, page: 1 });

  useEffect(() => {
    if (data && data?.metadata.items?.length > 0) {
      dispatch(setItemsCategory(data.metadata.items));
    }
  }, [data]);

  return (
    <Page title="Trang quản lý danh mục: danh sách danh mục">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Quản lý danh mục"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Quản lý danh mục',
              href: PATH_DASHBOARD.categories.root,
            },
            { name: 'Sắp xếp' },
          ]}
        />
        <SortableList />
      </Container>
    </Page>
  );
};

export default ReorderCategoriesContainer;
