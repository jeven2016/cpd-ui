import { Affix, Button, Dropdown, IconAccount, Layout, Navbar } from 'react-windy-ui';
import IconCollapse from '@/common/icons/IconCollapse';
import { Outlet } from 'react-router-dom';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EnvConfig } from '@/common/config/EnvConfig';
import { useKeycloak } from '@react-keycloak/web';
import { animated, useSpring } from 'react-spring';
import { WindowContext } from '@/common/Context';
import { LAYOUT_SETTING } from '@/common/Constants';

export default function Content(props) {
  const { collapse, setCollapse } = props;
  const { keycloak } = useKeycloak();
  const { t } = useTranslation();
  const { mdWindow } = useContext(WindowContext);

  const logout = useCallback(() => {
    keycloak.logout({ redirectUri: EnvConfig.redirectUri }).catch((e) => console.error(e));
  }, [keycloak]);

  const username = useMemo(() => keycloak?.tokenParsed?.preferred_username ?? '', [keycloak]);

  const [affixed, setAffixed] = useState<boolean>(false);

  const { marginLeft } = useSpring({
    marginLeft: mdWindow ? LAYOUT_SETTING.CONTENT.MIN : LAYOUT_SETTING.CONTENT.MAX,
    config: { duration: 200 }
  });
  const AnimatedLayout = animated(Layout);

  return (
    <AnimatedLayout extraClassName="base-layout" style={{ marginLeft: marginLeft }}>
      <Layout.Split>
        <Layout extraClassName="c-layout-inner" style={{ overflowY: 'auto' }}>
          <div className="c-home"></div>
          <Layout.Content extraClassName="c-layout-content">
            <Affix top={16} block={false} onChange={(status) => setAffixed(status)}>
              <Navbar
                hasBorder={false}
                hasBox={affixed}
                extraClassName="c-navbar-header"
                hideOnScroll={true}>
                <Navbar.Title>
                  <Button circle inverted hasBox={false} onClick={() => setCollapse(!collapse)}>
                    <IconCollapse style={{ fontSize: '1.5rem' }} />
                  </Button>
                </Navbar.Title>
                <Navbar.List justify="end">
                  <Navbar.Item active={true}>
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
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout.Split>
    </AnimatedLayout>
  );
}
