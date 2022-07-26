import Keycloak from 'keycloak-js';

const config = {
  realm: process.env.KEYCLOAK_REALM ?? 'jeven',
  url: 'http://localhost:8080/',
  clientId: 'security-admin-console'
};

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak(config);

export default keycloak;
