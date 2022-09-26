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
import React, { useCallback, useMemo, useState } from 'react';
import IconCustomerMgr from '@/common/icons/IconCustomerMgr';
import IconSystem from '@/common/icons/IconSystem';
import IconCollapse from '@/common/icons/IconCollapse';
import { Outlet } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { useTranslation } from 'react-i18next';
import { EnvConfig } from '@/common/config/EnvConfig';

const collapseAttribute = {
  attr: 'marginLeft',
  minValue: '0px'
  // maxValue: '240px'
};

function getMenu(collapse, t) {
  return (
    <Menu
      compact={collapse}
      defaultActiveItems={['item1']}
      hasBox={false}
      type="primary"
      hasRipple={true}>
      <Menu.Item id="item1" icon={<IconCustomerMgr />}>
        {t('menu.books')}
      </Menu.Item>
      <Menu.Item id="item2" icon={<IconSystem />}>
        {t('menu.system_config')}
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
    keycloak.logout({ redirectUri: EnvConfig.redirectUri }).catch((e) => console.error(e));
  }, [keycloak]);

  const username = useMemo(() => keycloak?.tokenParsed?.preferred_username ?? '', [keycloak]);
  const [affixed, setAffixed] = useState<boolean>(false);

  return (
    <>
      {!mdWindow && (
        <div className="c-slider">
          <div className="c-slider-content">
            <div className="slider-title">
              <Space>
                <HomeIcon />
                {!collapse && <span style={{ whiteSpace: 'nowrap' }}>{t('web.title')}</span>}
              </Space>
            </div>
            {getMenu(collapse, t)}
          </div>
        </div>
      )}
      <Layout extraClassName="base-layout">
        <Layout.Split>
          <Layout
            extraClassName="c-layout-inner"
            collapseAttribute={collapseAttribute}
            collapse={!collapse}
            style={{ overflowY: 'auto' }}>
            <div className="c-home"></div>
            <Layout.Content extraClassName="c-layout-content">
              <Affix top={16} block={false} onChange={(status) => setAffixed(status)}>
                <Navbar hasBorder={false} hasBox={affixed} extraClassName="c-navbar-header">
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
                          <Dropdown.Item id="item3">
                            {t('global.link.profile_setting')}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Navbar.Item>
                  </Navbar.List>
                </Navbar>
              </Affix>
              <Outlet />
            </Layout.Content>
          </Layout>
        </Layout.Split>
      </Layout>
    </>
  );
}
