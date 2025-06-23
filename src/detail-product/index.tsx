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

const PRODUCT_DESCRIPTION = [
  {
    title: '100% Chính hãng',
    description: 'Thanh sô cô la, kẹo que, kem, kẹo bơ cứng, bánh quy, kẹo dẻo.',
    icon: 'ic:round-verified',
  },
  {
    title: 'Đổi trả trong 10 ngày',
    description: 'Bánh quy marshmallow, bánh donut, bánh dragée, bánh trái cây, bánh wafer.',
    icon: 'eva:clock-fill',
  },
  {
    title: 'Bảo hành 1 năm',
    description: 'Kẹo bông, bánh gừng, bánh kem, tôi yêu đồ ngọt.',
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
      <Page title="Product Details">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Product Details"
            links={[
              { name: 'Home', href: '/' },
              { name: 'Shop', href: '/shop' },
              { name: sentenceCase(slug) },
            ]}
          />

          {isLoading && <SkeletonProductItem />}
          {isError && <Typography variant="h6">404 Product not found</Typography>}

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
                      <Tab disableRipple value="1" label="Description" />
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
