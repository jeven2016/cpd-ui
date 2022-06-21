import { Button, Col, Divider, Row } from 'react-windy-ui';
import IconNoCustomers from '@/common/icons/IconNoCustomers';
import { useNavigate } from 'react-router-dom';

export default function CatalogList() {
  const navigate = useNavigate();

  return (
    <div className="content-area">
      <div style={{ width: '100%', height: '100%', padding: '2rem' }}>
        <h2>书库：</h2>
        <Divider />
        <div style={{ marginTop: '1rem' }}>dfgdfg</div>
      </div>
    </div>
  );
}
