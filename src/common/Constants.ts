export const URI = {
  defaultHome: process.env.REACT_APP_DEFAULT_HOME ?? '',
  redirectFlag: 'refer=',

  loginPath: '/login'
};

//keycloak auth相关参数
export const AUTH_CONFIG = {
  authMethod: 'check-sso',
  pkceMethod: 'S256'
};
