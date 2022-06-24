import {
  Box,
  Button,
  Card,
  Col,
  Dropdown,
  IconList,
  Input,
  Pagination,
  Row,
  Space,
  Table,
  Tooltip
} from 'react-windy-ui';
import IconChangeView from '@/common/icons/IconChangeView';
import React, { useCallback, useEffect, useState } from 'react';
import IconFillStar from '@/common/icons/IconFillStar';
import { Link, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

interface CardListProps {
  list?: Article[];
}

const CardList = ({ list = [] }: CardListProps): JSX.Element => {
  return (
    <>
      {list.map(({ createDate, id, name }) => (
        <Col key={id} {...colConf}>
          <Card block hasBox={false} hasBorder style={{ width: '100%' }}>
            <Card.Body>
              <Box
                block={true}
                autoEllipsis={true}
                center={
                  <Link to={`/books/articles/${id}`}>
                    <h5>{name}</h5>
                  </Link>
                }
              />
              <Space>
                <span>
                  <IconFillStar />
                  <IconFillStar />
                  <IconFillStar />
                </span>
                <h5 className="text comment">{createDate} </h5>
              </Space>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
};

const cells = [
  {
    key: 'index',
    head: '序号',
    paramName: 'index',
    sortable: true,
    // fixed: 'left' as const,
    width: '50px',
    format: (text, row, tableIndex) => {
      return tableIndex + 1;
    }
  },
  {
    key: 'name',
    head: '名称',
    paramName: 'name',
    sortable: false,
    format: (text, row) => {
      return <Link to={`/books/articles/${row.id}`}>{text}</Link>;
    }
  },
  {
    key: 'createDate',
    head: '创建日期',
    paramName: 'createDate',
    sortable: true,
    width: '200px'
  }
  // {
  //   head: '操作',
  //   paramName: 'actions',
  //   // fixed: 'right' as const,
  //   width: '100px'
  // }
];

const colConf = {
  sm: 12,
  md: 4,
  lg: 4,
  xl: 3
};

export default function ArticleList() {
  const [type, setType] = useState<string>('table');
  const [pageInfo, set] = useState<PageInfo | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/v1/catalogs/${id}/articles?page=${page}&pageSize=${pageSize}`)
      .then((res: AxiosResponse<PageInfo>) => {
        res.data?.payload?.forEach((data) => {
          data.key = data.id;
        });
        set(res.data);
      });
  }, [page, pageSize]);

  const goTo = useCallback((page: number, limit: number, e: MouseEvent) => {
    setPageSize(limit);
    setPage(page);
  }, []);

  const changePageSize = useCallback((pageSize: number, e: MouseEvent) => {
    setPageSize(pageSize);
  }, []);

  return (
    <div className="c-content-area">
      <Card block hasBox={true} extraClassName="white-panel">
        <Card.Header>
          <div className="content-header">
            <Space>
              <Dropdown
                activeBy="hover"
                position="right"
                title={
                  <Tooltip body="切换视图">
                    <span style={{ color: '#dd740a', cursor: 'pointer', fontSize: '1.5rem' }}>
                      <IconChangeView />
                    </span>
                  </Tooltip>
                }>
                <Dropdown.Menu>
                  <Dropdown.Item id="item1" onClick={() => setType('card')}>
                    卡片排列
                  </Dropdown.Item>
                  <Dropdown.Item id="item2" onClick={() => setType('table')}>
                    列表排列
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Space>
          </div>
        </Card.Header>
        <Card.Body>
          <Row style={{ marginBottom: '1.5rem' }}>
            <Col>
              <Space>
                <Input />
                <Button type="primary">搜索</Button>
              </Space>
            </Col>
            <Col></Col>
          </Row>
          {type === 'table' && (
            <Table loadData={pageInfo?.payload} cells={cells} hover={true} type="striped" />
          )}

          {type === 'card' && (
            <Row gutter={{ x: 16, y: 16 }}>
              <CardList list={pageInfo?.payload ?? ([] as Article[])} />
            </Row>
          )}
          <div className="c-pagination-row">
            <Pagination
              hasPageRange
              pageCount={pageInfo?.totalPage}
              page={pageInfo?.page}
              pageRanges={[10, 20, 50, 100]}
              pageRange={pageSize}
              onChangeRange={changePageSize}
              siblingCount={2}
              leftItems={[`共${pageInfo?.totalPage}页， ${pageInfo?.totalRecords}条记录`]}
              onChange={goTo}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
