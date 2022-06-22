import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Divider } from 'react-windy-ui';

export default function Article() {
  const { id } = useParams();
  const [article, set] = useState<Article | null>(null);

  useEffect(() => {
    axios.get(`/api/v1/articles/${id}`).then((res: AxiosResponse<Article>) => {
      set(res.data);
    });
  }, [id]);

  return (
    <div className="content-area">
      <div
        style={{
          color: '#000',
          fontSize: '1.25rem!important',
          width: '100%',
          height: '100%',
          borderRadius: '.5rem',
          padding: '2rem',
          // background: 'rgb(226,203,173)'
          background: 'rgb(241,229,201)'
        }}>
        <h2>{article?.name}</h2>
        <h4 className="text comment">{article?.createDate}</h4>
        <Divider />
        <div dangerouslySetInnerHTML={{ __html: article?.content ?? '' }}></div>
      </div>
    </div>
  );
}
