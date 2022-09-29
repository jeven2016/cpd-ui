import { Responsive, useMediaQuery } from 'react-windy-ui';
import React, { useMemo, useState } from 'react';
import LeftSlider from '@/layout/LeftSlider';
import Content from '@/layout/Content';
import { WindowContext } from '@/common/Context';

export default function Home() {
  const [collapse, setCollapse] = useState<boolean>(false);
  const [expandMenu, setExpandMenu] = useState<boolean>(false);
  const { matches: mdWindow } = useMediaQuery(Responsive.md.max);

  const windowContextValue = useMemo(
    () => ({
      mdWindow
    }),
    [mdWindow]
  );

  return (
    <WindowContext.Provider value={windowContextValue}>
      <LeftSlider collapse={collapse} />
      <Content collapse={collapse} setCollapse={setCollapse} />
    </WindowContext.Provider>
  );
}
