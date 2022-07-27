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
import { useKeycloak } from '@react-keycloak/web';
import { Loader } from 'react-windy-ui';
import { URI } from '@/common/Constants';

/**
 * 保护对应的资源，如果没有登录就跳转至登录页面
 */
const Secured = ({ element: Element }): JSX.Element => {
  const { keycloak, initialized } = useKeycloak();
  const location = useLocation();

  if (keycloak?.authenticated) {
    return <Element />;
  }

  const toUri =
    location?.pathname === '/'
      ? URI.loginPath
      : `${URI.loginPath}?${URI.redirectFlag}` + location.pathname;
  return <Navigate replace to={toUri} />;
};

/**
 * 保护根路径，如果没有登录就跳转之登录页面，否则到首页
 */
const SecuredRoot = (): JSX.Element => {
  const { keycloak } = useKeycloak();

  if (keycloak.authenticated) {
    return <Navigate replace to={URI.defaultHome} />;
  }
  return <Navigate replace to={URI.loginPath} />;
};

function App() {
  const { t } = useTranslation();
  const { initialized } = useKeycloak();

  if (!initialized) {
    return (
      <Loader
        type="primary"
        global
        size="small"
        color="white"
        hasDefaultWidth={false}
        modalStyle={{ background: '#000' }}
        direction="horizontal"
        active={!initialized}
        text={t('global.loading')}
      />
    );
  }

  return (
    <>
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
    </>
  );
}

export default App;
