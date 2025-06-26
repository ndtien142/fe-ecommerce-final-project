import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Grid, Divider, Container, Typography, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// hooks
import useSettings from '../common/hooks/useSettings';
import { useGetDetailProductBySlug } from './hooks/useGetDetailProductBySlug';
// components
import Page from '../common/components/Page';
import Iconify from '../common/components/Iconify';
import Markdown from '../common/components/Markdown';
import HeaderBreadcrumbs from '../common/components/HeaderBreadcrumbs';
import { SkeletonProductItem } from '../common/components/skeleton';
import ProductSummary from './components/ProductSummary';
import ProductDetailsCarousel from './components/ProductDetailsCarousel';
// types
import { IProductApiResponse } from '../common/@types/product/product.interface';
import { HEADER } from 'src/config';
import CartWidget from 'src/common/components/CartWidget';

const PRODUCT_DESCRIPTION = [
  {
    title: '100% Chính hãng',
    description: 'Sản phẩm chính hãng, đảm bảo chất lượng tốt nhất cho khách hàng.',
    icon: 'ic:round-verified',
  },
  {
    title: 'Đổi trả trong 10 ngày',
    description: 'Hỗ trợ đổi trả sản phẩm trong vòng 10 ngày nếu không hài lòng.',
    icon: 'eva:clock-fill',
  },
  {
    title: 'Bảo hành 1 năm',
    description: 'Cam kết bảo hành sản phẩm trong thời gian 1 năm.',
    icon: 'ic:round-verified-user',
  },
];

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

const DetailProduct = () => {
  const { themeStretch } = useSettings();
  const { slug = '' } = useParams();
  const [tab, setTab] = useState('1');

  // Use the hook to get product detail by slug
  const { data, isLoading, isError } = useGetDetailProductBySlug(slug);

  const product: IProductApiResponse | null = data?.metadata || null;

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
      <Page title="Chi tiết sản phẩm">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Chi tiết sản phẩm"
            links={[
              { name: 'Trang chủ', href: '/' },
              { name: 'Cửa hàng', href: '/shop' },
              { name: sentenceCase(slug) },
            ]}
          />

          <CartWidget />

          {isLoading && <SkeletonProductItem />}
          {isError && <Typography variant="h6">404 Không tìm thấy sản phẩm</Typography>}

          {product && (
            <>
              <Card>
                <Grid container>
                  <Grid item xs={12} md={6} lg={7}>
                    {/* Product Images Carousel */}
                    <ProductDetailsCarousel product={product} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={5}>
                    {/* Product Summary */}
                    <ProductSummary product={product} />
                  </Grid>
                </Grid>
              </Card>

              <Grid container sx={{ my: 8 }}>
                {PRODUCT_DESCRIPTION.map((item) => (
                  <Grid item xs={12} md={4} key={item.title}>
                    <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                      <IconWrapperStyle>
                        <Iconify icon={item.icon} width={36} height={36} />
                      </IconWrapperStyle>
                      <Typography variant="subtitle1" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Card>
                <TabContext value={tab}>
                  <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                    <TabList onChange={(e, value) => setTab(value)}>
                      <Tab disableRipple value="1" label="Mô tả sản phẩm" />
                    </TabList>
                  </Box>
                  <Divider />
                  <TabPanel value="1">
                    <Box sx={{ p: 3 }}>
                      <Markdown children={product.description || ''} />
                    </Box>
                  </TabPanel>
                </TabContext>
              </Card>
            </>
          )}
        </Container>
      </Page>
    </Box>
  );
};

export default DetailProduct;
