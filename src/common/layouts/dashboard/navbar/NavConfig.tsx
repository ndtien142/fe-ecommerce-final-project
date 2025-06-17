// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
  borrowReceipt: getIcon('ic_borrow_receipt'),
  role: getIcon('ic_role'),
  permission: getIcon('ic_permissions'),
  repair: getIcon('ic_repair'),
  liquidation: getIcon('ic_liquidation'),
  transfer: getIcon('ic_transfer'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [{ title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard }],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Quản lý thiết bị',
    items: [
      // Group Equipment
      {
        title: 'Nhóm thiết bị',
        path: PATH_DASHBOARD.equipment.listGroup,
        icon: ICONS.kanban,
        children: [
          { title: 'Danh sách', path: PATH_DASHBOARD.equipment.listGroup },
          { title: 'Tạo nhóm thiết bị', path: PATH_DASHBOARD.equipment.new },
        ],
      },
    ],
  },

  {
    subheader: 'Quản lý phiếu',
    items: [
      // IMPORT RECEIPT
      {
        title: 'Phiếu nhập thiết bị',
        path: PATH_DASHBOARD.importReceipt.root,
        icon: ICONS.invoice,
        children: [
          { title: 'Danh sách', path: PATH_DASHBOARD.importReceipt.list },
          { title: 'Tạo phiếu nhập', path: PATH_DASHBOARD.importReceipt.new },
        ],
      },
      // BORROW RECEIPT
      {
        title: 'Phiếu mượn thiết bị',
        path: PATH_DASHBOARD.borrowReceipt.root,
        icon: ICONS.borrowReceipt,
        children: [
          { title: 'Danh sách', path: PATH_DASHBOARD.borrowReceipt.list },
          { title: 'Tạo phiếu mượn', path: PATH_DASHBOARD.borrowReceipt.new },
        ],
      },

      // TRANSFER RECEIPT
      {
        title: 'Phiếu chuyen thiet bi',
        path: PATH_DASHBOARD.transferReceipt.root,
        icon: ICONS.transfer,
        children: [
          { title: 'Danh sách', path: PATH_DASHBOARD.transferReceipt.list },
          { title: 'Tạo phiếu chuyển', path: PATH_DASHBOARD.transferReceipt.new },
        ],
      },

      // LIQUIDATION RECEIPT
      {
        title: 'Phiếu thanh lý',
        path: PATH_DASHBOARD.liquidationReceipt.root,
        icon: ICONS.liquidation,
        children: [
          { title: 'Danh sách', path: PATH_DASHBOARD.liquidationReceipt.list },
          { title: 'Tạo phiếu thanh lý', path: PATH_DASHBOARD.liquidationReceipt.new },
        ],
      },

      // REPAIR RECEIPT
      {
        title: 'Phiếu sửa chữa thiết bị',
        path: PATH_DASHBOARD.repairReceipt.root,
        icon: ICONS.repair,
        children: [
          { title: 'Danh sách', path: PATH_DASHBOARD.repairReceipt.list },
          { title: 'Tạo phiếu sửa chữa', path: PATH_DASHBOARD.repairReceipt.new },
        ],
      },
    ],
  },

  {
    subheader: 'Quản lý phòng ban',
    items: [
      // DEPARTMENT
      {
        title: 'Quản lý phòng ban',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.banking,
        children: [
          // { title: 'profile', path: PATH_DASHBOARD.user.profile },
          // { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'Danh sách', path: PATH_DASHBOARD.department.list },
          { title: 'Tạo phòng ban', path: PATH_DASHBOARD.department.new },
          { title: 'Sửa phòng ban', path: PATH_DASHBOARD.department.demoEdit },
          // { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },
    ],
  },

  // AUTHORIZATION
  // ----------------------------------------------------------------------
  {
    subheader: 'authorization',
    items: [
      // Group Equipment
      {
        title: 'Vai trò',
        path: PATH_DASHBOARD.role.root,
        icon: ICONS.role,
        children: [
          { title: 'Danh sách', path: PATH_DASHBOARD.role.list },
          { title: 'Tạo vai trò', path: PATH_DASHBOARD.role.new },
        ],
      },
      {
        title: 'Quyền',
        path: PATH_DASHBOARD.permission.root,
        icon: ICONS.permission,
        children: [
          { title: 'Danh sách', path: PATH_DASHBOARD.permission.list },
          { title: 'Tạo quyền', path: PATH_DASHBOARD.permission.new },
        ],
      },
      // USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          // { title: 'profile', path: PATH_DASHBOARD.user.profile },
          // { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
          // { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },
    ],
  },

  // // APP
  // // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: <Label color="error">+32</Label>,
  //     },
  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     { title: 'kanban', path: PATH_DASHBOARD.kanban, icon: ICONS.kanban },
  //   ],
  // },
];

export default navConfig;
