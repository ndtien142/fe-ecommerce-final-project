import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import {
  FormProvider,
  RHFEditor,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from 'src/common/components/hook-form';
import { default as useMessage } from 'src/common/hooks/useMessage';
import useUploadImage from 'src/common/hooks/useUploadImage';
import { styled } from '@mui/material/styles';
import { Card, Grid, Stack, Typography, MenuItem, Box } from '@mui/material';
import { fData } from 'src/common/utils/formatNumber';
import LoadingButton from '@mui/lab/LoadingButton';
import { ICategory } from 'src/common/@types/product/category.interface';
import { CustomFile } from 'src/common/components/upload';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateNewCategorySchema } from '../schema';
import { useGetCategoriesTree } from '../hooks/useGetCategoriesTree';
import { flattenCategories } from '../utils';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { useCreateNewCategory } from '../hooks/useCreateNewCategory';
import { slugify } from 'src/common/utils/common.util';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

type IFlattenedCategoryV2 = ICategory & { depth: number };

interface FormValuesProps extends Omit<ICategory, 'imageUrl' | 'parent' | 'children' | 'isActive'> {
  imageUrl: CustomFile | string | null;
  name: string;
  slug: string;
  description: string;
  status: 'active' | 'inactive';
  sortOrder: number;
  parentId?: string | null;
  isActive: boolean;
}

type Props = {
  isEdit: boolean;
  currentCategory?: ICategory;
};

const STATUS_OPTIONS = [
  { value: 'active', label: 'Hoạt động' },
  { value: 'inactive', label: 'Không hoạt động' },
];

// Add a simple slugify function

const FormNewEditCategory = ({ isEdit, currentCategory }: Props) => {
  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();

  const [categoryList, setCategoryList] = React.useState<IFlattenedCategoryV2[]>([]);

  const navigate = useNavigate();

  const { uploadImage } = useUploadImage();

  const { mutate } = useCreateNewCategory();

  const { data } = useGetCategoriesTree();

  const defaultValues: FormValuesProps = useMemo(
    () => ({
      id: currentCategory?.id || '',
      name: currentCategory?.name || '',
      slug: currentCategory?.slug || '',
      description: currentCategory?.description || '',
      imageUrl: currentCategory?.imageUrl || null,
      status: currentCategory?.status || 'active',
      sortOrder: currentCategory?.sortOrder || 0,
      parentId: currentCategory?.parentId || null,
      isActive: currentCategory?.status === 'inactive' ? false : true,
    }),
    [currentCategory]
  );

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CreateNewCategorySchema),
    defaultValues,
  });

  useEffect(() => {
    const flatList = flattenCategories(data?.metadata || []).map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      description: cat.description ?? '',
      slug: cat.slug ?? '',
      sortOrder: cat.sortOrder ?? 0,
      status: cat.status ?? 'active',
      imageUrl: cat.imageUrl ?? null,
      parentId: cat.parentId ?? null,
      children: cat.children ?? [],
      depth: cat.depth ?? 0,
    }));
    setCategoryList(flatList);
  }, [data]);

  const {
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { isSubmitting },
  } = methods;

  // Watch name and update slug
  const nameValue = watch('name');
  React.useEffect(() => {
    setValue('slug', slugify(nameValue || ''));
  }, [nameValue, setValue]);

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'imageUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  useEffect(() => {
    if (isEdit && currentCategory) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCategory]);

  const onSubmit = async (data: FormValuesProps) => {
    console.log('Form data:', data);
    let updatedImageUrl = data.imageUrl;
    if (data.imageUrl instanceof File) {
      updatedImageUrl = await uploadImage(data.imageUrl);
    } else {
      updatedImageUrl = data.imageUrl;
    }

    mutate(
      { ...data, imageUrl: updatedImageUrl, status: data.isActive ? 'active' : 'inactive' },
      {
        onSuccess: () => {
          showSuccessSnackbar('Danh mục đã được tạo thành công');
          navigate(PATH_DASHBOARD.categories.root);
        },
        onError: (error: any) => {
          showErrorSnackbar(error?.response?.data?.message || 'Đã xảy ra lỗi khi tạo danh mục');
        },
      }
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 2, px: 3 }}>
            <LabelStyle>Hình ảnh danh mục</LabelStyle>

            <Box sx={{ mb: 5, pt: 5 }}>
              <RHFUploadAvatar
                name="imageUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={2}>
              <Stack spacing={2}>
                <RHFTextField name="name" label="Tên danh mục" />
                <RHFSelect
                  name="parentId"
                  label="Danh mục cha"
                  placeholder="Danh mục cha"
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                >
                  <MenuItem key={0} value={0}>
                    {'Không có danh mục cha'}
                  </MenuItem>
                  {categoryList.map((cat) => (
                    <MenuItem
                      key={cat.id}
                      value={cat.id}
                      sx={{
                        // pl: `${cat.depth * 2 + 2}px`,
                        fontWeight: cat.depth === 0 ? 'bold' : 'normal',
                        fontSize: 14,
                      }}
                    >
                      {cat.name}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Stack>
              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} alignItems="center">
                <Box sx={{ flexGrow: 1, minWidth: 200 }}>
                  <RHFSwitch name="isActive" label="Trạng thái" />
                </Box>
                <RHFTextField name="slug" label="Slug" disabled />
              </Stack>
              <Stack spacing={1}>
                <LabelStyle>Mô tả danh mục</LabelStyle>
                <RHFEditor name="description" />
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {!isEdit ? 'Tạo danh mục mới' : 'Lưu thay đổi'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default FormNewEditCategory;
