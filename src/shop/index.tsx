import React, { useEffect, useState, useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Typography, Stack, Box, Grid } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../common/redux/store';
import { filterProducts, setProducts } from '../common/redux/slices/product';
// @types
import { IProductApiResponse } from '../common/@types/product/product.interface';
// hooks
import useSettings from '../common/hooks/useSettings';
import { useSearchParams, useLocation } from 'react-router-dom';

// components
import Page from '../common/components/Page';
import HeaderBreadcrumbs from '../common/components/HeaderBreadcrumbs';
import { FormProvider } from '../common/components/hook-form';
import Navbar from './components/Navbar';
// sections
import { ShopTagFiltered, ShopProductSort, ShopProductList, ShopFilterSidebar } from './components';
import ShopProductSearchSimple from './components/ShopProductSearchSimple';
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

  // Get parameters from URL query
  const categorySlug = searchParams.get('category') || '';
  const searchQuery = searchParams.get('search') || '';
  const flagParam = searchParams.get('flag') || '';
  const statusParam = searchParams.get('status') || '';
  const brandIdParam = searchParams.get('brandId') || '';

  const { sortBy, filters } = useSelector((state) => state.product);

  // Build API filters object according to v1 API documentation
  const apiFilters = {
    page: 1,
    limit: 20,
    categorySlug: categorySlug || undefined,
    status: (statusParam as 'active' | 'inactive' | 'archived') || 'active',
    brandId: brandIdParam ? parseInt(brandIdParam) : undefined,
    minPrice: filters.priceRange[0] !== 0 ? filters.priceRange[0] : undefined,
    maxPrice: filters.priceRange[1] !== 200 ? filters.priceRange[1] : undefined,
    flag: (flagParam as 'none' | 'new' | 'popular' | 'featured' | 'on_sale') || undefined,
    search: searchQuery || undefined,
    sortBy: getSortBy(sortBy),
    sortOrder: getSortOrder(sortBy),
    // Legacy params for backward compatibility
    colors: filters.colors.length > 0 ? filters.colors : undefined,
    sizes: filters.sizes?.length > 0 ? filters.sizes : undefined,
    brands: filters.brands?.length > 0 ? filters.brands : undefined,
    rating: filters.rating || undefined,
  };

  // Helper functions to determine sort parameters
  function getSortBy(
    sortBy: string | null
  ): 'create_time' | 'price' | 'price_sale' | 'name' | 'sold' | 'stock' | 'id' | 'update_time' {
    if (!sortBy) return 'create_time';

    // Handle special cases that need different sortBy values
    switch (sortBy) {
      case 'price':
      case 'price_desc':
        return 'price';
      case 'price_sale':
      case 'price_sale_desc':
        return 'price_sale';
      case 'name':
      case 'name_desc':
        return 'name';
      case 'sold':
        return 'sold';
      case 'stock':
      case 'stock_desc':
        return 'stock';
      case 'create_time':
      default:
        return 'create_time';
    }
  }

  function getSortOrder(sortBy: string | null): 'ASC' | 'DESC' {
    if (!sortBy) return 'DESC';

    // Ascending for name (A-Z) and price (low-high)
    switch (sortBy) {
      case 'name':
      case 'price':
      case 'price_sale':
        return 'ASC';
      case 'name_desc':
      case 'price_desc':
      case 'price_sale_desc':
      case 'stock_desc':
        return 'DESC';
      case 'sold':
      case 'stock':
      case 'create_time':
      default:
        return 'DESC';
    }
  }

  // Use the hook to get products with all filters
  const { data, isLoading } = useGetListProduct(apiFilters);

  // Use API response directly - no client-side filtering needed
  const products: IProductApiResponse[] = useMemo(() => {
    const items = data?.metadata?.items || [];
    // If there's a search query, this will already be filtered by the API
    return items;
  }, [data]);

  // Show search results count or regular product count
  const productCount = products.length;
  const isSearching = Boolean(searchQuery);
  const displayText = isSearching
    ? `${productCount} kết quả tìm kiếm cho "${searchQuery}"`
    : `${productCount} sản phẩm`;

  // Update filters to use URL category
  const updatedFilters = {
    ...filters,
    category: categorySlug || 'All',
  };

  const defaultValues = {
    category: categorySlug || 'All',
    status: (statusParam as 'active' | 'inactive' | 'archived') || 'active',
    flag: (flagParam as 'none' | 'new' | 'popular' | 'featured' | 'on_sale') || 'none',
    colors: filters.colors,
    priceRange: filters.priceRange,
    rating: filters.rating,
    sizes: filters.sizes || [],
    brands: filters.brands || [],
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, setValue } = methods;

  const values = watch();

  const isDefault =
    filters.priceRange[0] === 0 &&
    filters.priceRange[1] === 200 &&
    !filters.rating &&
    filters.colors.length === 0 &&
    (!filters.sizes || filters.sizes.length === 0) &&
    (!filters.brands || filters.brands.length === 0) &&
    !categorySlug &&
    !searchQuery &&
    !flagParam &&
    statusParam === 'active' &&
    (!sortBy || sortBy === 'create_time');

  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch, products]);

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
      category: 'All',
      status: 'active',
      flag: 'none',
      colors: [],
      sizes: [],
      brands: [],
      priceRange: [0, 200],
      rating: '',
    });
  };

  const isHome = location.pathname === '/';

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
            heading="Cửa hàng"
            links={[
              { name: 'Trang chủ', href: '/' },
              { name: 'Cửa hàng', href: '/shop' },
            ]}
          />

          {/* Search Results Header */}
          {searchQuery && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Kết quả tìm kiếm cho: "{searchQuery}"
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {displayText}
              </Typography>
            </Box>
          )}

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
                <ShopProductSearchSimple />
                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                  <FormProvider methods={methods}>
                    <ShopFilterSidebar
                      isDefault={isDefault}
                      isOpen={openFilter}
                      onResetAll={handleResetFilter}
                      onOpen={handleOpenFilter}
                      onClose={handleCloseFilter}
                    />
                  </FormProvider>
                  <ShopProductSort />
                </Stack>
              </Stack>

              <Stack
                spacing={2}
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ sm: 'center' }}
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <ShopTagFiltered
                  filters={updatedFilters}
                  isShowReset={!isDefault}
                  onResetAll={handleResetFilter}
                  onRemovePrice={handleRemovePrice}
                  onRemoveRating={handleRemoveRating}
                  onRemoveCategory={handleRemoveCategory}
                  onRemoveColor={handleRemoveColor}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {displayText}
                </Typography>
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
