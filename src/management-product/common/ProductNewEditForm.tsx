import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography, InputAdornment, MenuItem } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/common/routes/paths';
// @types
import {
  FormValuesProps,
  ICategoryForm,
  Product,
} from 'src/common/@types/product/product.interface';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFUploadMultiFile,
} from 'src/common/components/hook-form';
import { slugify } from 'src/common/utils/common.util';
import { useGetListBrand } from 'src/management-brand/common/hooks/useGetListBrand';
import { useGetCategoriesTree } from 'src/management-categories/common/hooks/useGetCategoriesTree';
import { flattenCategories } from 'src/management-categories/common/utils';
import { useCreateNewProduct } from './hooks/useCreateNewProduct';
import useUploadMultiImage from 'src/common/hooks/useUploadMultiImage';
import { useUpdateProduct } from './hooks/useUpdateProduct';

// Utility type to omit recursive properties from ICategory

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Không hoạt động' },
  { value: 'draft', label: 'Nháp' },
  { value: 'archived', label: 'Lưu trữ' },
];

const FLAG_OPTIONS = [
  { value: 'new', label: 'Mới' },
  { value: 'popular', label: 'Phổ biến' },
  { value: 'featured', label: 'Nổi bật' },
  { value: 'on_sale', label: 'Đang giảm giá' },
  { value: 'none', label: 'Không có nhãn' },
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

type Props = {
  isEdit?: boolean;
  currentProduct?: FormValuesProps;
};

export default function ProductNewEditForm({ isEdit, currentProduct }: Props) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { data: listBrand } = useGetListBrand({ page: 1, limit: 50 });
  const { data: categoriesTree } = useGetCategoriesTree();

  const { mutate } = useCreateNewProduct();

  const { mutate: updateProduct } = useUpdateProduct();

  const { uploadImages } = useUploadMultiImage();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Tên sản phẩm là bắt buộc'),
    description: Yup.string().required('Mô tả sản phẩm là bắt buộc'),
    images: Yup.array().min(1, 'Cần ít nhất 1 hình ảnh'),
    price: Yup.number()
      .typeError('Giá phải là số')
      .moreThan(0, 'Giá phải lớn hơn 0')
      .required('Giá là bắt buộc'),
    priceSale: Yup.number()
      .typeError('Giá khuyến mãi phải là số')
      .min(0, 'Giá khuyến mãi không được nhỏ hơn 0')
      .max(Yup.ref('price'), 'Giá khuyến mãi không được lớn hơn giá thường')
      .nullable(),
    stock: Yup.number()
      .typeError('Số lượng phải là số')
      .min(0, 'Số lượng không được nhỏ hơn 0')
      .required('Số lượng là bắt buộc'),
    minStock: Yup.number()
      .typeError('Số lượng tối thiểu phải là số')
      .min(0, 'Số lượng tối thiểu không được nhỏ hơn 0')
      .nullable(),
    brandId: Yup.mixed().required('Thương hiệu là bắt buộc'),
    status: Yup.string()
      .oneOf(['active', 'inactive', 'draft', 'archived', ''], 'Trạng thái không hợp lệ')
      .required('Trạng thái là bắt buộc'),
    categories: Yup.array().of(Yup.number()).min(1, 'Chọn ít nhất 1 danh mục'),
    weight: Yup.number()
      .typeError('Cân nặng phải là số')
      .min(0, 'Cân nặng không được nhỏ hơn 0')
      .nullable(),
    width: Yup.number()
      .typeError('Chiều rộng phải là số')
      .min(0, 'Chiều rộng không được nhỏ hơn 0')
      .nullable(),
    height: Yup.number()
      .typeError('Chiều cao phải là số')
      .min(0, 'Chiều cao không được nhỏ hơn 0')
      .nullable(),
    length: Yup.number()
      .typeError('Chiều dài phải là số')
      .min(0, 'Chiều dài không được nhỏ hơn 0')
      .nullable(),
    slug: Yup.string().required('Slug là bắt buộc'),
  });

  const defaultValues = useMemo(
    () => ({
      id:
        typeof currentProduct?.id === 'number'
          ? currentProduct.id
          : currentProduct?.id
          ? Number(currentProduct.id)
          : undefined,
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      images: (currentProduct as any)?.images || [],
      price: currentProduct?.price || 0,
      priceSale: currentProduct?.priceSale || 0,
      inStock: true,
      taxes: true,
      flag: (currentProduct?.flag as Product['flag']) ?? '',
      status: (currentProduct?.status as Product['status']) ?? null,
      stock: currentProduct?.stock || 0,
      minStock: currentProduct?.minStock || 0,
      weight: currentProduct?.weight || 0,
      width: currentProduct?.width || 0,
      height: currentProduct?.height || 0,
      length: currentProduct?.length || 0,
      inventoryType: (currentProduct?.inventoryType as Product['inventoryType']) ?? '',
      categories: currentProduct?.categories || [],
      brandId:
        typeof currentProduct?.brandId === 'number'
          ? currentProduct.brandId
          : currentProduct?.brandId
          ? Number(currentProduct.brandId)
          : null,
      slug: currentProduct?.slug || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  console.log('Form errors:', errors);
  const values = watch();
  console.log('form values:', values);

  // Watch name and update slug
  const nameValue = watch('name');
  useEffect(() => {
    setValue('slug', slugify(nameValue || ''));
  }, [nameValue, setValue]);

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const onSubmit = async (data: FormValuesProps) => {
    if (!isEdit && !data.id) {
      let urls: string[] = [];
      if (data?.images && data.images.length > 0) {
        const filesToUpload = data.images.filter((img: any) => typeof img !== 'string');
        const existingUrls = data.images.filter((img): img is string => typeof img === 'string');

        // Upload images if they are new files
        if (filesToUpload.length > 0) {
          urls = await uploadImages(filesToUpload as File[]);
        }

        // Combine uploaded URLs with existing URLs
        urls = [...urls, ...existingUrls];
      }

      const payload = {
        ...data,
        inventoryType: data.inStock ? 'in_stock' : 'out_of_stock',
        brandId: data.brandId ? Number(data.brandId) : null,
        images: urls,
      };

      mutate(payload, {
        onSuccess: () => {
          enqueueSnackbar(!isEdit ? 'Tạo sản phẩm thành công!' : 'Cập nhật sản phẩm thành công!', {
            variant: 'success',
          });
          navigate(PATH_DASHBOARD.product.list);
        },
        onError: (error: any) => {
          enqueueSnackbar(error?.message || 'Đã có lỗi xảy ra!', { variant: 'error' });
        },
      });
    } else {
      let urls: string[] = [];
      if (data?.images && data.images.length > 0) {
        const filesToUpload = data.images.filter((img: any) => typeof img !== 'string');
        const existingUrls = data.images.filter((img): img is string => typeof img === 'string');

        // Upload images if they are new files
        if (filesToUpload.length > 0) {
          urls = await uploadImages(filesToUpload as File[]);
        }

        // Combine uploaded URLs with existing URLs
        urls = [...urls, ...existingUrls];
      }

      const payload = {
        ...data,
        inventoryType: data.inStock ? 'in_stock' : 'out_of_stock',
        brandId: data.brandId ? Number(data.brandId) : null,
        images: urls,
      };

      updateProduct(payload, {
        onSuccess: () => {
          enqueueSnackbar('Cập nhật sản phẩm thành công!', {
            variant: 'success',
          });
          navigate(PATH_DASHBOARD.product.list);
        },
        onError: (error: any) => {
          enqueueSnackbar(error?.message || 'Đã có lỗi xảy ra!', { variant: 'error' });
        },
      });
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const images = values.images || [];

      setValue('images', [
        ...images,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [setValue, values.images]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file: File | string) => {
    const filteredItems = values.images && values.images?.filter((_file) => _file !== file);

    setValue('images', filteredItems);
  };

  const flattendCategories = flattenCategories(categoriesTree?.metadata || []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="name" label="Tên sản phẩm" />
                <RHFTextField
                  name="slug"
                  label="Slug"
                  InputLabelProps={{ shrink: true }}
                  disabled
                />
                <div>
                  <LabelStyle>Mô tả sản phẩm</LabelStyle>
                  <RHFEditor simple name="description" />
                </div>
                <div>
                  <LabelStyle>Hình ảnh</LabelStyle>
                  <RHFUploadMultiFile
                    showPreview
                    name="images"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    onUpload={() => console.log('ON UPLOAD')}
                  />
                </div>
              </Stack>
            </Card>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <LabelStyle>chi tiết sản phẩm</LabelStyle>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <RHFTextField name="weight" label="Cân nặng" type="number" />
                  <RHFTextField name="width" label="Chiều rộng" type="number" />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <RHFTextField name="height" label="Chiều cao" type="number" />
                  <RHFTextField name="length" label="Chiều dài" type="number" />
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <RHFSwitch name="inStock" label="Còn hàng" />
              <Stack spacing={3} mt={2}>
                <RHFTextField name="stock" label="Số lượng" type="number" />
                <RHFTextField name="minStock" label="Số lượng tối thiểu" type="number" />
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFSelect
                  name="brandId"
                  label="Thương hiệu"
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                >
                  <MenuItem value="">Chọn thương hiệu</MenuItem>
                  {listBrand?.metadata?.items?.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </MenuItem>
                  ))}
                </RHFSelect>
                <RHFSelect
                  name="status"
                  label="Trạng thái"
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                >
                  <MenuItem value="">Chọn trạng thái</MenuItem>
                  {STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
                <RHFSelect
                  name="flag"
                  label="Nhãn sản phẩm"
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                >
                  <MenuItem value="">Chọn nhãn sản phẩm</MenuItem>
                  {FLAG_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </RHFSelect>

                {/* Category select */}
                <RHFSelect
                  name="categories"
                  label="Danh mục"
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{
                    multiple: true,
                    renderValue: (selected) =>
                      flattendCategories
                        .filter((cat) => (selected as ICategoryForm['id'][]).includes(cat.id))
                        .map((cat) => cat.name)
                        .join(', '),
                  }}
                >
                  {flattendCategories.map((cat) => (
                    <MenuItem
                      key={cat.id}
                      value={cat.id}
                      sx={{ fontWeight: cat.depth === 0 ? 'bold' : 'normal', fontSize: 14 }}
                    >
                      {cat.name}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <RHFTextField
                  name="price"
                  label="Giá thường"
                  placeholder="0.00"
                  value={getValues('price') === 0 ? '' : getValues('price')}
                  onChange={(event) => setValue('price', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    type: 'number',
                  }}
                />

                <RHFTextField
                  name="priceSale"
                  label="Giá khuyến mãi"
                  placeholder="0.00"
                  value={getValues('priceSale') === 0 ? '' : getValues('priceSale')}
                  onChange={(event) => setValue('priceSale', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    type: 'number',
                  }}
                />
              </Stack>
            </Card>

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? 'Tạo sản phẩm' : 'Lưu thay đổi'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
