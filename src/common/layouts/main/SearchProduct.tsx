import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  Typography,
  InputAdornment,
  IconButton,
  Autocomplete,
  Popper,
  PopperProps,
  Link,
} from '@mui/material';
// hooks
import { useDebounce } from '../../hooks/useDebounce';
// components
import InputStyle from '../../components/InputStyle';
import Iconify from '../../components/Iconify';
import Label from '../../components/Label';
import Image from '../../components/Image';
import SearchNotFound from '../../components/SearchNotFound';
// utils
import { fCurrency } from '../../utils/formatNumber';
// services
import { searchProducts } from 'src/management-product/common/service';
// types
import { IProductApiResponse } from 'src/common/@types/product/product.interface';

// ----------------------------------------------------------------------

const PopperStyle = styled((props: PopperProps) => <Popper placement="bottom-start" {...props} />)({
  width: '100% !important',
  maxWidth: '500px !important',
  maxHeight: '400px',
  overflow: 'auto',
});

// ----------------------------------------------------------------------

interface SearchProductProps {
  onAddToCart?: (productId: number) => void;
}

export default function SearchProduct({ onAddToCart }: SearchProductProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<IProductApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await searchProducts(query, 8);
      const responseData = response.data || response;

      if (responseData && responseData.metadata && responseData.metadata.items) {
        setSearchResults(responseData.metadata.items || []);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search when debounced query changes
  useEffect(() => {
    if (debouncedSearchQuery.length >= 2) {
      handleSearch(debouncedSearchQuery);
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  }, [debouncedSearchQuery, handleSearch]);

  // Handle search input change
  const handleChangeSearch = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  // Handle product click
  const handleClick = (slug: string) => {
    navigate(`/product/${slug}`);
    setSearchQuery('');
  };

  // Handle key press
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (searchResults.length > 0) {
        handleClick(searchResults[0].slug);
      } else if (searchQuery.trim()) {
        navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
        setSearchQuery('');
      }
    }
  };

  // Handle add to cart
  const handleAddToCart = (productId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (onAddToCart) {
      onAddToCart(productId);
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
          debouncedSearchQuery.length >= 2 ? (
            <SearchNotFound searchQuery={debouncedSearchQuery} />
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
              Nhập ít nhất 2 ký tự để tìm kiếm
            </Typography>
          )
        }
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <InputStyle
            {...params}
            placeholder="Tìm kiếm sản phẩm..."
            onKeyUp={handleKeyUp}
            sx={{
              width: { xs: 300, md: 400, lg: 500 },
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon={isLoading ? 'eva:loader-outline' : 'eva:search-fill'}
                    sx={{
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
                      setSearchResults([]);
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
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                <Image
                  alt={name}
                  src={thumbnail || ''}
                  sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Link
                    underline="none"
                    onClick={() => handleClick(product.slug)}
                    sx={{ cursor: 'pointer' }}
                  >
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
                    {priceSale && Number(priceSale) < Number(price) ? (
                      <>
                        <Typography variant="body2" color="error.main" sx={{ fontWeight: 'bold' }}>
                          {fCurrency(Number(priceSale))}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textDecoration: 'line-through', fontSize: '0.75rem' }}
                        >
                          {fCurrency(Number(price))}
                        </Typography>
                        <Label color="error" sx={{ fontSize: '0.75rem' }}>
                          -{Math.round(((Number(price) - Number(priceSale)) / Number(price)) * 100)}
                          %
                        </Label>
                      </>
                    ) : (
                      <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold' }}>
                        {fCurrency(Number(price))}
                      </Typography>
                    )}
                  </Stack>
                </Box>
                {/* <IconButton
                  size="small"
                  color="primary"
                  onClick={(event) => handleAddToCart(product.id, event)}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    ml: 1,
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  <Iconify icon="eva:plus-fill" width={16} height={16} />
                </IconButton> */}
              </Box>
            </li>
          );
        }}
      />
    </Box>
  );
}
