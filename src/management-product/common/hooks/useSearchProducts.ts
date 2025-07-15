import { useQuery } from 'react-query';
import { searchProducts } from '../service';

interface UseSearchProductsParams {
  query: string;
  limit?: number;
  enabled?: boolean;
}

export const useSearchProducts = ({ query, limit = 10, enabled = true }: UseSearchProductsParams) =>
  useQuery(
    ['SEARCH_PRODUCTS', query, limit],
    () => searchProducts(query, limit),
    {
      enabled: enabled && query.length >= 2, // Only search if query is at least 2 characters
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
    }
  );
