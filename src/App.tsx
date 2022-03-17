import React from 'react';
import { Greeter } from 'irene-awesome-greeter';
// import { Button } from 'semantic-ui-react';
// import LoginPage from '@/login/LoginPage';
// import Container from '@/layout/Container';
// import Home from '@/layout/Home';

function App() {
  const msg = Greeter('test');
  return (
    // <Routes>
    //   <Route index element={LoginIndex} />
    // </Routes>
    <>
      <button>{msg}</button>
      <div>hello</div>
      {/*<BrowserRouter>*/}
      {/*  <Routes>*/}
      {/*    <Route element={<Container />}>*/}
      {/*      <Route path="/platform" element={<Home />} />*/}
      {/*      <Route index={true} element={<LoginPage />} />*/}
      {/*    </Route>*/}
      {/*    <Route path="*" element={<div>404</div>} />*/}
      {/*  </Routes>*/}
      {/*</BrowserRouter>*/}
    </>
  );
}

export default App;
