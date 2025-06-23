import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// hooks
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../../config';
// components
import LoadingScreen from '../components/LoadingScreen';
import { useSelector } from '../redux/store';
import { selectIsAuthenticated } from 'src/auth/login/auth.slice';

function RoleGuard({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: React.ReactNode;
}) {
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);
  const userRole = user?.role?.name;
  if (!isAuthenticated || !userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/permission-denied" replace />;
  }
  return <>{children}</>;
}

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isAuthenticated = useSelector(selectIsAuthenticated);

  console.log('is authenticated: ', isAuthenticated);

  const isDashboard = pathname.includes('/dashboard') && isAuthenticated;

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'new-password', element: <NewPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        { path: 'cart', element: <EcommerceCheckout /> },
        { path: 'account', element: <UserAccount /> },

        {
          path: 'product',
          children: [
            { element: <Navigate to="/dashboard/product/list" replace />, index: true },
            // Only admin can create or edit products
            {
              path: 'new',
              element: (
                <RoleGuard allowedRoles={['admin']}>
                  <ProductCreate />
                </RoleGuard>
              ),
            },
            {
              path: 'list',
              element: (
                <RoleGuard allowedRoles={['admin']}>
                  <ProductList />
                </RoleGuard>
              ),
            },
            // { path: ':name', element: <EcommerceProductDetails /> },
          ],
        },

        {
          path: 'brand',
          children: [
            { element: <Navigate to="/dashboard/brand/list" replace />, index: true },
            {
              path: 'new',
              element: (
                <RoleGuard allowedRoles={['admin']}>
                  <BrandCreate />
                </RoleGuard>
              ),
            },
            {
              path: 'list',
              element: (
                <RoleGuard allowedRoles={['admin']}>
                  <BrandList />
                </RoleGuard>
              ),
            },
            // { path: ':name', element: <BrandDetails /> },
          ],
        },

        {
          path: 'categories',
          children: [
            { element: <Navigate to="/dashboard/categories/list" replace />, index: true },
            // Only admin can create/reorder categories
            {
              path: 'list',
              element: (
                <RoleGuard allowedRoles={['admin']}>
                  <CategoryList />
                </RoleGuard>
              ),
            },
            {
              path: 'reorder',
              element: (
                <RoleGuard allowedRoles={['admin']}>
                  <ReorderCategories />
                </RoleGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <RoleGuard allowedRoles={['admin']}>
                  <CategoryNew />
                </RoleGuard>
              ),
            },
            // { path: ':name', element: <CategoryDetails /> },
          ],
        },

        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceList /> },
            { path: ':id', element: <InvoiceDetails /> },
            { path: ':id/edit', element: <InvoiceEdit /> },
            { path: 'new', element: <InvoiceCreate /> },
          ],
        },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'shop', element: <Shop /> },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
        { path: 'permission-denied', element: <PermissionDenied /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// CUSTOMER ROUTES
const HomePage = Loadable(lazy(() => import('../../home')));
const Shop = Loadable(lazy(() => import('../../shop')));

// ----------------------------------------------------------------------

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../../auth/login/Login')));
const Register = Loadable(lazy(() => import('../../auth/register')));
const VerifyCode = Loadable(lazy(() => import('../../auth/verify-email-code')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));

// DASHBOARD

// GENERAL
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));

// PRODUCT
const ProductCreate = Loadable(lazy(() => import('../../management-product/create')));
const ProductList = Loadable(lazy(() => import('../../management-product/list')));

// BRAND
const BrandCreate = Loadable(lazy(() => import('../../management-brand/create')));
const BrandList = Loadable(lazy(() => import('../../management-brand/list')));

// CATEGORY
const CategoryList = Loadable(lazy(() => import('../../management-categories/list')));
const ReorderCategories = Loadable(lazy(() => import('../../management-categories/reorder')));
const CategoryNew = Loadable(lazy(() => import('../../management-categories/create')));

// BILLING AND CHECKOUT
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));

// INVOICE
const InvoiceList = Loadable(lazy(() => import('../pages/dashboard/InvoiceList')));
const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
const InvoiceCreate = Loadable(lazy(() => import('../pages/dashboard/InvoiceCreate')));
const InvoiceEdit = Loadable(lazy(() => import('../pages/dashboard/InvoiceEdit')));

// USER
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));

// MAIN
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
const PermissionDenied = Loadable(lazy(() => import('../pages/dashboard/PermissionDenied')));
