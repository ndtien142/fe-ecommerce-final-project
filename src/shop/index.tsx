import React, { useEffect, useState } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Typography, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../common/redux/store';
import { getProducts, filterProducts, setProducts } from '../common/redux/slices/product';
// routes
import { PATH_CUSTOMER } from '../common/routes/paths';
// @types
import {
  // Product, // remove this
  ProductFilter,
  IProductApiResponse,
} from '../common/@types/product/product.interface';
// hooks
import useSettings from '../common/hooks/useSettings';

// components
import Page from '../common/components/Page';
import HeaderBreadcrumbs from '../common/components/HeaderBreadcrumbs';
import { FormProvider } from '../common/components/hook-form';
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

// ----------------------------------------------------------------------

export default function HomeContainer() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const [openFilter, setOpenFilter] = useState(false);

  // Use the hook to get products
  const { data, isLoading } = useGetListProduct({});

  // Use API response directly for ShopProductList and filtering
  const products: IProductApiResponse[] = data?.metadata?.items || [];

  const { sortBy, filters } = useSelector((state) => state.product);

  // Filter using IProductApiResponse[]
  const filteredProducts = applyFilter(products, sortBy, filters);

  const defaultValues = {
    gender: filters.gender,
    category: filters.category,
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
    min === 0 &&
    max === 200 &&
    !values.rating &&
    values.gender.length === 0 &&
    values.colors.length === 0 &&
    values.category === 'All';

  useEffect(() => {
    dispatch(setProducts(products));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(filterProducts(values));
  }, [dispatch, values]);

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
    <Page title="Ecommerce: Shop">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Shop"
          links={[
            { name: 'Dashboard', href: PATH_CUSTOMER.home },
            {
              name: 'E-Commerce',
              href: PATH_CUSTOMER.eCommerce.root,
            },
            { name: 'Shop' },
          ]}
        />

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
                <strong>{filteredProducts.length}</strong>
                &nbsp;Products found
              </Typography>

              <ShopTagFiltered
                filters={filters}
                isShowReset={!isDefault && !openFilter}
                onRemoveGender={handleRemoveGender}
                onRemoveCategory={handleRemoveCategory}
                onRemoveColor={handleRemoveColor}
                onRemovePrice={handleRemovePrice}
                onRemoveRating={handleRemoveRating}
                onResetAll={handleResetFilter}
              />
            </>
          )}
        </Stack>

        <ShopProductList products={filteredProducts} loading={isLoading} />
        <CartWidget />
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

// Update filter to use IProductApiResponse
function applyFilter(
  products: IProductApiResponse[],
  sortBy: string | null,
  filters: ProductFilter
) {
  // SORT BY
  if (sortBy === 'featured') {
    products = orderBy(products, ['sold'], ['desc']);
  }
  if (sortBy === 'newest') {
    products = orderBy(products, ['createTime'], ['desc']);
  }
  if (sortBy === 'priceDesc') {
    products = orderBy(products, [(p) => Number(p.price)], ['desc']);
  }
  if (sortBy === 'priceAsc') {
    products = orderBy(products, [(p) => Number(p.price)], ['asc']);
  }
  // FILTER PRODUCTS
  if (filters.gender.length > 0) {
    products = products.filter((product) => {
      // No gender in API, always false
      return false;
    });
  }
  if (filters.category !== 'All') {
    products = products.filter(
      (product) =>
        product.categories && product.categories.some((cat) => cat.name === filters.category)
    );
  }
  if (filters.colors.length > 0) {
    products = products.filter(() => false); // No colors in API
  }

  const min = filters.priceRange[0];
  const max = filters.priceRange[1];

  if (min !== 0 || max !== 200) {
    products = products.filter(
      (product) => Number(product.price) >= min && Number(product.price) <= max
    );
  }

  if (filters.rating) {
    products = products.filter(() => false); // No rating in API
  }
  return products;
}
