import { useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Typography, Autocomplete, InputAdornment, Popper, PopperProps } from '@mui/material';
// hooks
import useIsMountedRef from '../../common/hooks/useIsMountedRef';
// utils
import axios from '../../common/utils/axios';
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
  width: '280px !important',
});

// ----------------------------------------------------------------------

export default function ShopProductSearch() {
  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();

  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState<IProductApiResponse[]>([]);

  const handleChangeSearch = async (value: string) => {
    try {
      setSearchQuery(value);
      if (value) {
        const response = await axios.get('/api/products/search', {
          params: { query: value },
        });

        if (isMountedRef.current) {
          setSearchResults(response.data.results);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (slug: string) => {
    navigate(PATH_CUSTOMER.eCommerce.view(paramCase(slug)));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchResults.length > 0) {
      handleClick(searchResults[0].slug);
    }
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={searchResults}
      onInputChange={(event, value) => handleChangeSearch(value)}
      getOptionLabel={(product: IProductApiResponse) => product.name}
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <InputStyle
          {...params}
          stretchStart={200}
          placeholder="Tìm kiếm sản phẩm..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={'eva:search-fill'}
                  sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, product, { inputValue }) => {
        const { name, thumbnail } = product;
        const matches = match(name, inputValue);
        const parts = parse(name, matches);

        return (
          <li {...props}>
            <Image
              alt={name}
              src={thumbnail ?? ''}
              sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }}
            />
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
          </li>
        );
      }}
    />
  );
}
