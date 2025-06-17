import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
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
import DepartmentList from 'src/management-department/list/DepartmentList';
import DepartmentCreate from 'src/management-department/create';
import LiquidationReceiptList from 'src/liquidation-receipt/list';
import LiquidationReceiptCreate from 'src/liquidation-receipt/create';
import RepairReceiptCreate from 'src/repair-receipt/create';
import RepairReceiptList from 'src/repair-receipt/list';

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
        {
          path: 'group-equipment',
          children: [
            { element: <Navigate to="/dashboard/group-equipment/list" replace />, index: true },
            { path: 'list', element: <GroupEquipmentList /> },
            { path: 'new', element: <GroupEquipmentCreate /> },
            { path: ':id', element: <EquipmentViewPage /> },
            { path: ':id/:serialNumber', element: <EquipmentDetailSerial /> },
          ],
        },
        {
          path: 'borrow-receipt',
          children: [
            { element: <Navigate to="/dashboard/borrow-receipt/list" replace />, index: true },
            { path: 'list', element: <BorrowReceiptList /> },
            { path: 'new', element: <BorrowReceiptCreate /> },
            { path: ':id', element: <BorrowReceiptDetails /> },
            { path: ':id/scan', element: <BorrowReceiptScanSerialNumber /> },
          ],
        },
        {
          path: 'transfer-receipt',
          children: [
            { element: <Navigate to="/dashboard/transfer-receipt/list" replace />, index: true },
            { path: 'list', element: <TransferReceiptList /> },
            { path: ':id', element: <TransferReceiptDetails /> },
            { path: 'new', element: <TransferReceiptCreate /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            // { path: 'profile', element: <UserProfile /> },
            // { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
            // { path: 'account', element: <UserAccount /> },
          ],
        },

        {
          path: 'liquidation-receipt',
          children: [
            { element: <Navigate to="/dashboard/liquidation-receipt/list" replace />, index: true },
            { path: 'list', element: <LiquidationReceiptList /> },
            { path: 'new', element: <LiquidationReceiptCreate /> },
          ],
        },

        {
          path: 'repair-receipt',
          children: [
            { element: <Navigate to="/dashboard/repair-receipt/list" replace />, index: true },
            { path: 'list', element: <RepairReceiptList /> },
            { path: 'new', element: <RepairReceiptCreate /> },
          ],
        },

        {
          path: 'department',
          children: [
            { element: <Navigate to="/dashboard/department/profile" replace />, index: true },
            // { path: 'profile', element: <UserProfile /> },
            // { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <DepartmentList /> },
            { path: 'new', element: <DepartmentCreate /> },
            { path: ':name/edit', element: <DepartmentCreate /> },
            // { path: 'account', element: <UserAccount /> },
          ],
        },

        {
          path: 'import-receipt',
          children: [
            { element: <Navigate to="/dashboard/import-receipt/list" replace />, index: true },
            { path: 'list', element: <ImportReceiptList /> },
            { path: 'new', element: <ImportReceiptCreate /> },
            { path: ':id', element: <ImportReceiptDetails /> },
            { path: ':id/edit', element: <ImportReceiptEdit /> },
          ],
        },
        {
          path: 'role',
          children: [
            { element: <Navigate to="/dashboard/role/list" replace />, index: true },
            { path: 'list', element: <RoleList /> },
            { path: 'new', element: <RoleCreate /> },
            // { path: ':id', element: <RoleDetails /> },
            // { path: ':id/edit', element: <RoleEdit /> },
          ],
        },
        { path: 'permission-denied', element: <PermissionDenied /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
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
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        // { element: <HomePage />, index: true },
        // { path: 'about-us', element: <About /> },
        // { path: 'contact-us', element: <Contact /> },
        // { path: 'faqs', element: <Faqs /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../../auth/login/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// DASHBOARD

// ROLE
const RoleList = Loadable(lazy(() => import('../../management-role/list')));
const RoleCreate = Loadable(lazy(() => import('../../management-role/create')));

// EQUIPMENT
const GroupEquipmentList = Loadable(lazy(() => import('../../equipment/list-group-equipment')));
const GroupEquipmentCreate = Loadable(lazy(() => import('../../equipment/create-group-equipment')));
const EquipmentViewPage = Loadable(lazy(() => import('../../equipment/view')));
const EquipmentDetailSerial = Loadable(lazy(() => import('../../equipment/detail-serial-item')));

// IMPORT RECEIPT
const ImportReceiptList = Loadable(lazy(() => import('../../import-equipment-receipt/list')));
const ImportReceiptCreate = Loadable(lazy(() => import('../../import-equipment-receipt/create')));
const ImportReceiptDetails = Loadable(lazy(() => import('../../import-equipment-receipt/view')));
const ImportReceiptEdit = Loadable(lazy(() => import('../../import-equipment-receipt/edit')));

// BORROW RECEIPT
const BorrowReceiptList = Loadable(lazy(() => import('../../borrow-equipment-receipt/list')));
const BorrowReceiptCreate = Loadable(lazy(() => import('../../borrow-equipment-receipt/create')));
const BorrowReceiptDetails = Loadable(lazy(() => import('../../borrow-equipment-receipt/view')));
const BorrowReceiptScanSerialNumber = Loadable(
  lazy(() => import('../../borrow-equipment-receipt/scan'))
);

// TRANSFER RECEIPT
const TransferReceiptList = Loadable(lazy(() => import('../../transfer-equipment-receipt/list')));
const TransferReceiptCreate = Loadable(
  lazy(() => import('../../transfer-equipment-receipt/create'))
);
const TransferReceiptDetails = Loadable(
  lazy(() => import('../../transfer-equipment-receipt/view'))
);

// GENERAL
const GeneralApp = Loadable(lazy(() => import('../../home')));

// USER
// const UserProfile = Loadable(lazy(() => import('../../management-user/')));
// const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserList = Loadable(lazy(() => import('../../management-user/list/UserList')));
// const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../../management-user/create')));

// TEST RENDER PAGE BY ROLE
const PermissionDenied = Loadable(lazy(() => import('../pages/dashboard/PermissionDenied')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
