import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@/login/LoginPage';
import Container from '@/layout/Container';
import Home from '@/layout/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Container />}>
            <Route path="/platform" element={<Home />} />
            <Route index={true} element={<LoginPage />} />
          </Route>
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
