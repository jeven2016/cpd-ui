import {
  Avatar,
  Box,
  Button,
  Card,
  Col,
  Divider,
  IconList,
  Row,
  Tabs,
  Typography
} from 'react-windy-ui';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { get } from '@/client/Request';
import pic from '@/assets/bg.jpg';

export default function CatalogList() {
  const navigate = useNavigate();
  const [catalogs, set] = useState<CatalogPaload | null>(null);

  const list = catalogs?.payload?.List ?? [];
  useEffect(() => {
    get('/api/v1/catalogs')
      .then((data) => {
        set(data as CatalogPaload);
      })
      .catch((e) => {
        console.error(e);
        // alert(e.message);
      });
  }, []);

  const showArticles = useCallback((id: string) => {
    navigate(`/books/catalogs/${id}/articles`);
  }, []);

  return (
    <div className="c-content-area">
      <div className="c-content-header">
        <div className="c-header-panel">
          <div className="c-book-chanel"> 书库频道</div>
          <div className="c-header-desc">
            <Typography italic>沉浸书香世界，感受尘世气息。</Typography>
          </div>
        </div>
      </div>
      <div className={'c-content-body'}>
        <Row>
          <Col md={12}>
            <Box
              left={
                <Avatar hasBox={false} extraClassName="bg-color-primary" size="medium">
                  <IconList />
                </Avatar>
              }
              right={<span className="c-book-chanel"> 书库列表</span>}
            />
            <div className="c-book-chanel-list">
              <Tabs onChange={(item) => console.log(item)}>
                <Tabs.Items>
                  <Tabs.TabItem value="Item1">Item1</Tabs.TabItem>
                </Tabs.Items>
                <Tabs.Items>
                  <Tabs.TabItem value="Item2">Item1</Tabs.TabItem>
                </Tabs.Items>
                <Tabs.Panels>
                  <Tabs.TabPanel itemValue="Item1">
                    <Row gutter={{ x: 16, y: 16 }}>
                      {list.map((c: Catalog, index: number) => {
                        return (
                          <Col col={3} key={`col-${index}`}>
                            <Card rise block extraClassName="white-panel">
                              <Card.Header>
                                <h3>{c.name || 'City Name'}</h3>
                              </Card.Header>
                              <Divider />
                              <Card.Body style={{ minHeight: '7rem' }}>{c.description}</Card.Body>
                              <Divider />
                              <Card.Footer>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                  }}>
                                  <h5>37000篇文章， 5882页</h5>
                                  <Button
                                    size="small"
                                    inverted
                                    color="primary"
                                    onClick={() => showArticles(c.id)}>
                                    进入
                                  </Button>
                                </div>
                              </Card.Footer>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                  </Tabs.TabPanel>
                  <Tabs.TabPanel itemValue="Item2">
                    <div>The panel for Item1</div>
                  </Tabs.TabPanel>
                </Tabs.Panels>
              </Tabs>
            </div>
          </Col>
          <Col md={8}></Col>
        </Row>
      </div>
    </div>
  );
}
