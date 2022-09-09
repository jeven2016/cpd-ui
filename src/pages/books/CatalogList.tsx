import { Button, Card, Col, Divider, Row } from 'react-windy-ui';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { get } from '@/client/Request';

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
      <div>
        <Row gutter={{ x: 16, y: 16 }}>
          {list.map((c: Catalog, index: number) => {
            return (
              <Col xs={12} sm={6} md={3} key={`col-${index}`}>
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
      </div>
    </div>
  );
}
