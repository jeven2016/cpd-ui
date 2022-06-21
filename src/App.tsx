import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@/login/LoginPage';
import Container from '@/layout/Container';
import Home from '@/layout/Home';
import NoCustomer from '@/pages/customer/NoCustomer';
import CustomerList from '@/pages/customer/CustomerList';
import CustomerHome from '@/pages/customer/CustomerHome';
import CustomerDetails from '@/pages/customer/CustomerDetails';
import CatalogList from '@/pages/books/CatalogList';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Container />}>
            <Route path="/platform" element={<Home />}>
              <Route path="customer" element={<CustomerHome />}>
                <Route path="no-customers" element={<NoCustomer />} />
                <Route path="new" element={<CustomerDetails />} />
                <Route path="list" element={<CustomerList />} />
              </Route>
            </Route>
            <Route path="/books" element={<Home />}>
              <Route path="catalogs" element={<CatalogList />} />
            </Route>
            <Route index={true} element={<LoginPage />} />
          </Route>
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
