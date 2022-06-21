import React from 'react';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Notification,
  Radio,
  RadioGroup,
  Row,
  Select
} from 'react-windy-ui';
import { useNavigate } from 'react-router-dom';

export default function BasicInf() {
  const navigate = useNavigate();
  const { form } = Form.useForm({
    mode: 'onSubmit',
    shouldFocusError: false,
    defaultValues: {
      firstName: 'name',
      city: 'ShangHai',
      accept: true
    }
  });

  const onSubmit = (data, e) => {
    Notification.info({
      position: 'topCenter',
      // title: 'The form data:',
      body: `${JSON.stringify(data)}`
    });
    //then call the api to save the data
    //.....
  };

  const gutter = { x: 8, y: 0 };
  const colConf = {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3
  };
  return (
    <>
      <Card hasBox={false} block>
        <Card.Row>
          <Form form={form} onSubmit={onSubmit}>
            <Row gutter={gutter}>
              <Col {...colConf}>
                <Form.Item
                  direction="vertical"
                  label="客户名称"
                  name="customerName"
                  required={true}
                  rules={{
                    required: '客户名称不能为空'
                  }}>
                  <Input block />
                  {/*<div>四川省国家保密局</div>*/}
                </Form.Item>
              </Col>
              <Col {...colConf}>
                <Form.Item direction="vertical" label="客户经理" name="accountManager">
                  <Input block />
                </Form.Item>
              </Col>
              <Col {...colConf}>
                <Form.Item
                  direction="vertical"
                  label="省份"
                  name="province"
                  required={true}
                  rules={{
                    required: '省份不能为空'
                  }}>
                  <Select block placeholder="选择省份" onSelect={(value) => console.log(value)}>
                    <Select.Option value="BeiJing">北京</Select.Option>
                    <Select.Option value="ShangHai">上海</Select.Option>
                    <Select.Option value="other">山东</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col {...colConf}>
                <Form.Item
                  direction="vertical"
                  label="省区级别"
                  name="provinceLevel"
                  required={true}
                  rules={{
                    required: '省区级别不能为空'
                  }}>
                  <Input block />
                </Form.Item>
              </Col>

              <Col {...colConf}>
                <Form.Item
                  direction="vertical"
                  label="地市"
                  name="city"
                  required={true}
                  rules={{
                    required: '地市不能为空'
                  }}>
                  <Select block placeholder="选择地市" onSelect={(value) => console.log(value)}>
                    <Select.Option value="BeiJing">北京</Select.Option>
                    <Select.Option value="ShangHai">上海</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col {...colConf}>
                <Form.Item
                  direction="vertical"
                  label="影响力"
                  name="province"
                  required={true}
                  rules={{
                    required: '影响力不能为空'
                  }}>
                  <Select block placeholder="选择影响力" onSelect={(value) => console.log(value)}>
                    <Select.Option value="BeiJing">1颗星</Select.Option>
                    <Select.Option value="BeiJing">2颗星</Select.Option>
                    <Select.Option value="BeiJing">3颗星</Select.Option>
                    <Select.Option value="ShangHai">4颗星</Select.Option>
                    <Select.Option value="ShangHai">5颗星</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col {...colConf}>
                <Form.Item
                  direction="vertical"
                  label="类别"
                  name="province"
                  required={true}
                  rules={{
                    required: '类别不能为空'
                  }}>
                  <Select block placeholder="选择类别" onSelect={(value) => console.log(value)}>
                    <Select.Option value="BeiJing">经营</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col {...colConf}>
                <Form.Item
                  direction="vertical"
                  label="行业"
                  name="province"
                  required={true}
                  rules={{
                    required: '行业不能为空'
                  }}>
                  <Select block placeholder="选择行业" onSelect={(value) => console.log(value)}>
                    <Select.Option value="dz">党政机关机要</Select.Option>
                    <Select.Option value="dz2">党政机关机要</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={12}>
                <Form.Item
                  direction="vertical"
                  label="Address"
                  name="address"
                  required={true}
                  rules={{
                    required: 'The address is required'
                  }}>
                  <Input block />
                </Form.Item>
              </Col>

              <Col xs={12} sm={4}>
                <Form.Item
                  label="City"
                  name="city"
                  required={true}
                  rules={{
                    required: 'The city is required'
                  }}>
                  <Select
                    block
                    placeholder="Please select a city"
                    onSelect={(value) => console.log(value)}>
                    <Select.Option value="BeiJing">BeiJing</Select.Option>
                    <Select.Option value="ShangHai">ShangHai</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={12} sm={4}>
                <Form.Item
                  label="State"
                  name="state"
                  required={true}
                  rules={{
                    required: 'The state is required'
                  }}>
                  <Select
                    block
                    placeholder="Please select a state"
                    onSelect={(value) => console.log(value)}>
                    <Select.Option value="...">...</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={12} sm={4}>
                <Form.Item
                  label="Zip"
                  name="Zip"
                  rules={{
                    required: 'The zip is required'
                  }}>
                  <Input placeholder="Zip" />
                </Form.Item>
              </Col>

              <Col {...colConf}>
                <Form.Item
                  direction="vertical"
                  label="Contact"
                  name="contact"
                  required={true}
                  rules={{
                    required: 'This is required'
                  }}>
                  <RadioGroup>
                    <Radio value="email">Email</Radio>
                    <Radio value="phone">Phone</Radio>
                  </RadioGroup>
                </Form.Item>
              </Col>
              <Col {...colConf}>
                <Form.Item direction="vertical" label="Introduction" name="introduction">
                  <Input block />
                </Form.Item>
              </Col>

              <Form.Item
                name="accept"
                rules={{
                  validate: (accepted) => {
                    if (!accepted) {
                      return 'You must accept the terms';
                    }
                  }
                }}>
                <Checkbox>Accept the terms</Checkbox>
              </Form.Item>

              <Form.Item compact={true}>
                <Row>
                  <Col>
                    <Button color="blue" nativeType="submit">
                      Save
                    </Button>
                    <Button color="brown" onClick={() => navigate('/platform/customer/list')}>
                      Next
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Row>
          </Form>
        </Card.Row>
      </Card>
    </>
  );
}
