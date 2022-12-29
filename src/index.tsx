import React from 'react';
import ReactDOM from 'react-dom';
import 'react-windy-ui/dist/wui.css';
import '@/styles/default.scss';
import '@/common/config/i18n';
import App from '@/sso-proxy/App';

ReactDOM.render(<App />, document.getElementById('root'));
