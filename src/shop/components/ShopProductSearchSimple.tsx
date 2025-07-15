import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
// @mui
import { InputAdornment, IconButton } from '@mui/material';
// hooks
import { useDebounce } from '../../common/hooks/useDebounce';
// components
import InputStyle from '../../common/components/InputStyle';
import Iconify from '../../common/components/Iconify';

// ----------------------------------------------------------------------

export default function ShopProductSearchSimple() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Sync search input with URL parameter (but not when clearing)
  useEffect(() => {
    if (!isClearing) {
      const urlSearchQuery = searchParams.get('search') || '';
      setSearchQuery(urlSearchQuery);
    }
  }, [searchParams, isClearing]);

  // Auto-update URL when debounced search query changes
  useEffect(() => {
    if (!isClearing) {
      if (debouncedSearchQuery.length >= 2) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('search', debouncedSearchQuery);
        newSearchParams.delete('page'); // Reset page when searching
        setSearchParams(newSearchParams);
      } else if (debouncedSearchQuery.length === 0) {
        // Always clear search from URL when search is empty
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete('search');
        setSearchParams(newSearchParams);
      }
    }
  }, [debouncedSearchQuery, searchParams, setSearchParams, isClearing]);

  // Search with debounce
  const handleChangeSearch = useCallback((value: string) => {
    setSearchQuery(value);

    // If user manually cleared the input, set clearing flag temporarily
    if (value.length === 0) {
      setIsClearing(true);
      setTimeout(() => {
        setIsClearing(false);
      }, 600); // Longer than debounce delay
    }

    if (value.length >= 2) {
      setIsLoading(true);
      // Stop loading after debounce delay
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Handle key press
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchQuery.trim()) {
      // Force immediate search on Enter
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('search', searchQuery.trim());
      newSearchParams.delete('page');
      setSearchParams(newSearchParams);
    }
  }; // Clear search - reset immediately without waiting for debounce
  const handleClearSearch = () => {
    setIsClearing(true);
    setSearchQuery('');
    setIsLoading(false);

    // Clear search from URL immediately
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('search');
    setSearchParams(newSearchParams);

    // Reset clearing flag after a longer delay to ensure sync doesn't interfere
    setTimeout(() => {
      setIsClearing(false);
    }, 600); // Longer than debounce delay
  };

  return (
    <InputStyle
      size="small"
      stretchStart={250}
      placeholder="Tìm kiếm sản phẩm..."
      value={searchQuery}
      onChange={(e) => handleChangeSearch(e.target.value)}
      onKeyUp={handleKeyUp}
      InputProps={{
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
                }),
              }}
            />
          </InputAdornment>
        ),
        endAdornment: searchQuery && (
          <InputAdornment position="end">
            <IconButton size="small" onClick={handleClearSearch}>
              <Iconify icon="eva:close-fill" width={16} height={16} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
