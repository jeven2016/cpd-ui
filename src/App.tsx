import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginIndex from '@/login/LoginIndex';

function App() {
  return (
    <Routes>
      <Route index element={LoginIndex} />
    </Routes>
  );
}

export default App;
