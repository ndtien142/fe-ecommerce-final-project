import { useLocation } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Link } from '@mui/material';
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
  const isCustomer = user?.role?.name === 'customer';

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
          children: mapCategoriesToMenu(data.metadata).concat({
            subheader: 'Trang quản trị',
            items: [{ title: 'Trang quản trị', path: PATH_AFTER_LOGIN }],
          }),
        },
      ]);
    }
  }, [data]);

  // Helper to transform API response to menu format
  function mapCategoriesToMenu(metadata: ICategory[]): any[] {
    return metadata.map((category) => {
      const items = (category.children || []).map((child: ICategory) => ({
        title: child.name,
        path: `/category/${child.slug}`,
      }));
      console.log('Category:', category.name, 'Items:', items);
      return {
        subheader: category.name,
        items,
      };
    });
  }

  console.log('Menu Data:', menuData);

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
          <Logo />

          <Link
            href="https://docs-minimals.vercel.app/changelog"
            target="_blank"
            rel="noopener"
            underline="none"
          >
            <Label color="info" sx={{ ml: 1 }}>
              v3.5.0
            </Label>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

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

          {!isDesktop && <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={menuData} />}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
