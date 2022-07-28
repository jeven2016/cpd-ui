import {
  Affix,
  Breadcrumb,
  Button,
  Dropdown,
  IconAccount,
  IconHome,
  Layout,
  Menu,
  Navbar,
  Responsive,
  Space,
  useMediaQuery
} from 'react-windy-ui';
import HomeIcon from '@/common/icons/HomeIcon';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import IconCustomerMgr from '@/common/icons/IconCustomerMgr';
import IconSystem from '@/common/icons/IconSystem';
import IconCollapse from '@/common/icons/IconCollapse';
import { Outlet } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { useTranslation } from 'react-i18next';

const collapseAttribute = {
  attr: 'marginLeft',
  minValue: '0px'
  // maxValue: '240px'
};

function getMenu(collapse) {
  const { t } = useTranslation();

  return (
    <Menu
      compact={collapse}
      defaultActiveItems={['item1']}
      hasBox={false}
      type="primary"
      hasRipple={false}>
      <Menu.Item id="item1" icon={<IconCustomerMgr />}>
        {t('web.title')}
      </Menu.Item>
      <Menu.Item id="item2" icon={<IconSystem />}>
        {t('web.system_config')}
      </Menu.Item>
    </Menu>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState<boolean>(false);
  const { matches: mdWindow } = useMediaQuery(Responsive.md.max);
  const { keycloak } = useKeycloak();

  const logout = useCallback(() => {
    console.log(window.location);
    keycloak.logout({ redirectUri: 'http://localhost:8088' });
  }, []);
  console.log(keycloak?.tokenParsed);
  const username = useMemo(() => keycloak?.tokenParsed?.preferred_username ?? '', [keycloak]);

  return (
    <>
      <Layout extraClassName="base-layout">
        <Layout.Split>
          {!mdWindow && (
            <Layout.Slider collapse={collapse} autoHide={false} style={{}}>
              <Affix top={0} block={false}>
                <div className="slider-title">
                  <Space>
                    <HomeIcon />
                    {!collapse && <span style={{ whiteSpace: 'nowrap' }}>{t('web.title')}</span>}
                  </Space>
                </div>
                {getMenu(collapse)}
              </Affix>
            </Layout.Slider>
          )}
          <Layout
            collapseAttribute={collapseAttribute}
            collapse={!collapse}
            style={{ overflowY: 'auto' }}>
            <Affix top={0} block={false}>
              <Navbar hasBorder={false} hasBox={false} extraClassName="c-navbar-header">
                <Navbar.Title>
                  <Button circle inverted hasBox={false} onClick={() => setCollapse(!collapse)}>
                    <IconCollapse style={{ fontSize: '1.5rem' }} />
                  </Button>
                </Navbar.Title>
                <Navbar.List justify="end">
                  <Navbar.Item>
                    <Dropdown
                      position="bottomRight"
                      title={
                        <Button
                          color="blue"
                          inverted
                          hasBox={false}
                          hasRipple={false}
                          leftIcon={<IconAccount />}>
                          {username}
                        </Button>
                      }>
                      <Dropdown.Menu>
                        <Dropdown.Item id="item2" onClick={logout}>
                          {t('global.link.exit')}
                        </Dropdown.Item>
                        <Dropdown.Item id="item3">{t('global.link.profile_setting')}</Dropdown.Item>
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
