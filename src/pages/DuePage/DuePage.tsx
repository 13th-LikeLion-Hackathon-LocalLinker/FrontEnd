// 마감 임박 페이지

import React from 'react';
import Layout from '../../layouts/layout';
import Pager from '../../components/Pager/Pager';
import NoticeCard from '../../components/Card/NoticeCard';
import { useDue } from '../../hooks/useDue';
import Fallback from '../../components/common/Fallback';

const PAGE_SIZE = 6;

export default function DuePage() {
  const { list: notices, loading, error } = useDue(200);
  const [page, setPage] = React.useState(1);

  const total = notices.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const current = notices.slice(start, start + PAGE_SIZE);

  return (
    <Layout headerProps={{ type: 'detail', text: '마감 임박 공고' }}>
      <section style={{ display: 'grid', gap: 12, padding: '16px' }}>
        <Fallback
          loading={loading}
          error={error}
          empty={!loading && !error && current.length === 0}
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
