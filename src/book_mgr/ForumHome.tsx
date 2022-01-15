import {
  Breadcrumb,
  IconHome,
  Layout,
  Row,
  Dropdown,
  Col,
  Card,
  Divider,
  Space,
  Button
} from 'react-windy-ui';
import IconArticle from '@/common/icons/IconArticle';
import { Row as AntRow, Col as AntCol } from 'antd';

export default function ForumHome() {
  return (
    <>
      <Breadcrumb style={{ margin: '0.5rem 0' }}>
        <Breadcrumb.Item>
          <IconHome style={{ fontSize: '1.25em' }} />
        </Breadcrumb.Item>
        <Breadcrumb.Item>我的论坛引导</Breadcrumb.Item>
        <Breadcrumb.Item active>论坛名称1</Breadcrumb.Item>
      </Breadcrumb>

      <Layout.Content
        style={{
          minHeight: '15rem',
          padding: '1rem'
        }}>
        <Row>
          <Col xs={12} sm={4} md={3} xg={2}>
            <Card block>
              <Card.Body extraClassName="c-article-body">
                <Row style={{ height: '100%' }}>
                  <Col col={3} flexCol align="center" justify="center">
                    <IconArticle />
                  </Col>
                  <Col col={9} flexCol justify="start" style={{ flexDirection: 'column' }}>
                    <h1>5331</h1>
                    <h5>文章数</h5>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </>
  );
}
