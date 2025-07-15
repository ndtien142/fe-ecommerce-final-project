import { useState, useEffect, useCallback } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useNavigate, useSearchParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {
  Link,
  Typography,
  Autocomplete,
  InputAdornment,
  Popper,
  PopperProps,
  Box,
  Stack,
  Chip,
  IconButton,
} from '@mui/material';
// hooks
import { useSearchProducts } from '../../management-product/common/hooks/useSearchProducts';
import { useDebounce } from '../../common/hooks/useDebounce';
// routes
import { PATH_CUSTOMER } from '../../common/routes/paths';
// @types
import { IProductApiResponse } from '../../common/@types/product/product.interface';
// components
import Image from '../../common/components/Image';
import Iconify from '../../common/components/Iconify';
import InputStyle from '../../common/components/InputStyle';
import SearchNotFound from '../../common/components/SearchNotFound';

// ----------------------------------------------------------------------

const PopperStyle = styled((props: PopperProps) => <Popper placement="bottom-start" {...props} />)({
  width: '400px !important',
  maxHeight: '400px',
  overflow: 'auto',
});

// ----------------------------------------------------------------------

interface SearchHistory {
  id: string;
  query: string;
  timestamp: number;
}

export default function ShopProductSearch() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Use the new search hook with debouncing
  const { data: searchData, isLoading } = useSearchProducts({
    query: debouncedSearchQuery,
    limit: 10,
    enabled: debouncedSearchQuery.length >= 2,
  });

  const searchResults: IProductApiResponse[] = searchData?.data?.metadata?.items || [];

  // Auto-update URL when debounced search query changes
  useEffect(() => {
    if (debouncedSearchQuery.length >= 2) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('search', debouncedSearchQuery);
      newSearchParams.delete('page'); // Reset page when searching
      setSearchParams(newSearchParams);
    } else if (debouncedSearchQuery.length === 0) {
      // Always clear search from URL when input is empty to reset to original list
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('search');
      newSearchParams.delete('page'); // Also reset page
      setSearchParams(newSearchParams);
    }
  }, [debouncedSearchQuery, searchParams, setSearchParams]);

  // Sync search input with URL parameter
  useEffect(() => {
    const urlSearchQuery = searchParams.get('search') || '';
    setSearchQuery(urlSearchQuery);
  }, [searchParams]);

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save to history when debounced search query changes
  useEffect(() => {
    if (debouncedSearchQuery.trim() && debouncedSearchQuery.length >= 2) {
      const newHistory: SearchHistory = {
        id: Date.now().toString(),
        query: debouncedSearchQuery.trim(),
        timestamp: Date.now(),
      };

      const updatedHistory = [
        newHistory,
        ...searchHistory.filter((h) => h.query !== debouncedSearchQuery.trim()),
      ].slice(0, 10); // Keep only last 10 searches

      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }
  }, [debouncedSearchQuery, searchHistory]);

  // Search with debounce
  const handleChangeSearch = useCallback((value: string) => {
    setSearchQuery(value);
    setShowHistory(value.length === 0);
  }, []);

  // Handle search submit (when user presses Enter or clicks result)
  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      setShowHistory(false);
      // Force immediate update if not already updated
      if (query !== debouncedSearchQuery) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('search', query.trim());
        newSearchParams.delete('page');
        setSearchParams(newSearchParams);
      }
    }
  };

  // Handle product click
  const handleClick = (slug: string) => {
    navigate(PATH_CUSTOMER.eCommerce.view(paramCase(slug)));
    setShowHistory(false);
  };

  // Handle key press
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (searchResults.length > 0) {
        handleClick(searchResults[0].slug);
      } else {
        handleSearchSubmit(searchQuery);
      }
    }
  };

  // Handle history click
  const handleHistoryClick = (query: string) => {
    setSearchQuery(query);
    handleSearchSubmit(query);
  };

  // Clear search history
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (searchQuery.length === 0) {
      setShowHistory(true);
    }
  };

  // Handle input blur - don't hide if there are search results
  const handleInputBlur = () => {
    // Only hide history if no search query, keep dropdown open if there are results
    if (searchQuery.length === 0) {
      setTimeout(() => {
        setShowHistory(false);
      }, 200);
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Autocomplete
        size="small"
        autoHighlight
        popupIcon={null}
        PopperComponent={PopperStyle}
        options={searchResults}
        loading={isLoading}
        inputValue={searchQuery}
        onInputChange={(event, value) => handleChangeSearch(value)}
        getOptionLabel={(product: IProductApiResponse) => product.name}
        noOptionsText={
          showHistory && searchHistory.length > 0 ? (
            <Box>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Lịch sử tìm kiếm
                </Typography>
                <IconButton size="small" onClick={clearHistory}>
                  <Iconify icon="eva:close-fill" width={16} height={16} />
                </IconButton>
              </Stack>
              <Stack spacing={0.5}>
                {searchHistory.map((item) => (
                  <Box
                    key={item.id}
                    onClick={() => handleHistoryClick(item.query)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      py: 0.5,
                      px: 1,
                      borderRadius: 1,
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <Iconify icon="eva:clock-outline" width={16} height={16} sx={{ mr: 1 }} />
                    <Typography variant="body2">{item.query}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          ) : (
            <SearchNotFound searchQuery={searchQuery} />
          )
        }
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <InputStyle
            {...params}
            stretchStart={250}
            placeholder="Tìm kiếm sản phẩm..."
            onKeyUp={handleKeyUp}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon={isLoading ? 'eva:loader-outline' : 'eva:search-fill'}
                    sx={{
                      ml: 1,
                      width: 20,
                      height: 20,
                      color: 'text.disabled',
                      ...(isLoading && {
                        animation: 'spin 1s linear infinite',
                        '@keyframes spin': {
                          '0%': { transform: 'rotate(0deg)' },
                          '100%': { transform: 'rotate(360deg)' },
                        },
                      }),
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSearchQuery('');
                      const newSearchParams = new URLSearchParams(searchParams);
                      newSearchParams.delete('search');
                      setSearchParams(newSearchParams);
                    }}
                  >
                    <Iconify icon="eva:close-fill" width={16} height={16} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={(props, product, { inputValue }) => {
          const { name, thumbnail, price, priceSale } = product;
          const matches = match(name, inputValue);
          const parts = parse(name, matches);

          return (
            <li {...props}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Image
                  alt={name}
                  src={thumbnail ?? ''}
                  sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Link underline="none" onClick={() => handleClick(product.slug)}>
                    {parts.map((part, index) => (
                      <Typography
                        key={index}
                        component="span"
                        variant="subtitle2"
                        color={part.highlight ? 'primary' : 'textPrimary'}
                      >
                        {part.text}
                      </Typography>
                    ))}
                  </Link>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
                    {priceSale && (
                      <Typography variant="body2" color="error.main" sx={{ fontWeight: 'bold' }}>
                        ${priceSale}
                      </Typography>
                    )}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        ...(priceSale && {
                          textDecoration: 'line-through',
                          fontSize: '0.75rem',
                        }),
                      }}
                    >
                      ${price}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </li>
          );
        }}
      />

      {/* Quick search suggestions */}
      {searchQuery.length === 0 && (
        <Box sx={{ mt: 1 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {['Áo thun', 'Quần jeans', 'Giày thể thao', 'Túi xách'].map((suggestion) => (
              <Chip
                key={suggestion}
                label={suggestion}
                variant="outlined"
                size="small"
                onClick={() => handleChangeSearch(suggestion)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
