import {
  Box,
  Breadcrumb,
  Button,
  Card,
  Col,
  Dropdown,
  IconHome,
  IconList,
  Input,
  Pagination,
  Row,
  Space,
  Table,
  Tooltip
} from 'react-windy-ui';
import IconChangeView from '@/common/icons/IconChangeView';
import React, { FormEventHandler, useCallback, useEffect, useState } from 'react';
import IconFillStar from '@/common/icons/IconFillStar';
import { Link, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { tab } from '@testing-library/user-event/dist/tab';

const CardList = () => {
  const array = Array(20);
  return (
    <>
      {React.Children.map([...array.keys()], (key, index) => (
        <Col key={key} {...colConf}>
          <Card block hasBox={false} hasBorder>
            <Card.Body>
              <Box
                block={true}
                autoEllipsis={true}
                center={
                  <span className="text bold color-blue">
                    <h4>四川省国家保密局{index}</h4>
                  </span>
                }
                right={
                  <Dropdown
                    position="bottomRight"
                    title={
                      <Button inverted color="brown" circle hasBox={false}>
                        <IconList />
                      </Button>
                    }>
                    <Dropdown.Menu>
                      <Dropdown.Item id="item2">详情</Dropdown.Item>
                      <Dropdown.Item id="item3">修改</Dropdown.Item>
                      <Dropdown.Item id="item1">删除</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                }
              />
              <Space>
                <span>
                  <IconFillStar />
                  <IconFillStar />
                  <IconFillStar />
                </span>
                <h5 className="text comment"> 四川省/成都 </h5>
              </Space>
              <p>类别：经营类</p>
              <p>行业：党政机关机要</p>
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
                position="bottomRight"
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
            <>
              <Table loadData={pageInfo?.payload} cells={cells} hover={true} type="striped" />
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
            </>
          )}

          {type === 'card' && (
            <Row gutter={{ x: 16, y: 16 }}>
              <CardList />
            </Row>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
