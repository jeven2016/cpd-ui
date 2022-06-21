import {
  Breadcrumb,
  Card,
  Dropdown,
  IconChecked2,
  IconHome,
  Modal,
  Space,
  Tabs,
  Tooltip
} from 'react-windy-ui';
import BasicInf from '@/pages/customer/panels/BasicInf';
import IconChangeView from '@/common/icons/IconChangeView';
import { useState } from 'react';

const FullWindowDetails = ({ showFullWindow, setShowFullWindow }) => {
  return (
    <Modal
      active={showFullWindow}
      onCancel={() => setShowFullWindow(false)}
      type="fullWindow"
      size="large"
      autoOverflow={true}>
      <Modal.Header>客户信息</Modal.Header>
      <Modal.Body style={{ border: 'none' }}>
        <div>
          <Tabs>
            <Tabs.Items>
              <Tabs.TabItem value="Item1">客户基本信息</Tabs.TabItem>
            </Tabs.Items>
          </Tabs>
          <BasicInf />
        </div>
        <div>
          <Tabs>
            <Tabs.Items>
              <Tabs.TabItem value="Item1">客户基本信息</Tabs.TabItem>
            </Tabs.Items>
          </Tabs>
          <BasicInf />
        </div>
        <div>
          <Tabs>
            <Tabs.Items>
              <Tabs.TabItem value="Item1">客户基本信息</Tabs.TabItem>
            </Tabs.Items>
          </Tabs>
          <BasicInf />
        </div>
      </Modal.Body>
    </Modal>
  );
};

const DetailsPanel = ({ position }): JSX.Element => {
  if (position === 'left' || position === 'top') {
    return (
      <Tabs
        onChange={(item) => console.log(item)}
        position={position}
        type="card"
        hasRipple={false}>
        <Tabs.Items>
          <Tabs.TabItem value="Item1">客户基本信息</Tabs.TabItem>
          <Tabs.TabItem value="Item2">筑三链</Tabs.TabItem>
          <Tabs.TabItem value="Item2">竞争态势</Tabs.TabItem>
          <Tabs.TabItem value="Item2">商机</Tabs.TabItem>
        </Tabs.Items>
        <Tabs.Panels>
          <Tabs.TabPanel itemValue="Item1">
            <Tabs>
              <Tabs.Items>
                <Tabs.TabItem value="Item1">客户基本信息</Tabs.TabItem>
              </Tabs.Items>
            </Tabs>
            <BasicInf />
          </Tabs.TabPanel>
          <Tabs.TabPanel itemValue="Item2">
            <BasicInf />
          </Tabs.TabPanel>
        </Tabs.Panels>
      </Tabs>
    );
  }

  if (position === 'expand') {
    return (
      <>
        <div>
          <Tabs>
            <Tabs.Items>
              <Tabs.TabItem value="Item1">客户基本信息</Tabs.TabItem>
            </Tabs.Items>
          </Tabs>
          <BasicInf />
        </div>
        <div>
          <Tabs>
            <Tabs.Items>
              <Tabs.TabItem value="Item1">客户基本信息</Tabs.TabItem>
            </Tabs.Items>
          </Tabs>
          <BasicInf />
        </div>
        <div>
          <Tabs>
            <Tabs.Items>
              <Tabs.TabItem value="Item1">客户基本信息</Tabs.TabItem>
            </Tabs.Items>
          </Tabs>
          <BasicInf />
        </div>
      </>
    );
  }

  return <></>;
};

export default function CustomerDetails() {
  const [position, setPosition] = useState<string>('top');
  const [showFullWindow, setShowFullWindow] = useState<boolean>(false);

  return (
    <Card block hasBox={false} hasBorder={false} style={{ height: '100%', background: '#fff' }}>
      <Card.Header>
        <div className="content-header">
          <Breadcrumb style={{ marginBottom: '0' }}>
            <Breadcrumb.Item>
              <IconHome />
            </Breadcrumb.Item>
            <Breadcrumb.Item>客户管理</Breadcrumb.Item>
            <Breadcrumb.Item active>添加客户</Breadcrumb.Item>
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
                <Dropdown.Item id="item1" onClick={() => setPosition('top')}>
                  <Space>
                    顶部排列
                    <IconChecked2 />
                  </Space>
                </Dropdown.Item>
                <Dropdown.Item id="item2" onClick={() => setPosition('left')}>
                  左侧排列
                </Dropdown.Item>
                <Dropdown.Item id="item3" onClick={() => setPosition('expand')}>
                  全部展开
                </Dropdown.Item>
                <Dropdown.Item id="item4" onClick={() => setShowFullWindow(true)}>
                  全屏显示
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Space>
        </div>
      </Card.Header>
      <Card.Row>
        <DetailsPanel position={position} />
        <FullWindowDetails showFullWindow={showFullWindow} setShowFullWindow={setShowFullWindow} />
      </Card.Row>
    </Card>
  );
}
