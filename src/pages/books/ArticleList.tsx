import {
  Box,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  Pagination,
  Responsive,
  Row,
  Space,
  Table,
  Tooltip,
  Affix,
  useMediaQuery
} from 'react-windy-ui';
import IconChangeView from '@/common/icons/IconChangeView';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import IconFillStar from '@/common/icons/IconFillStar';
import { Link, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import { get } from '@/client/Request';

interface CardListProps {
  list?: Article[];
}

const CardList = ({ list = [] }: CardListProps): JSX.Element => {
  return (
    <>
      {list.map(({ createDate, id, name }) => (
        <Col key={id} {...colConf}>
          <Card block hasBox={false} hasBorder>
            <Card.Body style={{ minHeight: '4rem' }}>
              <Tooltip body={name}>
                <Box
                  hasPadding={false}
                  justify="start"
                  block={true}
                  autoEllipsis={true}
                  center={
                    <Link to={`/books/articles/${id}`} className="c-article-title" target="_blank">
                      <h4>{name}</h4>
                    </Link>
                  }
                />
              </Tooltip>
            </Card.Body>
            <Card.Footer>
              <h5 className="text comment">{createDate} </h5>
            </Card.Footer>
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
      return (
        <Link target="_blank" to={`/books/articles/${row.id}`}>
          {text}
        </Link>
      );
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
  const { t } = useTranslation();
  const [type, setType] = useState<string>('card');
  const [pageInfo, set] = useState<PageInfo | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>('');
  const { matches: smallWindow } = useMediaQuery(Responsive.sm.max);

  const { id } = useParams();

  useEffect(() => {
    smallWindow && type == 'table' && setType('card');
  }, [smallWindow, type]);

  const list = useCallback(
    (url: string) => {
      get(url).then((data) => {
        (data as PageInfo)?.payload?.forEach((data) => {
          data.key = data.id;
        });
        set(data as PageInfo);
      });
    },
    [id, page, pageSize]
  );

  const loadList = useCallback(() => {
    if (searchValue.length == 0) {
      list(`/api/v1/catalogs/${id}/articles?page=${page}&pageSize=${pageSize}`);
    } else {
      list(
        `/api/v1/articles?search=${encodeURIComponent(
          searchValue
        )}&page=${page}&pageSize=${pageSize}`
      );
    }
  }, [id, page, pageSize, searchValue]);

  useEffect(() => {
    loadList();
  }, [id, page, pageSize]);

  const goTo = useCallback((page: number, limit: number, e: MouseEvent) => {
    setPageSize(limit);
    setPage(page);
  }, []);

  const changePageSize = useCallback((pageSize: number) => {
    setPageSize(pageSize);
  }, []);

  const search = useCallback(() => {
    setPage(1);
    loadList();
  }, [loadList]);

  const switchArea = useMemo<React.ReactElement>(
    () => (
      <Space>
        <Dropdown
          activeBy="hover"
          position="leftBottom"
          title={
            <Tooltip body={t('global.switch_list')}>
              <span style={{ color: '#dd740a', cursor: 'pointer', fontSize: '1.5rem' }}>
                <IconChangeView />
              </span>
            </Tooltip>
          }>
          <Dropdown.Menu>
            <Dropdown.Item id="item1" onClick={() => setType('card')}>
              {t('global.card_type.card')}
            </Dropdown.Item>
            <Dropdown.Item id="item2" onClick={() => setType('table')}>
              {t('global.card_type.list')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Space>
    ),
    []
  );

  const pagination = (
    <Pagination
      hasPageRange
      simple={smallWindow}
      pageCount={pageInfo?.totalPage || 0}
      page={pageInfo?.page || 0}
      pageRanges={[10, 20, 50, 100]}
      pageRange={pageSize}
      onChangeRange={changePageSize}
      siblingCount={1}
      leftItems={[
        `${t('global.pagination.total')}${pageInfo?.totalPage || 0}${t(
          'global.pagination.pages'
        )}， ${pageInfo?.totalRecords || 0}${t('global.pagination.records')}`
      ]}
      onChange={goTo}
      selectProps={{
        position: 'topRight'
      }}
    />
  );

  return (
    <div className="c-content-area">
      <Card block hasBox={true} extraClassName="white-panel">
        <Card.Body>
          <Box
            autoEllipsis
            block
            hasPadding={false}
            alignRight="center"
            left={
              <Space>
                <Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <Button type="primary" onClick={search}>
                  {t('global.search.button')}
                </Button>
              </Space>
            }
            right={!smallWindow && switchArea}
          />
          {type === 'table' && (
            <Table loadData={pageInfo?.payload} cells={cells} hover={true} type="striped" />
          )}

          {type === 'card' && (
            <Row gutter={{ x: 16, y: 16 }}>
              <CardList list={pageInfo?.payload ?? ([] as Article[])} />
            </Row>
          )}
          <div className="c-pagination-row">
            {smallWindow ? (
              <Affix bottom={0} extraClassName="c-affix">
                {pagination}
              </Affix>
            ) : (
              pagination
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
