import { ReactElement } from 'react-markdown/lib/react-markdown';

export interface PaginationMeta {
  currentPage: number;
  itemPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface ISimpleParams {
  page?: number;
  limit?: number;
}

export type ICallbackFunction = {
  onSuccess: VoidFunction;
  onError: (message: string) => void;
};

export interface IHeaderBreadcrumbProps {
  heading: string;
  breadcrumb: IHeaderBreadcrumb[];
}

export type IHeaderBreadcrumb = {
  href?: string;
  name: string;
  icon?: ReactElement;
};

export interface ICallbackMutation {
  onSuccess: () => void;
  onError: () => void;
}
