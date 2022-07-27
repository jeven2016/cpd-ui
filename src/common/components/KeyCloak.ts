import Keycloak, { KeycloakConfig } from 'keycloak-js';

const config: KeycloakConfig = {
  realm: process.env.REACT_APP_KEYCLOAK_REALM ?? '',
  url: process.env.REACT_APP_KEYCLOAK_URL ?? '',
  clientId: process.env.REACT_APP_CLIENT_ID ?? ''
};

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak(config);

export default keycloak;
