// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_CUSTOMER = '';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_CUSTOMER = {
  root: ROOTS_CUSTOMER,
  home: ROOTS_CUSTOMER,
  about: path(ROOTS_CUSTOMER, '/about'),
  contact: path(ROOTS_CUSTOMER, '/contact'),
  faqs: path(ROOTS_CUSTOMER, '/faqs'),
  pricing: path(ROOTS_CUSTOMER, '/pricing'),
  terms: path(ROOTS_CUSTOMER, '/terms'),
  privacyPolicy: path(ROOTS_CUSTOMER, '/privacy-policy'),
  eCommerce: {
    root: path(ROOTS_CUSTOMER, '/ecommerce'),
    shop: path(ROOTS_CUSTOMER, '/shop'),
    list: path(ROOTS_CUSTOMER, '/list'),
    checkout: path(ROOTS_CUSTOMER, '/checkout'),
    view: (slug: string) => path(ROOTS_CUSTOMER, `/product/${slug}`),
    edit: (slug: string) => path(ROOTS_CUSTOMER, `/product/${slug}/edit`),
  },
  coupon: {
    root: path(ROOTS_CUSTOMER, '/coupons'),
    list: path(ROOTS_CUSTOMER, '/coupons'),
  },
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  product: {
    root: path(ROOTS_DASHBOARD, '/product'),
    new: path(ROOTS_DASHBOARD, '/product/new'),
    list: path(ROOTS_DASHBOARD, '/product/list'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/product/${name}`),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/product/nike-air-force-1-ndestrukt'),
  },
  categories: {
    root: path(ROOTS_DASHBOARD, '/categories'),
    new: path(ROOTS_DASHBOARD, '/categories/new'),
    list: path(ROOTS_DASHBOARD, '/categories/list'),
    reorder: path(ROOTS_DASHBOARD, '/categories/reorder'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/categories/${name}`),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/categories/${id}/edit`),
  },
  brand: {
    root: path(ROOTS_DASHBOARD, '/brand'),
    new: path(ROOTS_DASHBOARD, '/brand/new'),
    list: path(ROOTS_DASHBOARD, '/brand/list'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/brand/${name}`),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/brand/${name}/edit`),
  },
  role: {
    root: path(ROOTS_DASHBOARD, '/role'),
    list: path(ROOTS_DASHBOARD, '/role/list'),
    new: path(ROOTS_DASHBOARD, '/role/new'),
    view: (roleCode: string) => path(ROOTS_DASHBOARD, `/role/${roleCode}`),
    edit: (roleCode: string) => path(ROOTS_DASHBOARD, `/role/${roleCode}/edit`),
  },
  permission: {
    root: path(ROOTS_DASHBOARD, '/permission'),
    list: path(ROOTS_DASHBOARD, '/permission/list'),
    new: path(ROOTS_DASHBOARD, '/permission/new'),
    view: (permissionCode: string) => path(ROOTS_DASHBOARD, `/permission/${permissionCode}`),
    edit: (permissionCode: string) => path(ROOTS_DASHBOARD, `/permission/${permissionCode}/edit`),
  },
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    workflowDashboard: path(ROOTS_DASHBOARD, '/workflow-dashboard'),
    orders: {
      root: path(ROOTS_DASHBOARD, '/orders'),
      list: path(ROOTS_DASHBOARD, '/orders/list'),
      view: (id: string) => path(ROOTS_DASHBOARD, `/orders/${id}`),
      edit: (id: string) => path(ROOTS_DASHBOARD, `/orders/${id}/edit`),
    },
    account: path(ROOTS_DASHBOARD, '/account'),
    settings: path(ROOTS_DASHBOARD, '/settings'),
    mailSettings: path(ROOTS_DASHBOARD, '/settings/mail'),
    cart: path(ROOTS_DASHBOARD, '/cart'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name: string) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  order: {
    root: path(ROOTS_DASHBOARD, '/management-order'),
    list: path(ROOTS_DASHBOARD, '/management-order/list'),
    new: path(ROOTS_DASHBOARD, '/management-order/new'),
    view: (id: string) => path(ROOTS_DASHBOARD, `/management-order/${id}`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/management-order/${id}/edit`),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title: string) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
