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
        {
          path: 'app',
          element: (
            <RoleGuard allowedRoles={['admin']}>
              <WorkflowDashboard />
            </RoleGuard>
          ),
        },
        // {
        //   path: 'workflow-dashboard',
        //   element: (
        //     <RoleGuard allowedRoles={['admin']}>
        //       <WorkflowDashboard />
        //     </RoleGuard>
        //   ),
        // },
        { path: 'cart', element: <EcommerceCheckout /> },
        { path: 'account', element: <UserAccount /> },

        {
          path: 'orders',
          children: [
            { element: <Navigate to="/dashboard/orders/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <RoleGuard allowedRoles={['customer']}>
                  <ListOrder />
                </RoleGuard>
              ),
            },
            {
              path: ':id',
              element: (
                <RoleGuard allowedRoles={['customer']}>
                  <OrderDetails />
                </RoleGuard>
              ),
            },
          ],
        },

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
            {
              path: ':slug/edit',
              element: (
                <RoleGuard allowedRoles={['admin']}>
                  <ProductEdit />
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
          path: 'coupon',
          children: [
            { element: <Navigate to="/dashboard/coupon/list" replace />, index: true },
            {
              path: 'new',
              element: (
                <RoleGuard allowedRoles={['admin']}>
                  <CouponCreate />
                </RoleGuard>
              ),
            },
            {
              path: 'list',
              element: (
                <RoleGuard allowedRoles={['admin']}>
                  <CouponList />
                </RoleGuard>
              ),
            },
            {
              path: ':id/edit',
              element: (
                <RoleGuard allowedRoles={['admin']}>
                  <CouponEdit />
                </RoleGuard>
              ),
            },
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
              path: ':id/edit',
              element: (
                <RoleGuard allowedRoles={['admin']}>
                  <CategoryEdit />
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
          ],
        },

        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'account', element: <UserAccount /> },

            {
              path: 'list',
              element: (
                <RoleGuard allowedRoles={['admin']}>
                  <UserList />
                </RoleGuard>
              ),
            },
            {
              path: 'new',
              element: (
                <RoleGuard allowedRoles={['admin']}>
                  <UserCreate />
                </RoleGuard>
              ),
            },
            {
              path: ':name/edit',
              element: (
                <RoleGuard allowedRoles={['admin']}>
                  <UserCreate />
                </RoleGuard>
              ),
            },
          ],
        },
        {
          path: 'management-order',
          children: [
            { element: <Navigate to="/dashboard/management-order/list" replace />, index: true },
            {
              path: 'list',
              element: (
                <RoleGuard allowedRoles={['admin']}>
                  <ManagementOrderList />
                </RoleGuard>
              ),
            },
            {
              path: ':id',
              element: (
                <RoleGuard allowedRoles={['admin']}>
                  <ManagementOrderDetails />
                </RoleGuard>
              ),
            },
            // { path: ':id/edit', element: <OrderEdit /> },
            // { path: 'new', element: <OrderCreate /> },
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
        { path: 'payment/return', element: <PaymentReturn /> },
        { path: 'payment/success', element: <PaymentReturn /> },
        { path: 'payment/failed', element: <PaymentReturn /> },
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
        { path: 'coupons', element: <CouponPage /> },

        { path: 'product/:slug', element: <ProductDetails /> },
        {
          path: 'checkout',
          element: (
            <RoleGuard allowedRoles={['customer']}>
              <EcommerceCheckout />
            </RoleGuard>
          ),
        },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
        { path: 'policy', element: <Policy /> },
        { path: 'permission-denied', element: <PermissionDenied /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// CUSTOMER ROUTES
const HomePage = Loadable(lazy(() => import('../../home')));
const Shop = Loadable(lazy(() => import('../../shop')));
const CouponPage = Loadable(lazy(() => import('../../coupon')));

// ----------------------------------------------------------------------

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../../auth/login/Login')));
const Register = Loadable(lazy(() => import('../../auth/register')));
const VerifyCode = Loadable(lazy(() => import('../../auth/verify-email-code')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));

// DASHBOARD

// WORKFLOW DASHBOARD
const WorkflowDashboard = Loadable(lazy(() => import('../../management/workflow-dashboard')));

// PRODUCT
const ProductCreate = Loadable(lazy(() => import('../../management-product/create')));
const ProductList = Loadable(lazy(() => import('../../management-product/list')));
const ProductEdit = Loadable(lazy(() => import('../../management-product/edit')));

// PRODUCT USER
const ProductDetails = Loadable(lazy(() => import('../../detail-product')));

// ORDER USER
const ListOrder = Loadable(lazy(() => import('../../order/list')));
const OrderDetails = Loadable(lazy(() => import('../../order/detail')));

// BRAND
const BrandCreate = Loadable(lazy(() => import('../../management-brand/create')));
const BrandList = Loadable(lazy(() => import('../../management-brand/list')));

// COUPON
const CouponCreate = Loadable(lazy(() => import('../../management-coupon/create')));
const CouponList = Loadable(lazy(() => import('../../management-coupon/list')));
const CouponEdit = Loadable(lazy(() => import('../../management-coupon/edit')));

// CATEGORY
const CategoryList = Loadable(lazy(() => import('../../management-categories/list')));
const ReorderCategories = Loadable(lazy(() => import('../../management-categories/reorder')));
const CategoryNew = Loadable(lazy(() => import('../../management-categories/create')));
const CategoryEdit = Loadable(lazy(() => import('../../management-categories/edit')));

// BILLING AND CHECKOUT
const EcommerceCheckout = Loadable(lazy(() => import('../../checkout')));

// Management Order
const ManagementOrderList = Loadable(lazy(() => import('../../management-order/list')));
const ManagementOrderDetails = Loadable(lazy(() => import('../../management-order/detail')));

// USER
const UserAccount = Loadable(lazy(() => import('../../account')));

// MANAGEMENT USER
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));

// MAIN
const About = Loadable(lazy(() => import('../../marketing/pages/About')));
const Contact = Loadable(lazy(() => import('../../marketing/pages/Contact')));
const Faqs = Loadable(lazy(() => import('../../marketing/pages/Faqs')));
const Policy = Loadable(lazy(() => import('../../marketing/pages/Policy')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const PaymentReturn = Loadable(lazy(() => import('../pages/PaymentReturn')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
const PermissionDenied = Loadable(lazy(() => import('../pages/dashboard/PermissionDenied')));
