import { Button, Card, Col, Divider, Form, Row, Select, Space } from 'react-windy-ui';
import HomeIcon from '@/common/icons/HomeIcon';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { get } from '@/client/Request';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Container />}>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Container() {
  return (
    <>
      <Outlet />
    </>
  );
}

function Login() {
  const form = Form.useForm({
    //Validation will trigger on the submit event and invalid inputs will attach onChange event listeners to re-validate them.
    //for more information, you can refer to : https://react-hook-form.com/api/useform
    mode: 'onSubmit'
  });

  //invoked while submit button is clicked
  const onSubmit = (data, e) => {
    e.preventDefault();
    window.location.href = `http://localhost:8088/auth?realm=${data.realm}`;
  };

  const { reset } = form;

  return (
    <div className="c-container">
      <div className="c-login-container">
        <div className="c-back" />
        <div className="c-login-row">
          <Row>
            <Col extraClassName="c-login-col" md={8} lg={5} xl={4}>
              <div className="c-login-info">
                <Space className="text color-green">
                  <HomeIcon />
                  <span>管理系统</span>
                </Space>
              </div>
              <Form extraClassName="login-form" form={form} onSubmit={onSubmit}>
                <Form.Item
                  label="选择组织"
                  name="realm"
                  rules={{
                    required: '请选择组织'
                  }}
                  justifyLabel="end">
                  <Select block placeholder="请选择组织" defaultValue="zhongfu">
                    <Select.Option value="s1">s1</Select.Option>
                    <Select.Option value="master">master</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item direction="horizontal">
                  <Row>
                    <Col flexCol justify="start">
                      <Button
                        nativeType="submit"
                        hasMinWidth
                        color="blue"
                        // onClick={() => navigate('/platform')}
                      >
                        SSO登录
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [userInfo, set] = useState<string | undefined>();
  const [clients, setClients] = useState<any>();

  useEffect(() => {
    get(`/auth/userinfo`).then((data) => {
      set(JSON.stringify(data));
    });
  }, []);

  const logout = () => {
    get(`/auth/logout`).then((data) => {
      // window.location.href = '/login';
    });
  };

  const getUserInfo = () => {
    get(`/proxy/iam/realms/s1/protocol/openid-connect/userinfo`).then((data) => {
      set(JSON.stringify(data));
    });
  };

  const getUserInfo2 = () => {
    get(`/auth/userinfo`).then((data) => {
      set(JSON.stringify(data));
    });
  };
  const getAllClients = () => {
    get('/internal/clients').then((data) => {
      setClients(JSON.stringify(data));
    });
  };
  const getProxyClients = () => {
    // get('/proxy/iam/admin/realms/master/clients?first=0&max=11').then((data) => {
    get('/proxy/echoTest/admin/realms/master/clients?first=0&max=11').then((data) => {
      setClients(JSON.stringify(data));
    });
  };

  const getProfile = () => {
    get('/proxy/iam/admin/realms/s1/users/profile').then((data) => {
      console.log(data);
    });
  };

  return (
    <>
      <div>
        hello , this is home page.
        <Button onClick={getUserInfo}>我的信息</Button>
        <Button onClick={getAllClients}>所有Clients</Button>
        <Button onClick={getProxyClients}>proxy Clients</Button>
        <Button onClick={getProfile}>Profile</Button>
        <Button onClick={logout}>Logout</Button>
      </div>
      <div>
        <Card>
          <Card.Header>UserInfo</Card.Header>
          <Card.Body>
            <div>{clients}</div>
          </Card.Body>
        </Card>
      </div>

      <div>
        <Card block>
          <Card.Header>Clients</Card.Header>
          <Divider />
          <Card.Body>
            <div>{userInfo}</div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
