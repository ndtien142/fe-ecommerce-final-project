// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/common/routes/paths';
// hooks
import useSettings from 'src/common/hooks/useSettings';
// components
import Page from 'src/common/components/Page';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import ProductNewEditForm from '../common/ProductNewEditForm';
import { useGetDetailProductBySlug } from 'src/detail-product/hooks/useGetDetailProductBySlug';
import { useParams } from 'react-router';
import { useMemo } from 'react';
import { FormValuesProps } from 'src/common/@types/product/product.interface';
// sections

// ----------------------------------------------------------------------

export default function ProductEdit() {
  const { themeStretch } = useSettings();
  const params = useParams();
  const { data, isLoading, error } = useGetDetailProductBySlug(params.slug ?? '');

  // Transform API response to form data
  const currentProduct = useMemo((): FormValuesProps | null => {
    if (!data?.metadata) return null;

    const product = data.metadata;

    // Transform product data to match FormValuesProps interface
    return {
      id: product.id,
      name: product.name,
      description: product.description || '',
      productType: (product.productType as any) || 'simple',
      thumbnail: product.thumbnail || (product.images && product.images[0]?.imageUrl) || null,
      slug: product.slug,
      status: product.status,
      brandId: product.brandId || null,
      price: Number(product.price),
      flag: product.flag,
      stock: product.stock,
      minStock: product.minStock || null,
      weight: product.weight ? Number(product.weight) : null,
      width: product.width ? Number(product.width) : null,
      height: product.height ? Number(product.height) : null,
      length: product.length ? Number(product.length) : null,
      priceSale: product.priceSale ? Number(product.priceSale) : null,
      sold: product.sold || null,
      inventoryType: product.inventoryType,

      // FormValuesProps specific fields
      taxes: false, // Default value
      inStock: product.inventoryType === 'in_stock',

      // Handle categories - map to array of category IDs (string[])
      categories: product.categories?.map((cat: any) => cat.id) || [],

      // Handle images - convert to format expected by form (string URLs)
      images: product.images?.map((img) => img.imageUrl) || [],
    };
  }, [data]);

  if (isLoading) {
    return (
      <Page title="Đang tải...">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <div>Đang tải thông tin sản phẩm...</div>
        </Container>
      </Page>
    );
  }

  if (error) {
    return (
      <Page title="Lỗi">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <div>Có lỗi xảy ra khi tải thông tin sản phẩm</div>
        </Container>
      </Page>
    );
  }

  if (!currentProduct) {
    return (
      <Page title="Không tìm thấy sản phẩm">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <div>Không tìm thấy sản phẩm</div>
        </Container>
      </Page>
    );
  }

  return (
    <Page title="Trang quản lý sản phẩm: Chỉnh sửa sản phẩm">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={`Chỉnh sửa sản phẩm: ${currentProduct.name}`}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Quản lý sản phẩm',
              href: PATH_DASHBOARD.product.root,
            },
            { name: 'Chỉnh sửa sản phẩm' },
          ]}
        />
        <ProductNewEditForm isEdit={true} currentProduct={currentProduct} />
      </Container>
    </Page>
  );
}
