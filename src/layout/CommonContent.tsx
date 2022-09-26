import { Breadcrumb, IconHome } from 'react-windy-ui';
import { Outlet } from 'react-router-dom';
import React from 'react';

export default function CommonContent() {
  return (
    <>
      <div className="c-breadcrumb-line white-panel">
        <div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <IconHome />
            </Breadcrumb.Item>
            <Breadcrumb.Item>书库</Breadcrumb.Item>
            <Breadcrumb.Item active>文章列表</Breadcrumb.Item>
          </Breadcrumb>
          <h2>列表标题</h2>
        </div>
      </div>
      <div className="c-content-inner">
        <Outlet />
      </div>
    </>
  );
}
