export const ROUTES = {
  HOME: {
    path: '/',
    basePath: '',
    exact: true
  },
  LOGIN_USER: {
    path: '/login',
    basePath: '',
    publicRoute: true,
    exact: false
  },
  LOGIN_ADMIN: {
    path: '/admin/login',
    basePath: '/admin',
    publicRoute: true,
    exact: false
  },
  SIGN_UP_USER: {
    path: '/sign-up',
    basePath: '',
    publicRoute: true,
    exact: false
  },
  SIGN_UP_ADMIN: {
    path: '/admin/sign-up',
    basePath: '/admin',
    publicRoute: false,
    adminRoute: true,
    exact: false
  },
  PLAYGROUND: {
    path: '/playground',
    basePath: '',
    exact: false
  },
  PASSWORD_RECOVERY: {
    path: '/recover',
    basePath: '',
    publicRoute: true,
    exact: false
  }
};
