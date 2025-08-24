import React from 'react';
import Layout from '../../layouts/layout';
import Pager from '../../components/Pager/Pager';
import NoticeCard from '../../components/Card/NoticeCard';
import { useLatest } from '../../hooks/useLatest';
import Fallback from '../../components/common/Fallback';
import SortButtons from '../../components/SortButtons/SortButtons';

const PAGE_SIZE = 6;

export default function LatestPage() {
  const { list, loading, error } = useLatest(200, 50);
  const [page, setPage] = React.useState(1);

  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const current = list.slice(start, start + PAGE_SIZE);

  return (
    <Layout headerProps={{ type: 'detail', text: '최신 공고' }}>
      <div id="latest-top" />
      <section style={{ padding: '12px 16px' }}>
        <div style={{ fontSize: 12, color: 'black' }}>전체 {total}건</div>
      </section>

      <section style={{ display: 'grid', gap: 12, padding: '0 16px 16px' }}>
        <Fallback
          loading={loading}
          error={error}
          empty={!loading && !error && current.length === 0}
          emptyText="공고가 아직 없습니다."
        >
          {current.map((n) => (
            <NoticeCard key={n.id} {...n} />
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
