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
  minValue: '0px',
  maxValue: '240px'
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
          <Layout.Slider
            extraClassName="layout-slider"
            minWidth="0px"
            collapse={collapse}
            style={{}}>
            <div className="slider-title">
              <Space>
                <HomeIcon />
                <span>My World</span>
              </Space>
            </div>
            {getMenu(collapse)}
          </Layout.Slider>

          <Layout
            collapseAttribute={collapseAttribute}
            collapse={!collapse}
            style={{ overflowY: 'auto' }}>
            <Affix top={0} block={false}>
              <Navbar hasBorder={false} extraClassName="navbar-header">
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
              <Card block hasBox={false} extraClassName="white-panel">
                <Card.Header>
                  <Breadcrumb style={{ marginBottom: '0' }}>
                    <Breadcrumb.Item>
                      <IconHome />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>书库</Breadcrumb.Item>
                    <Breadcrumb.Item active>文章列表</Breadcrumb.Item>
                  </Breadcrumb>
                </Card.Header>
              </Card>
              <Outlet />
            </Layout.Content>
          </Layout>
        </Layout.Split>
      </Layout>
    </>
  );
}
