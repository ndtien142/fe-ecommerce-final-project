import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections

 // Hook lấy dữ liệu phòng ban
import DepartmentNewEditForm from 'src/management-department/create/components/DepartmentNewEditForm';
import useGetDepartment from 'src/management-department/common/hooks/useGetDepartment';

// ----------------------------------------------------------------------

export default function DepartmentCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { departmentId = '' } = useParams(); // Lấy departmentId từ URL

  const isEdit = pathname.includes('edit'); // Kiểm tra xem là chế độ chỉnh sửa hay tạo mới

  const { data: currentDepartment } = useGetDepartment(departmentId); // Hook lấy phòng ban nếu có

  return (
    <Page title="Department: Create a new department">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new department' : 'Edit department'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Department', href: PATH_DASHBOARD.department.list },
            { name: !isEdit ? 'New department' : capitalCase(departmentId) },
          ]}
        />

        <DepartmentNewEditForm isEdit={isEdit} currentDepartment={currentDepartment || undefined} />
      </Container>
    </Page>
  );
}
