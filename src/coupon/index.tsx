import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Box, Stack, Tab, Tabs } from '@mui/material';
import { ICoupon } from '../common/@types/coupon/coupon.interface';
import CouponList from './components/CouponList';
import useAuth from '../common/hooks/useAuth';
import { HEADER } from 'src/config';

// ----------------------------------------------------------------------

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`coupon-tabpanel-${index}`}
      aria-labelledby={`coupon-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CouponPage() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState<ICoupon | undefined>(undefined);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleSelectCoupon = (coupon: ICoupon) => {
    setSelectedCoupon(coupon);
  };

  return (
    <Box
      component="main"
      sx={{
        px: { lg: 2 },
        pt: {
          xs: `${HEADER.MOBILE_HEIGHT + 20}px`,
          lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 40}px`,
        },
        pb: {
          xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
          lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 24}px`,
        },
      }}
    >
      <Helmet>
        <title>Mã giảm giá | Furniture Store</title>
      </Helmet>

      <Container maxWidth="lg">
        <Stack spacing={3}>
          {/* Header */}
          <Box>
            <Typography variant="h4" gutterBottom>
              Mã giảm giá
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Khám phá các ưu đãi hấp dẫn dành riêng cho bạn
            </Typography>
          </Box>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={selectedTab} onChange={handleTabChange}>
              <Tab label="Mã giảm giá công khai" />
              {user && <Tab label="Mã giảm giá của tôi" />}
            </Tabs>
          </Box>

          {/* Tab Content */}
          <TabPanel value={selectedTab} index={0}>
            <CouponList
              onSelectCoupon={handleSelectCoupon}
              selectedCoupon={selectedCoupon}
              showPagination={true}
            />
          </TabPanel>

          {user && (
            <TabPanel value={selectedTab} index={1}>
              <Typography variant="h6" color="text.secondary" textAlign="center">
                Mã giảm giá của tôi - Đang phát triển...
              </Typography>
            </TabPanel>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
