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
  brand: getIcon('ic_star'),
  categories: getIcon('ic_categories'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'tài khoản', path: PATH_DASHBOARD.general.account, icon: ICONS.user },
      { title: 'đơn hàng của tôi', path: PATH_DASHBOARD.general.orders.root, icon: ICONS.cart },
      // { title: 'giỏ hàng', path: PATH_DASHBOARD.general.cart, icon: ICONS.cart },
    ],
  },

  {
    subheader: 'Quản lý sản phẩm',
    items: [
      {
        title: 'Sản phẩm',
        path: PATH_DASHBOARD.product.root,
        icon: ICONS.ecommerce,
        children: [
          { title: 'Danh sách', path: PATH_DASHBOARD.product.list },
          { title: 'Tạo mới', path: PATH_DASHBOARD.product.new },
        ],
      },
      {
        title: 'Thương hiệu',
        path: PATH_DASHBOARD.brand.root,
        icon: ICONS.brand,
        children: [
          { title: 'Danh sách', path: PATH_DASHBOARD.brand.list },
          { title: 'Tạo mới', path: PATH_DASHBOARD.brand.new },
        ],
      },
      {
        title: 'Danh mục',
        path: PATH_DASHBOARD.categories.root,
        icon: ICONS.categories,
        children: [
          { title: 'Danh sách', path: PATH_DASHBOARD.categories.list },
          { title: 'Tạo mới', path: PATH_DASHBOARD.categories.new },
        ],
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'profile', path: PATH_DASHBOARD.user.profile },
          { title: 'cards', path: PATH_DASHBOARD.user.cards },
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
          { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
          { title: 'account', path: PATH_DASHBOARD.user.account },
        ],
      },
      // INVOICE
      {
        title: 'Đơn đặt hàng',
        path: PATH_DASHBOARD.order.root,
        icon: ICONS.invoice,
        children: [{ title: 'list', path: PATH_DASHBOARD.order.list }],
      },

      // BLOG
      {
        title: 'Đơn nhập hàng',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: 'posts', path: PATH_DASHBOARD.blog.posts },
          { title: 'post', path: PATH_DASHBOARD.blog.demoView },
          { title: 'create', path: PATH_DASHBOARD.blog.new },
        ],
      },
    ],
  },
];

export default navConfig;
