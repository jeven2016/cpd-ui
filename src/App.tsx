import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from '@/login/LoginPage';
import Container from '@/layout/Container';
import Home from '@/layout/Home';
import NoCustomer from '@/pages/customer/NoCustomer';
import CustomerList from '@/pages/customer/CustomerList';
import CustomerHome from '@/pages/customer/CustomerHome';
import CustomerDetails from '@/pages/customer/CustomerDetails';
import CatalogList from '@/pages/books/CatalogList';
import ArticleList from '@/pages/books/ArticleList';
import Article from '@/pages/books/Article';
import { useTranslation } from 'react-i18next';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import keycloak from '@/common/components/KeyCloak';
import { PathRouteProps } from 'react-router/lib/components';

interface SecuredRouteProps {
  element?: React.ReactElement;
  children?: React.ReactElement;
}

const Secured = ({ element: Element }): JSX.Element => {
  const { keycloak, initialized } = useKeycloak();
  const location = useLocation();
  console.log('init Secured=' + initialized + ', secured=' + keycloak.authenticated);

  if (initialized && keycloak.authenticated) {
    console.log('authenticated');
    return <Element />;
  }
  const baseLogin = '/login';
  const toUri = location?.pathname === '/' ? baseLogin : `${baseLogin}?refer=` + location.pathname;
  return <Navigate replace to={toUri} />;
};

const SecuredRoot = (): JSX.Element => {
  const { keycloak, initialized } = useKeycloak();
  console.log('init root =' + initialized + ', secured=' + keycloak.authenticated);

  if (initialized && keycloak.authenticated) {
    return <Navigate replace to="/books" />;
  }
  return <Navigate replace to="/login" />;
};

function App() {
  const { t } = useTranslation();

  return (
    <>
      <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{
          onLoad: 'check-sso',
          pkceMethod: 'S256'
        }}>
        <BrowserRouter>
          <Routes>
            <Route element={<Container />}>
              <Route path="/" element={<SecuredRoot />} />
              <Route path="/platform" element={<Secured element={Home} />}>
                <Route path="customer" element={<CustomerHome />}>
                  <Route path="no-customers" element={<NoCustomer />} />
                  <Route path="new" element={<CustomerDetails />} />
                  <Route path="list" element={<CustomerList />} />
                </Route>
              </Route>
              <Route path="/books" element={<Secured element={Home} />}>
                <Route path="catalogs" element={<CatalogList />} />
                <Route path="catalogs/:id/articles" element={<ArticleList />} />
                <Route path="articles/:id" element={<Article />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </BrowserRouter>
      </ReactKeycloakProvider>
    </>
  );
}

export default App;
