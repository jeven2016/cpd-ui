import {
  Button,
  Col,
  Form,
  IconAccount,
  IconLock,
  Input,
  Row,
  Select,
  Space
} from 'react-windy-ui';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@/common/icons/HomeIcon';

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

    navigate('/books/catalogs');
    //......
    // console.log(data.realm);
    // window.location.href = 'http://127.0.0.1:9999/backend/auth/' + data.realm;
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
              mdOffset={4}
              lgOffset={7}
              xlOffset={8}
              sm={12}
              md={8}
              lg={5}
              xl={4}>
              <div className="c-login-info">
                <Space className="text color-green">
                  <HomeIcon />
                  <span>My World</span>
                </Space>
              </div>
              <Form extraClassName="login-form" form={form} onSubmit={onSubmit}>
                <Form.Item
                  label="选择组织"
                  name="realm"
                  // rules={{
                  //   required: 'The realm is required'
                  // }}
                  justifyLabel="end">
                  <Select block placeholder="请选择组织" defaultValue="zhongfu">
                    <Select.Option value="zhongfu">中孚信息</Select.Option>
                    <Select.Option value="master">master</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item direction="horizontal">
                  <Row>
                    <Col flexCol justify="start">
                      <Button
                        nativeType="submit"
                        onClick={(e) => onSubmit(null, e)}
                        hasMinWidth
                        color="blue"
                        // block
                        // onClick={() => navigate('/platform')}
                      >
                        KeyCloak 单点登录
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
