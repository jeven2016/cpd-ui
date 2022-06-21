import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function CustomerHome() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div className="content-area">
        <Outlet />
      </div>
    </>
  );
}
