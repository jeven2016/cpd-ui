import { KeycloakConfig } from 'keycloak-js';

export const KcConfig: KeycloakConfig = {
  realm: process.env.REACT_APP_KEYCLOAK_REALM ?? '',
  url: process.env.REACT_APP_KEYCLOAK_URL ?? '',
  clientId: process.env.REACT_APP_CLIENT_ID ?? ''
};

export const EnvConfig = {
  ...KcConfig,
  redirectUri: process.env.REACT_APP_REDIRECT_URI ?? ''
};
