import {
  Affix,
  Breadcrumb,
  Button,
  Card,
  Dropdown,
  IconAccount,
  IconHome,
  Layout,
  Menu,
  Navbar,
  Space
} from 'react-windy-ui';
import HomeIcon from '@/common/icons/HomeIcon';
import React, { useState } from 'react';
import IconCustomerMgr from '@/common/icons/IconCustomerMgr';
import IconSystem from '@/common/icons/IconSystem';
import IconCollapse from '@/common/icons/IconCollapse';
import { Outlet } from 'react-router-dom';

const collapseAttribute = {
  attr: 'marginLeft',
  minValue: '0px'
  // maxValue: '240px'
};

function getMenu(collapse) {
  return (
    <Menu
      collapsable={collapse}
      defaultActiveItems={['item1']}
      hasBox={false}
      type="primary"
      hasRipple={false}>
      <Menu.Item id="item1" icon={<IconCustomerMgr />}>
        My Books
      </Menu.Item>
      <Menu.Item id="item2" icon={<IconSystem />}>
        系统配置
      </Menu.Item>
    </Menu>
  );
}

export default function Home() {
  const [collapse, setCollapse] = useState<boolean>(false);

  return (
    <>
      <Layout extraClassName="base-layout">
        <Layout.Split>
          <Layout.Slider extraClassName="layout-slider" collapse={collapse} style={{}}>
            <Affix top={0} block={false}>
              <div className="slider-title">
                <Space>
                  <HomeIcon />
                  <span>My World</span>
                </Space>
              </div>
              <Button onClick={() => setCollapse(!collapse)}>C</Button>
              {getMenu(collapse)}
            </Affix>
          </Layout.Slider>

          <Layout
            collapseAttribute={collapseAttribute}
            collapse={!collapse}
            style={{ overflowY: 'auto' }}>
            <Affix top={0} block={false}>
              <Navbar hasBorder={false} hasBox={false} extraClassName="c-navbar-header">
                <Navbar.Title>
                  <Button circle inverted color="gray">
                    <IconCollapse style={{ fontSize: '1.5rem' }} />
                  </Button>
                </Navbar.Title>
                <Navbar.List justify="end">
                  <Navbar.Item>
                    <Dropdown
                      position="bottomRight"
                      title={
                        <Button circle color="blue" inverted hasBox={false} hasRipple={false}>
                          <IconAccount />
                        </Button>
                      }>
                      <Dropdown.Menu>
                        <Dropdown.Item id="item2">退出</Dropdown.Item>
                        <Dropdown.Item id="item3">个人设置</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Navbar.Item>
                </Navbar.List>
              </Navbar>
            </Affix>
            <Layout.Content extraClassName="c-layout-content">
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
            </Layout.Content>
          </Layout>
        </Layout.Split>
      </Layout>
    </>
  );
}
