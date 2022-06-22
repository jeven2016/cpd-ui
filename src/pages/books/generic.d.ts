interface Catalog {
  id: string;
  parentId: string;
  name?: string;
  order?: number;
  articleCount: number;
  description?: string;
}

interface CatalogPaload {
  payload: {
    Count: number;
    List: Catalog[];
  };
}

interface Article {
  key: string;
  id: string;
  name: string;
  content?: string;
  catalogId: string;
  createDate: string;
}

interface PageInfo {
  page: number;
  totalPage: number;
  pageSize: number;
  totalRecords: number;
  code: any;
  message: string;
  payload?: Article[];
  errors: string;
}
