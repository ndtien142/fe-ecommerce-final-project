import * as Yup from 'yup';
import { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Card,
  Stack,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Grid,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, RHFTextField, RHFEditor } from 'src/common/components/hook-form';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import axiosInstance from 'src/common/utils/axios';
import useMessage from 'src/common/hooks/useMessage';
import { IPermission } from 'src/common/@types/user/permission.interface';
import { useGetAllPermission } from 'src/common/hooks/useGetListPermission';

type IRoleForm = {
  name: string;
  description: string;
  permissions: IPermission[];
};

type Props = {
  isEdit?: boolean;
  currentRole?: {
    id: string;
    name: string;
    description: string;
    permissions: IPermission[];
  };
};

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function NewEditFormRole({ isEdit, currentRole }: Props) {
  const navigate = useNavigate();
  const { showErrorSnackbar, showSuccessSnackbar } = useMessage();
  const [loading, setLoading] = useState(false);

  // Fetch all permissions from API
  const { data, isLoading } = useGetAllPermission({
    page: 1,
    limit: 100,
  });

  // Extract permission list from API response
  const permissionOptions: IPermission[] = data?.metadata?.metadata || [];

  const RoleSchema = Yup.object().shape({
    name: Yup.string().required('Tên vai trò là bắt buộc'),
    description: Yup.string(),
    permissions: Yup.array().of(Yup.object()).min(1, 'Chọn ít nhất 1 quyền'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentRole?.name || '',
      description: currentRole?.description || '',
      permissions: currentRole?.permissions || [],
    }),
    [currentRole]
  );

  const methods = useForm<IRoleForm>({
    resolver: yupResolver(RoleSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentRole]);

  const onSubmit = async (data: IRoleForm) => {
    setLoading(true);
    try {
      // Convert permissions to array of slugs for API
      const payload = {
        ...data,
        permissions: data.permissions.map((p) => (typeof p === 'string' ? p : p.slug)),
      };
      if (isEdit && currentRole?.id) {
        await axiosInstance.put(`/api/roles/${currentRole.id}`, payload);
        showSuccessSnackbar('Cập nhật vai trò thành công!');
      } else {
        await axiosInstance.post('/api/roles', payload);
        showSuccessSnackbar('Tạo vai trò thành công!');
      }
      navigate(PATH_DASHBOARD.role.list);
    } catch (error) {
      showErrorSnackbar('Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  // Helper to check if a permission is selected
  const isChecked = (selected: IPermission[], perm: IPermission) =>
    selected.some((p) => (typeof p === 'string' ? p === perm.slug : p.slug === perm.slug));

  return (
    <FormProvider methods={methods}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <LabelStyle>Tên vai trò</LabelStyle>
            <RHFTextField name="name" label="Tên vai trò" />
          </Stack>
          <Stack spacing={1}>
            <LabelStyle>Mô tả</LabelStyle>
            <RHFEditor name="description" />
          </Stack>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Quyền
            </Typography>
            {isLoading ? (
              <CircularProgress size={24} />
            ) : (
              <Controller
                name="permissions"
                control={control}
                render={({ field }) => (
                  <Grid container spacing={1}>
                    {permissionOptions.map((perm) => (
                      <Grid item xs={12} sm={6} md={4} lg={4} key={perm.slug}>
                        <Tooltip title={perm.description || ''} arrow placement="top-start">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isChecked(field.value, perm)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    field.onChange([...field.value, perm]);
                                  } else {
                                    field.onChange(
                                      field.value.filter(
                                        (p: IPermission) =>
                                          (typeof p === 'string' ? p : p.slug) !== perm.slug
                                      )
                                    );
                                  }
                                }}
                              />
                            }
                            label={perm.name}
                          />
                        </Tooltip>
                      </Grid>
                    ))}
                  </Grid>
                )}
              />
            )}
          </Box>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              disabled={loading || isSubmitting}
              onClick={handleSubmit(onSubmit)}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {isEdit ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </Stack>
        </Stack>
      </Card>
    </FormProvider>
  );
}
