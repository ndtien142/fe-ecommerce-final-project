import { capitalCase } from 'change-case';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/common/routes/paths';
// hooks
import useTabs from 'src/common/hooks/useTabs';
import useSettings from 'src/common/hooks/useSettings';
// components
import Page from 'src/common/components/Page';
import Iconify from 'src/common/components/Iconify';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
// sections
import AccountBilling from './components/AccountBilling';
import AccountChangePassword from './components/AccountChangePassword';
import AccountNotifications from './components/AccountNotification';
import AccountGeneral from './components/AccountGeneral';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();

  const { currentTab, onChangeTab } = useTabs('general');

  const ACCOUNT_TABS = [
    {
      value: 'general',
      label: 'Thông tin chung',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <AccountGeneral />,
    },
    {
      value: 'billing',
      label: 'Thông tin thanh toán',
      icon: <Iconify icon={'ic:round-receipt'} width={20} height={20} />,
      component: <AccountBilling />,
    },
    {
      value: 'notifications',
      label: 'Thông báo',
      icon: <Iconify icon={'eva:bell-fill'} width={20} height={20} />,
      component: <AccountNotifications />,
    },
    {
      value: 'change_password',
      label: 'Đổi mật khẩu',
      icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <Page title="Người dùng: Cài đặt tài khoản">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Tài khoản"
          links={[
            { name: 'Bảng điều khiển', href: PATH_DASHBOARD.root },
            { name: 'Cài đặt tài khoản' },
          ]}
        />

        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={tab.label}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
