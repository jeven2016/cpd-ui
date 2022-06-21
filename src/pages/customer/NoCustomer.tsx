import { Button, Col, Row } from 'react-windy-ui';
import IconNoCustomers from '@/common/icons/IconNoCustomers';
import { useNavigate } from 'react-router-dom';

export default function NoCustomer() {
  const navigate = useNavigate();

  return (
    <div className="content-info">
      <Row>
        <Col md={5}>
          <IconNoCustomers style={{ maxWidth: '500px' }} />
        </Col>
        <Col md={7}>
          <h2>欢迎您：</h2>
          <div>
            <Button color="blue" onClick={() => navigate('/platform/customer/new')}>
              添加新客户
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
