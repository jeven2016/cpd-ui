import { Outlet } from 'react-router-dom';
import { Loader } from 'react-windy-ui';
import { useEffect, useState } from 'react';

export default function Container() {
  const [active, setActive] = useState<boolean>(true);
  useEffect(() => {
    let time;
    if (active) {
      time = setTimeout(() => setActive(false), 1000);
    }

    return () => {
      time && clearTimeout(time);
    };
  }, [active]);

  return (
    <>
      <Loader
        type="primary"
        global
        size="small"
        color="white"
        hasDefaultWidth={false}
        modalStyle={{ background: '#000' }}
        direction="horizontal"
        active={active}
        // onMaskClick={() => setActive(false)}
        text="数据加载中"
      />
      <Outlet />
    </>
  );
}
