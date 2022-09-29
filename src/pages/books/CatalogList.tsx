import { Avatar, Box, Button, Card, Col, IconList, Row, Tabs, Typography } from 'react-windy-ui';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { get } from '@/client/Request';
import LinesEllipsis from 'react-lines-ellipsis';

export default function CatalogList() {
  const navigate = useNavigate();
  const [catalogResponse, set] = useState<CatalogPaload>({ list: [] });
  const [selectedTabId, setSelectedTabId] = useState<string | undefined>(
    catalogResponse.list[0]?.id
  );

  const { list } = catalogResponse;

  useEffect(() => {
    get('/api/v1/catalogs').then((data) => {
      set(data as CatalogPaload);
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
                <Avatar hasBox={false} extraClassName="c-list-avatar" size="medium">
                  <IconList />
                </Avatar>
              }
              right={<span className="c-book-chanel"> 书库列表</span>}
            />
          </Col>

          <Col col={12}>
            <div className="c-book-chanel-list">
              <Tabs onChange={(itemVal) => setSelectedTabId(itemVal)} active={selectedTabId}>
                <Tabs.Items>
                  {catalogResponse.list.map((item) => {
                    return (
                      <Tabs.TabItem key={item.id} value={item.id}>
                        {item.name ?? 'Name'}
                      </Tabs.TabItem>
                    );
                  })}
                </Tabs.Items>
                <Tabs.Panels>
                  {catalogResponse.list.map((item) => {
                    return (
                      <Tabs.TabPanel
                        key={'panel-' + item.id}
                        itemValue={item.id}
                        extraClassName="c-catalog-panel">
                        <Row gutter={{ x: 20, y: 32 }}>
                          {item.children?.map((c, index) => {
                            return (
                              <Col sm={12} md={6} xl={4} key={`col-${index}`}>
                                <Card
                                  rise
                                  block
                                  extraClassName={
                                    index % 2 == 0
                                      ? 'c-catalog-background'
                                      : 'c-catalog-background-2'
                                  }
                                  hasBorder={true}>
                                  <Card.Header>
                                    <Box
                                      left={
                                        <div className="c-catalog-flag">
                                          {c.name && c.name.length > 0 && c.name[0]}
                                        </div>
                                      }
                                      center={
                                        <div className="c-catalog-name ellipsis">
                                          <a href="#" onClick={() => showArticles(c.id)}>
                                            {c.name || ''}
                                          </a>
                                        </div>
                                      }
                                    />
                                  </Card.Header>
                                  <Card.Body>
                                    <div>
                                      <LinesEllipsis
                                        maxLine="3"
                                        text={c.description}
                                        ellipsis="..."
                                        trimRight
                                        basedOn="letters"
                                      />
                                    </div>
                                  </Card.Body>
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
                    );
                  })}
                </Tabs.Panels>
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
