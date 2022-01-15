import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@/login/LoginPage';
import Container from '@/book_mgr/Container';
import Home from '@/book_mgr/Home';
import Welcome from '@/book_mgr/Welcome';
import ForumHome from '@/book_mgr/ForumHome';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Container />}>
            <Route path="/platform" element={<Home />}>
              <Route index element={<Welcome />} />
              <Route path={`forums/:id`} element={<ForumHome />} />
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
