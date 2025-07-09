import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, OutlinedInput, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from 'src/common/routes/paths';
// components
import { FormProvider } from 'src/common/components/hook-form';
import { useVerifyEmailCode } from '../hooks/useVerifyEmailCode';
import { useDispatch, useSelector } from 'src/common/redux/store';
import { resetRegisterState } from 'src/auth/register/register.slice';

// ----------------------------------------------------------------------

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
};

type ValueNames = 'code1' | 'code2' | 'code3' | 'code4' | 'code5' | 'code6';

export default function VerifyCodeForm() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const email = useSelector((state) => state.register.email);

  const { mutate: verifyEmail } = useVerifyEmailCode();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
    code6: Yup.string().required('Code is required'),
  });

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  };

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  });

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  useEffect(() => {
    const handlePasteEvent = (event: ClipboardEvent) => {
      // Check if the target is one of our code input fields
      const target = event.target as HTMLElement;
      if (target && target.classList.contains('field-code')) {
        handlePaste(event);
      }
    };

    // Add paste event listener to document
    document.addEventListener('paste', handlePasteEvent);

    return () => {
      document.removeEventListener('paste', handlePasteEvent);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault();

    let data = event.clipboardData?.getData('text') || '';

    // Remove any non-digit characters and limit to 6 characters
    data = data.replace(/\D/g, '').slice(0, 6);

    if (data.length === 0) return;

    const dataArray = data.split('');

    // Clear all fields first
    Object.keys(values).forEach((_, index) => {
      const fieldIndex = `code${index + 1}` as ValueNames;
      setValue(fieldIndex, '');
    });

    // Fill fields with pasted data
    dataArray.forEach((char, index) => {
      if (index < 6) {
        const fieldIndex = `code${index + 1}` as ValueNames;
        setValue(fieldIndex, char);
      }
    });

    // Focus on the next empty field or the last field
    const nextEmptyIndex = Math.min(dataArray.length, 5);
    const nextField = document.querySelector(`input[name=code${nextEmptyIndex + 1}]`);
    if (nextField) {
      (nextField as HTMLElement).focus();
    }
  };

  const handleChangeWithNextField = (
    event: React.ChangeEvent<HTMLInputElement>,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    const { maxLength, value, name } = event.target;

    const fieldIndex = name.replace('code', '');
    const fieldIntIndex = Number(fieldIndex);

    // Only allow single digit
    const numericValue = value.replace(/\D/g, '').slice(0, 1);

    // Update the field with only numeric value
    if (value !== numericValue) {
      event.target.value = numericValue;
    }

    handleChange({ ...event, target: { ...event.target, value: numericValue } });

    // Move to next field if current field has value and not the last field
    if (numericValue.length === maxLength && fieldIntIndex < 6) {
      const nextfield = document.querySelector(`input[name=code${fieldIntIndex + 1}]`);
      if (nextfield !== null) {
        (nextfield as HTMLElement).focus();
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    const fieldIndex = name.replace('code', '');
    const fieldIntIndex = Number(fieldIndex);

    if (event.key === 'Backspace' && value === '' && fieldIntIndex > 1) {
      const prevField = document.querySelector(`input[name=code${fieldIntIndex - 1}]`);
      if (prevField !== null) {
        (prevField as HTMLElement).focus();
      }
    }
  };

  const onSubmit = async (data: FormValuesProps) => {
    verifyEmail(
      {
        email,
        code: Object.values(values).join(''),
      },
      {
        onSuccess: (response) => {
          enqueueSnackbar(response.message, { variant: 'success' });
          dispatch(resetRegisterState());
          navigate(PATH_AUTH.login, { replace: true });
        },
        onError: (error: any) => {
          enqueueSnackbar(error?.response?.data?.message || 'Đã xảy ra lỗi', { variant: 'error' });
        },
      }
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={2} justifyContent="center">
          {Object.keys(values).map((name, index) => (
            <Controller
              key={name}
              name={`code${index + 1}` as ValueNames}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <OutlinedInput
                  {...field}
                  error={!!error}
                  autoFocus={index === 0}
                  placeholder="-"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeWithNextField(event, field.onChange)
                  }
                  onKeyDown={handleKeyDown}
                  inputProps={{
                    className: 'field-code',
                    maxLength: 1,
                    sx: {
                      p: 0,
                      textAlign: 'center',
                      width: { xs: 36, sm: 56 },
                      height: { xs: 36, sm: 56 },
                    },
                  }}
                />
              )}
            />
          ))}
        </Stack>

        {(!!errors.code1 ||
          !!errors.code2 ||
          !!errors.code3 ||
          !!errors.code4 ||
          !!errors.code5 ||
          !!errors.code6) && (
          <FormHelperText error sx={{ px: 2 }}>
            Vui lòng nhập mã xác minh
          </FormHelperText>
        )}

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          Xác minh
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
