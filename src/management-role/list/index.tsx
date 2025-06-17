import { Container } from '@mui/material';
import React from 'react';
import Page from 'src/common/components/Page';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import RoleListTable from '../common/components/list/RoleListTable';

const ListRoleContainer = () => {
  return (
    <Page title="Danh sách vai trò">
      <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
        <HeaderBreadcrumbs
          heading="Danh sách vai trò"
          links={[
            { name: 'Quản lý', href: '/management' },
            { name: 'Vai trò', href: '/management/role/list' },
          ]}
        />
        <RoleListTable />
      </Container>
    </Page>
  );
};

export default ListRoleContainer;
