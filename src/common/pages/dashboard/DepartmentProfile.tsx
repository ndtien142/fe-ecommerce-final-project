import { capitalCase } from 'change-case';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/common/routes/paths';
// hooks
import useTabs from 'src/common/hooks/useTabs';
import useSettings from 'src/common/hooks/useSettings';
// _mock_
 // Import mock data đúng theo đường dẫn
// components
import Page from 'src/common/components/Page';
import Iconify from 'src/common/components/Iconify';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
// sections
 // Sửa đúng đường dẫn import
import { _departmentInfo } from 'src/common/_mock/_department';
import DepartmentFollowInfo from 'src/common/sections/@dashboard/department/profile/ProfileFollowInfo';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function DepartmentProfile() {
  const { themeStretch } = useSettings();

  const { currentTab, onChangeTab } = useTabs('departmentInfo'); // "departmentInfo" là tab mặc định

  const [findEmployees, setFindEmployees] = useState('');

  const handleFindEmployees = (value: string) => {
    setFindEmployees(value);
  };

  const DEPARTMENT_TABS = [
    {
      value: 'departmentInfo',
      icon: <Iconify icon={'ic:round-info'} width={20} height={20} />,
      component: <DepartmentFollowInfo department={_departmentInfo} />,  // Sửa đúng tên component
    },
    {
      value: 'followInfo',
      icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
      component: <DepartmentFollowInfo department={_departmentInfo} />,
    },
  ];

  return (
    <Page title="Department: Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Department Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Department', href: PATH_DASHBOARD.department.root },
            { name: 'Details' },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <DepartmentFollowInfo department={_departmentInfo} />  {/* Hiển thị thông tin phòng ban */}

          <TabsWrapperStyle>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {DEPARTMENT_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={capitalCase(tab.value)}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {DEPARTMENT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
