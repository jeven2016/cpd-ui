import {
  Row,
  Col,
  Form,
  IconAccount,
  Space,
  Button,
  IconPwdVisible,
  TextField,
  IconHome
} from 'react-windy-ui';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const form = Form.useForm({
    //Validation will trigger on the submit event and invalid inputs will attach onChange event listeners to re-validate them.
    //for more information, you can refer to : https://react-hook-form.com/api/useform
    mode: 'onSubmit'
  });

  //invoked while submit button is clicked
  const onSubmit = (data, e) => {
    console.log('onSubmit', data, e);
    //then call the api to save the data
    //......
  };

  const { reset } = form;

  return (
    <div className="c-container">
      <div className="c-login-container">
        <div className="c-back" />
        <div className="c-login-row">
          <Row>
            <Col
              extraClassName="c-login-col"
              smOffset={5}
              mdOffset={4}
              lgOffset={8}
              xlOffset={10}
              xs={12}
              sm={7}
              md={5}
              lg={4}
              xl={2}>
              <div className="c-login-info">
                <Space>
                  <IconHome />
                  <span>管理平台</span>
                </Space>
              </div>
              <Form form={form} onSubmit={onSubmit}>
                <Form.Item name="username" required rules={{ required: 'Username is required' }}>
                  <TextField
                    block
                    shape="underline"
                    label="用户名"
                    labelFixed={false}
                    leftItems={<IconAccount />}
                  />
                </Form.Item>

                <Form.Item name="password" required rules={{ required: 'Password is required' }}>
                  <TextField
                    block
                    nativeType="password"
                    shape="underline"
                    label="密码"
                    labelFixed={false}
                    leftItems={<IconPwdVisible />}
                  />
                </Form.Item>

                <Form.Item>
                  <Row gutter={{ x: 16 }}>
                    <Col>
                      <Button
                        nativeType="submit"
                        color="blue"
                        block
                        onClick={() => navigate('/platform')}>
                        登录
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        nativeType="reset"
                        block
                        onClick={() =>
                          reset({
                            username: '',
                            password: ''
                          })
                        }>
                        重置
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
