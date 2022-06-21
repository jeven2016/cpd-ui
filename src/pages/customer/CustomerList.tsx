import CustomerDetails from '@/pages/customer/CustomerDetails';

import {
  Box,
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  IconAccount,
  IconChecked2,
  IconHome,
  IconList,
  Row,
  Space,
  Table,
  Tooltip
} from 'react-windy-ui';
import IconChangeView from '@/common/icons/IconChangeView';
import React, { useState } from 'react';
import IconFillStar from '@/common/icons/IconFillStar';

const data = (() => {
  const array = Array(20);
  return [...array.keys()].map((key, index) => ({
    key: key,
    name: 'Nanjing' + index,
    place: '四川税务管理局一部',
    desc: 'Description',
    actions: <div style={{ color: '#0ca0ff' }}>Delete</div>
  }));
})();

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
    key: 'ID',
    head: 'ID',
    paramName: 'key',
    sortable: true,
    fixed: 'left' as const,
    width: '90px'
  },
  {
    key: 'City',
    head: 'City',
    paramName: 'name',
    sortable: true,
    fixed: 'left' as const,
    width: '110px'
  },
  {
    key: 'Place',
    head: 'Place',
    paramName: 'place',
    sortable: true,
    width: '170px'
  },
  {
    key: 'desc',
    head: 'Description',
    paramName: 'desc',
    width: '150px'
  },
  {
    key: 'Column1',
    head: 'Column1',
    paramName: 'desc',
    width: '150px'
  },
  {
    key: 'Column2',
    head: 'Column2',
    paramName: 'desc',
    width: '150px'
  },
  {
    key: 'Column3',
    head: 'Column3',
    paramName: 'desc',
    width: '150px'
  },
  {
    key: 'Column4',
    head: 'Column4',
    paramName: 'desc',
    width: '150px'
  },
  {
    key: 'Column5',
    head: 'Column5',
    paramName: 'desc',
    width: '150px'
  },
  {
    head: 'Column6',
    width: '150px',
    paramName: 'desc' //don't supple the width for the last td in order to make this td occupy the rest space
  },
  {
    head: 'Action',
    paramName: 'actions',
    fixed: 'right' as const
  }
];

const colConf = {
  sm: 12,
  md: 4,
  lg: 4,
  xl: 3
};

export default function CustomerList() {
  const [type, setType] = useState<string>('table');

  return (
    <Card block hasBox={false} style={{ overflow: 'hidden', alignSelf: 'flex-start' }}>
      <Card.Header>
        <div className="content-header">
          <Breadcrumb style={{ marginBottom: '0' }}>
            <Breadcrumb.Item>
              <IconHome />
            </Breadcrumb.Item>
            <Breadcrumb.Item>客户管理</Breadcrumb.Item>
            <Breadcrumb.Item active>客户列表</Breadcrumb.Item>
          </Breadcrumb>

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
              <Button color="green">添加客户</Button>
            </Space>
          </Col>
          <Col></Col>
        </Row>
        {type === 'table' && (
          <div style={{ overflowX: 'auto' }}>
            <Table
              loadData={data}
              cells={cells}
              hover={true}
              type="striped"
              scrollX={true}
              scrollY={true}
              bodyWidth={1500}
              bodyHeight={600}
            />
          </div>
        )}

        {type === 'card' && (
          <Row gutter={{ x: 16, y: 16 }}>
            <CardList />
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}
