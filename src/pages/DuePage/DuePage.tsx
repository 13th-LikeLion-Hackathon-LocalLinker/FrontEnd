import React from 'react';
import Layout from '../../layouts/layout';
import Pager from '../../components/Pager/Pager';
import NoticeCard from '../../components/Card/NoticeCard';
import { useDue } from '../../hooks/useDue';
import Fallback from '../../components/common/Fallback';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 6;

export default function DuePage() {
  const navigate = useNavigate();

  const { list: notices, loading, error } = useDue(200, 50);
  const [page, setPage] = React.useState(1);

  const total = notices.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const current = notices.slice(start, start + PAGE_SIZE);

  // 데이터(리스트)가 바뀌면 페이지를 1로 리셋해서 빈 화면 방지
  React.useEffect(() => {
    setPage(1);
  }, [total]);

  React.useEffect(() => {
    console.log('[closing-soon][page]', {
      total,
      page,
      pageSize: PAGE_SIZE,
      showing: current.length,
      currentIds: current.map((n) => n.id),
    });
  }, [total, page, current]);

  const handleCardClick = (id: string | number) => {
    navigate(`/detail/${Number(id)}`);
  };

  return (
    <Layout headerProps={{ type: 'detail', text: '마감 임박 공고' }}>
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '16px',
          paddingTop: '67px',
        }}
      >
        <Fallback
          loading={loading}
          error={error}
          empty={!loading && !error && current.length === 0}
        >
          {current.map((n) => (
            <NoticeCard
              key={n.id}
              {...n}
              onClick={() => handleCardClick(n.id)}
            />
          ))}
        </Fallback>
      </section>

      {!loading && !error && totalPages > 1 && (
        <div style={{ padding: '8px 0 16px' }}>
          <Pager page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      )}
    </Layout>
  );
}
