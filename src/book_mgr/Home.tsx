import { Dropdown, IconAccount, IconList, Layout, Menu, Navbar, Space } from 'react-windy-ui';
import IconBook from '@/common/icons/IconBook';
import IconLogout from '@/common/icons/IconLogout';
import { Outlet, useNavigate } from 'react-router-dom';
import IconSetting from '@/common/icons/IconSetting';
import { useCallback } from 'react';

function getMenu() {
  const navigate = useNavigate();
  const selectItem = useCallback((id) => {
    navigate(`forums/${id}`);
  }, []);

  return (
    <Menu
      defaultActiveItems={['item2']}
      hasBox={false}
      onSelect={selectItem}
      // primaryBarPosition={position ? 'right' : 'left'}
      type="dark">
      <Menu.SubMenu header="我的论坛引导" id="sub1">
        <Menu.Item id="item5">论坛名称1</Menu.Item>
        <Menu.Item id="item6">论坛名称2</Menu.Item>
        <Menu.Item id="item7">论坛名称3</Menu.Item>
        <Menu.Item id="item8">论坛名称4</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
}

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Layout.Header>
          <Navbar type="dark" hasBox={false} hasBorder={false} extraClassName="clear-radius">
            <Navbar.Title>
              <Navbar.Switch>
                <IconList />
              </Navbar.Switch>
              <Space>
                <IconBook />
                <span>预览系统</span>
              </Space>
            </Navbar.Title>
            <Navbar.List>
              <Navbar.Item active={true} hasBackground>
                <Space>
                  <IconAccount />
                  <Dropdown title={<span>User</span>} position="bottomRight" activeBy="hover">
                    <Dropdown.Menu>
                      <Dropdown.Item id="item1" icon={<IconLogout />} onClick={() => navigate('/')}>
                        注销
                      </Dropdown.Item>
                      <Dropdown.Item id="item1" icon={<IconSetting />}>
                        个人设定
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Space>
              </Navbar.Item>
            </Navbar.List>
          </Navbar>
        </Layout.Header>

        <Layout.Split style={{ flexDirection: 'row' }}>
          <Layout.Slider extraClassName="doc doc-content">{getMenu()}</Layout.Slider>

          <Layout style={{ padding: '0 2rem' }}>
            <Outlet />
          </Layout>
        </Layout.Split>
        <Layout.Footer style={{ textAlign: 'center' }}>
          <span>react-windy-ui ©2020 All rights reserved</span>
        </Layout.Footer>
      </div>
    </>
  );
}
