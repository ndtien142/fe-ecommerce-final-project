// ----------------------------------------------------------------------

import { CustomFile } from 'src/common/components/upload';
import { PaginationMeta } from '../common.interface';
import { ICategory } from './category.interface';

export type PaymentType = 'paypal' | 'credit_card' | 'cash';

export type ProductType = 'simple' | 'product_variants';

export type ProductStatus = 'active' | 'inactive' | 'archived' | 'draft';

export type ProductFlag = 'new' | 'popular' | 'featured' | 'none' | 'on_sale';

export type ProductInventoryType = 'in_stock' | 'out_of_stock' | 'low_stock';

export type OnCreateBilling = (address: BillingAddress) => void;

export type ProductRating = {
  name: string;
  starCount: number;
  reviewCount: number;
};

export type ProductReview = {
  id: string;
  name: string;
  avatarUrl: string;
  comment: string;
  rating: number;
  isPurchased: boolean;
  helpful: number;
  postedAt: Date | string | number;
};

export type ProductImage = {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
  createTime: string;
  updateTime: string;
  productId: number;
};

export type ProductMeta = {
  id: number;
  metaKey: string;
  metaValue: string;
};

export type ProductTag = {
  id: number;
  name: string;
};

export type ProductBrand = {
  id: number;
  name: string;
  description: string;
  logoUrl: string;
  status: string;
};

export type Product = {
  id: number;
  name: string;
  description: string | null;
  productType: ProductType | null;
  thumbnail: string | null;
  slug: string | null;
  status: ProductStatus | null;
  brandId?: number | null;
  price: number;
  flag: ProductFlag;
  stock: number;
  minStock?: number | null;
  weight?: number | null;
  width?: number | null;
  height?: number | null;
  length?: number | null;
  priceSale?: number | null;
  sold?: number | null;
  categories: ICategory[] | null;
  inventoryType: ProductInventoryType;
  isSale?: boolean;
};

export type CartItem = {
  id: string;
  name: string;
  cover: string;
  available: number;
  price: number;
  color: string;
  size: string;
  quantity: number;
  subtotal: number;
};

export type BillingAddress = {
  receiver: string;
  phone: string;
  fullAddress: string;
  addressType: string;
  isDefault: boolean;
};

export type ProductState = {
  isLoading: boolean;
  error: Error | string | null;
  products: Product[];
  product: Product | null;
  sortBy: string | null;
  filters: {
    gender: string[];
    category: string;
    colors: string[];
    priceRange: [number, number];
    rating: string;
  };
  checkout: {
    activeStep: number;
    cart: CartItem[];
    subtotal: number;
    total: number;
    discount: number;
    shipping: number;
    billing: BillingAddress | null;
  };
};

export type ProductFilter = {
  category: string;
  colors: string[];
  priceRange: [number, number];
  rating: string;
};

export type DeliveryOption = {
  value: number;
  title: string;
  description: string;
};

export type PaymentOption = {
  value: PaymentType;
  title: string;
  description: string;
  icons: string[];
};

export type CardOption = {
  value: string;
  label: string;
};

export interface IProductApiResponse {
  id: number;
  name: string;
  description: string;
  productType: string | null;
  thumbnail: string | null;
  slug: string;
  status: ProductStatus;
  brandId: number;
  price: string;
  flag: ProductFlag;
  stock: number;
  minStock: number;
  weight: string;
  width: string;
  height: string;
  length: string;
  priceSale: string;
  sold: number;
  inventoryType: ProductInventoryType;
  createTime: string;
  updateTime: string;
  brand: ProductBrand;
  images: ProductImage[];
  categories: ICategory[];
  isSale: boolean;
}

export interface IProductListResponse {
  metadata: {
    items: IProductApiResponse[];
    meta: PaginationMeta;
  };
  status: string;
  message: string;
}

export interface IProductDetailResponse {
  metadata: IProductApiResponse;
  status: string;
  message: string;
}

export interface IParamsProduct {
  page?: number;
  limit?: number;
  categorySlug?: string;
  sortBy?: string;
  search?: string;
  brandId?: number;
  priceRange?: [number, number];
  inventoryType?: ProductInventoryType;
  flag?: ProductFlag;
  status?: ProductStatus;
}

export interface FormValuesProps extends Omit<Product, 'images' | 'brand' | 'categories'> {
  taxes?: boolean;
  inStock?: boolean;
  images: (CustomFile | string)[];
  categories: ICategoryForm['id'][];
}

export type ICategoryForm = Omit<ICategory, 'children' | 'parent'>;
