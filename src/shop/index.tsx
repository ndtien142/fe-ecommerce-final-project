import React, { useEffect, useState } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Typography, Stack, Box, Grid } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../common/redux/store';
import { filterProducts, setProducts } from '../common/redux/slices/product';
// routes
import { PATH_CUSTOMER } from '../common/routes/paths';
// @types
import { ProductFilter, IProductApiResponse } from '../common/@types/product/product.interface';
// hooks
import useSettings from '../common/hooks/useSettings';
import { useSearchParams, useLocation } from 'react-router-dom';

// components
import Page from '../common/components/Page';
import HeaderBreadcrumbs from '../common/components/HeaderBreadcrumbs';
import { FormProvider } from '../common/components/hook-form';
import Navbar from './components/Navbar';
// sections
import {
  ShopTagFiltered,
  ShopProductSort,
  ShopProductList,
  ShopFilterSidebar,
  ShopProductSearch,
} from './components';
import { useGetListProduct } from 'src/management-product/common/hooks/useGetListProduct';
import CartWidget from 'src/common/components/CartWidget';
import { HEADER } from 'src/config';

// ----------------------------------------------------------------------

export default function HomeContainer() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // Get category from URL query parameters
  const categorySlug = searchParams.get('category') || '';

  const { sortBy, filters } = useSelector((state) => state.product);

  // Build API filters object
  const apiFilters = {
    categorySlug: categorySlug || undefined,
    minPrice: filters.priceRange[0] !== 0 ? filters.priceRange[0] : undefined,
    maxPrice: filters.priceRange[1] !== 200 ? filters.priceRange[1] : undefined,
    gender: filters.gender.length > 0 ? filters.gender : undefined,
    colors: filters.colors.length > 0 ? filters.colors : undefined,
    rating: filters.rating || undefined,
    sortBy: sortBy || undefined,
  };

  // Use the hook to get products with all filters
  const { data, isLoading } = useGetListProduct(apiFilters);

  // Use API response directly - no client-side filtering needed
  const products: IProductApiResponse[] = data?.metadata?.items || [];

  // Update filters to use URL category
  const updatedFilters = {
    ...filters,
    category: categorySlug || 'All',
  };

  const defaultValues = {
    gender: filters.gender,
    category: categorySlug || 'All',
    colors: filters.colors,
    priceRange: filters.priceRange,
    rating: filters.rating,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, setValue } = methods;

  const values = watch();

  const min = values.priceRange[0];
  const max = values.priceRange[1];

  const isDefault =
    filters.priceRange[0] === 0 &&
    filters.priceRange[1] === 200 &&
    !filters.rating &&
    filters.gender.length === 0 &&
    filters.colors.length === 0 &&
    !categorySlug;

  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch, data]);

  useEffect(() => {
    // Update form values when URL category changes
    setValue('category', categorySlug || 'All');
  }, [categorySlug, setValue]);

  useEffect(() => {
    const updatedValues = {
      ...values,
      category: categorySlug || 'All',
    };
    dispatch(filterProducts(updatedValues));
  }, [dispatch, values, categorySlug]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    if (openFilter) {
      handleCloseFilter();
    }
    reset({
      gender: [],
      category: 'All',
      colors: [],
      priceRange: [0, 200],
      rating: '',
    });
  };

  const isHome = location.pathname === '/';

  const handleRemoveGender = (value: string) => {
    const newValue = filters.gender.filter((item) => item !== value);
    setValue('gender', newValue);
  };

  const handleRemoveCategory = () => {
    setValue('category', 'All');
  };

  const handleRemoveColor = (value: string) => {
    const newValue = filters.colors.filter((item) => item !== value);
    setValue('colors', newValue);
  };

  const handleRemovePrice = () => {
    setValue('priceRange', [0, 200]);
  };

  const handleRemoveRating = () => {
    setValue('rating', '');
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
      <Page title="Ecommerce: Shop">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <HeaderBreadcrumbs
            heading="Shop"
            links={[
              { name: 'Trang chủ', href: '/' },
              { name: 'Cửa hàng', href: '/shop' },
            ]}
          />

          <Grid container spacing={3}>
            {/* Category Navigation Sidebar - Hidden on Home page */}
            {!isHome && (
              <Grid item xs={12} md={3}>
                <Navbar />
              </Grid>
            )}

            {/* Main Content */}
            <Grid item xs={12} md={isHome ? 12 : 9}>
              <Stack
                spacing={2}
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ sm: 'center' }}
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <ShopProductSearch />

                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                  <FormProvider methods={methods}>
                    <ShopFilterSidebar
                      isDefault={isDefault}
                      isOpen={openFilter}
                      onOpen={handleOpenFilter}
                      onClose={handleCloseFilter}
                      onResetAll={handleResetFilter}
                    />
                  </FormProvider>

                  <ShopProductSort />
                </Stack>
              </Stack>

              <Stack sx={{ mb: 3 }}>
                {!isDefault && (
                  <>
                    <Typography variant="body2" gutterBottom>
                      <strong>{products.length}</strong>
                      &nbsp;Products found
                    </Typography>

                    <ShopTagFiltered
                      filters={updatedFilters}
                      isShowReset={!isDefault && !openFilter}
                      onRemoveCategory={handleRemoveCategory}
                      onRemoveColor={handleRemoveColor}
                      onRemovePrice={handleRemovePrice}
                      onRemoveRating={handleRemoveRating}
                      onResetAll={handleResetFilter}
                    />
                  </>
                )}
              </Stack>

              <ShopProductList products={products} loading={isLoading} />
            </Grid>
          </Grid>

          <CartWidget />
        </Container>
      </Page>
    </Box>
  );
}
