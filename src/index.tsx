import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-windy-ui/dist/wui.css';
import '@/styles/default.scss';
import '@/common/config/i18n';
import keycloak from '@/common/components/KeyCloak';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { AUTH_CONFIG } from '@/common/Constants';

const eventLogger = (event: unknown, error: unknown) => {
  // console.log('onKeycloakEvent', event, error);
};

const tokenLogger = (tokens: Tokens) => {
  tokens.token && localStorage.setItem('accessToken', tokens.token);
};

ReactDOM.render(
  <ReactKeycloakProvider
    authClient={keycloak}
    onEvent={eventLogger}
    onTokens={tokenLogger}
    initOptions={{
      onLoad: AUTH_CONFIG.authMethod,
      pkceMethod: AUTH_CONFIG.pkceMethod
    }}>
    <App />
  </ReactKeycloakProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
