// src/pages/Category/CategoryPage.tsx
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import Layout from '../../layouts/layout';
import NoticeCard from '../../components/Card/NoticeCard';
import type { Notice } from '../../data/notices';
import { latest, dueSoon } from '../../data/notices';

type CatKey =
  | 'ADMINISTRATION'
  | 'MEDICAL'
  | 'HOUSING'
  | 'EMPLOYMENT'
  | 'EDUCATION'
  | 'LIFE_SUPPORT';

const LABELS: Record<CatKey, string> = {
  ADMINISTRATION: '행정',
  MEDICAL: '의료',
  HOUSING: '주거',
  EMPLOYMENT: '취업/근로',
  EDUCATION: '교육',
  LIFE_SUPPORT: '생활 지원',
};

const PER_PAGE = 6;

const Wrap = styled.div`
  padding: 12px 16px 24px;
`;
const CountBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 12px;
  margin-bottom: 12px;
`;
const List = styled.div`
  display: grid;
  gap: 10px;
`;
const Pager = styled.nav`
  margin: 20px 0 8px;
  display: flex;
  justify-content: center;
  gap: 6px;
  button {
    min-width: 32px;
    height: 32px;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
    background: #fff;
    font-size: 14px;
    cursor: pointer;
  }
  .active {
    background: #0fb050;
    color: #fff;
    border-color: #0fb050;
  }
  button:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

function useCategoryData(cat: CatKey): Notice[] {
  const map: Record<CatKey, Notice[]> = {
    ADMINISTRATION: latest,
    MEDICAL: dueSoon,
    HOUSING: latest,
    EMPLOYMENT: dueSoon,
    EDUCATION: latest,
    LIFE_SUPPORT: dueSoon,
  };
  return map[cat] ?? latest;
}

export default function CategoryPage() {
  const [sp, setSp] = useSearchParams();
  const cat = (sp.get('category') as CatKey) || 'ADMINISTRATION';
  const page = Math.max(1, parseInt(sp.get('page') || '1', 10));

  const headerTitle = LABELS[cat] || '목록';
  const all = useCategoryData(cat);
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  const data = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return all.slice(start, start + PER_PAGE);
  }, [all, page]);

  const setPage = (p: number) => {
    const np = Math.min(Math.max(1, p), totalPages);
    setSp({ category: cat, page: String(np) });
  };

  return (
    <Layout showHeader showFooter headerProps={{ type: 'detail', text: headerTitle }}>
      <Wrap>
        <CountBar>
          <span>전체</span>
          <b style={{ color: '#111827' }}>{total}건</b>
        </CountBar>

        <List>
          {data.map((n) => (
            <NoticeCard key={n.id} {...n} />
          ))}
        </List>

        <Pager aria-label="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
            {'<'}
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const num = i + 1;
            return (
              <button
                key={num}
                className={num === page ? 'active' : undefined}
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            );
          })}
          <button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
            {'>'}
          </button>
        </Pager>
      </Wrap>
    </Layout>
  );
}
