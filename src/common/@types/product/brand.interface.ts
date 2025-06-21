import { CustomFile } from 'src/common/components/upload';

export interface BrandFormValues {
  name: string;
  description: string;
  logoUrl: File | null;
  status: string;
}

export interface BrandFormValuesProps extends Omit<BrandFormValues, 'logoUrl'> {
  logoUrl: CustomFile | string | null;
}
