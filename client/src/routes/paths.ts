// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
};

export const PATH_PAGE = {
  page404: '/404',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/')
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  car: {
    root: path(ROOTS_DASHBOARD, '/car'),
    list: path(ROOTS_DASHBOARD, '/car/list'),
    new: path(ROOTS_DASHBOARD, '/car/new'),
  },
  booking: {
    root: path(ROOTS_DASHBOARD, '/booking'),
    list: path(ROOTS_DASHBOARD, '/booking/list'),
  },
  contract: {
    root: path(ROOTS_DASHBOARD, '/contract'),
    list: path(ROOTS_DASHBOARD, '/contract/list'),
    new: path(ROOTS_DASHBOARD, '/contract/new'),
  },
  addon: {
    root: path(ROOTS_DASHBOARD, '/addon'),
    list: path(ROOTS_DASHBOARD, '/addon/list'),
    new: path(ROOTS_DASHBOARD, '/addon/new'),
  },
  insurance: {
    root: path(ROOTS_DASHBOARD, '/insurance'),
    list: path(ROOTS_DASHBOARD, '/insurance/list'),
    new: path(ROOTS_DASHBOARD, '/insurance/new'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
