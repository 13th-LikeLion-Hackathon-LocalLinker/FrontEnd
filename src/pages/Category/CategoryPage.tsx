// src/pages/Category/CategoryPage.tsx
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../../layouts/layout';
import NoticeCard from '../../components/Card/NoticeCard';
import Pager from '../../components/Pager/Pager';
import type { Notice } from '../../data/notices';
import { latest, dueSoon } from '../../data/notices';
import {
  CategoryCode,
  CATEGORY_LABELS,
  DEFAULT_CATEGORY,
  isCategoryCode,
} from '../../types/category';
import * as L from './CategoryPage.styles';

const PER_PAGE = 6;

function useCategoryData(cat: CategoryCode): Notice[] {
  const map: Record<CategoryCode, Notice[]> = {
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

  const raw = sp.get('category');
  const cat: CategoryCode = isCategoryCode(raw) ? raw : DEFAULT_CATEGORY;

  const page = Math.max(1, parseInt(sp.get('page') || '1', 10));
  const all = useCategoryData(cat);
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  const data = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return all.slice(start, start + PER_PAGE);
  }, [all, page]);

  const setPage = (p: number) => {
    const np = Math.min(Math.max(1, p), totalPages);
    // 다른 쿼리스트링 보존
    setSp(prev => {
      const next = new URLSearchParams(prev);
      next.set('category', cat);
      next.set('page', String(np));
      return next;
    });
  };

  return (
    <Layout
      showHeader
      showFooter
      headerProps={{ type: 'detail', text: CATEGORY_LABELS[cat] }}
    >
      <L.Wrap>
        <L.CountBar>
          <span>전체</span>
          <b style={{ color: '#111827' }}>{total}건</b>
        </L.CountBar>

        <L.List>
          {data.map((n) => (
            <NoticeCard key={n.id} {...n} />
          ))}
        </L.List>

        <Pager page={page} totalPages={totalPages} onChange={setPage} />
      </L.Wrap>
    </Layout>
  );
}
