import { useLocation } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { HEADER, PATH_AFTER_LOGIN } from '../../../config';
// components
import Logo from '../../components/Logo';
import Label from '../../components/Label';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import SearchProduct from './SearchProduct';
import { useEffect, useState } from 'react';
import { useGetCategoriesTree } from 'src/management-categories/common/hooks/useGetCategoriesTree';
import Iconify from 'src/common/components/Iconify';
import { ICategory } from 'src/common/@types/product/category.interface';
import { PATH_AUTH } from 'src/common/routes/paths';
import { useSelector } from 'src/common/redux/store';
import AccountPopover from '../dashboard/header/AccountPopover';

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const theme = useTheme();

  const { pathname } = useLocation();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Helper to check role
  const isAdmin = user?.role?.name === 'admin';

  const isDesktop = useResponsive('up', 'md');

  const isHome = pathname === '/';

  const { data } = useGetCategoriesTree();

  const [menuData, setMenuData] = useState<any[]>([]);

  // Update menuData when data changes
  useEffect(() => {
    console.log('Fetched categories:', data);
    if (data && data.metadata) {
      console.log('Mapping categories to menu data...');
      setMenuData([
        {
          title: 'Trang chủ',
          path: '/',
          icon: <Iconify icon={'eva:home-fill'} />,
        },
        {
          title: 'Danh mục sản phẩm',
          path: '/categories',
          icon: <Iconify icon={'eva:pricetags-fill'} />,
          children: mapCategoriesToMenu(data.metadata),
        },
      ]);
    }
  }, [data]);

  // Helper to transform API response to menu format
  function mapCategoriesToMenu(metadata: ICategory[]): any[] {
    return metadata.map((category) => {
      const items = (category.children || []).map((child: ICategory) => ({
        title: child.name,
        path: `shop?category=${child.slug}`,
      }));
      return {
        subheader: category.name,
        items,
      };
    });
  }

  // Handle add to cart from search
  const handleAddToCart = (productId: number) => {
    // TODO: Implement add to cart logic
    console.log('Add to cart:', productId);
    // You can dispatch to cart slice or call API here
  };

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Box sx={{ minWidth: 'auto' }}>
            <Logo />
          </Box>

          {/* Search - Always show on desktop */}
          {isDesktop && (
            <Box sx={{ flexGrow: 1, mx: 3, display: 'flex', justifyContent: 'center' }}>
              <SearchProduct onAddToCart={handleAddToCart} />
            </Box>
          )}

          {/* Menu & User Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isDesktop && <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={menuData} />}

            {/* Show user info and popover only if authenticated */}
            {isAuthenticated && user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {/* Show username */}
                <span style={{ marginLeft: 8, color: 'black' }}>{user.username}</span>
                {/* Show admin badge if admin */}
                {isAdmin && (
                  <Label color="primary" sx={{ ml: 1 }}>
                    Admin
                  </Label>
                )}
                <AccountPopover />
              </Box>
            ) : (
              <Button variant="contained" target="_blank" rel="noopener" href={PATH_AUTH.login}>
                Đăng nhập / Đăng ký ngay
              </Button>
            )}
          </Box>

          {/* Mobile Menu */}
          {!isDesktop && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SearchProduct onAddToCart={handleAddToCart} />
              <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={menuData} />
            </Box>
          )}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
