import React from 'react';
import { Container } from '@mui/material';
import Page from 'src/common/components/Page';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import NewEditFormRole from '../common/components/edit-create/NewEditFormRole';

export default function CreateRolePage() {
  return (
    <Page title="Tạo mới vai trò">
      <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
        <HeaderBreadcrumbs
          heading="Tạo mới vai trò"
          links={[
            { name: 'Quản lý', href: '/management' },
            { name: 'Vai trò', href: '/management/role/list' },
            { name: 'Tạo mới' },
          ]}
        />
        <NewEditFormRole />
      </Container>
    </Page>
  );
}
