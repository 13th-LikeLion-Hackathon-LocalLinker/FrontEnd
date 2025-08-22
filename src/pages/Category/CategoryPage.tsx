import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../../layouts/layout';
import NoticeCard from '../../components/Card/NoticeCard';
import Pager from '../../components/Pager/Pager';
import FabChat from '../../components/FabChat';
import type { CategoryCode } from '../../types/category';
import {
  CATEGORY_LABELS,
  DEFAULT_CATEGORY,
  isCategoryCode,
} from '../../types/category';
import { useCategoryNotices } from '../../hooks/notices';
import * as L from './CategoryPage.styles';
import Fallback from '../../components/common/Fallback';

const PAGE_SIZE = 6;

// 버튼 행 + 버튼 스타일
const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 12px 16px 0;
`;

const TabButton = styled.button<{ $active: boolean }>`
  min-width: 53px;
  height: 37px;
  border-radius: 200px;
  padding: 10px 14px;
  border: none;
  background: ${(p) => (p.$active ? '#616462' : '#FFFFFF')};
  color: ${(p) => (p.$active ? '#FFFFFF' : '#616462')};
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;
`;

// 카테고리 표시 순서
const CATEGORY_ORDER: CategoryCode[] = [
  'ADMINISTRATION',
  'MEDICAL',
  'HOUSING',
  'EMPLOYMENT',
  'EDUCATION',
  'LIFE_SUPPORT',
];

export default function CategoryPage() {
  const [sp, setSp] = useSearchParams();
  const raw = sp.get('category');
  const cat: CategoryCode = isCategoryCode(raw)
    ? (raw as CategoryCode)
    : DEFAULT_CATEGORY;

  const { list: all, loading, error } = useCategoryNotices(cat, 200);

  const page = Math.max(1, parseInt(sp.get('page') || '1', 10));
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const data = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return all.slice(start, start + PAGE_SIZE);
  }, [all, page]);

  const setPage = (p: number) => {
    const np = Math.min(Math.max(1, p), totalPages);
    setSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set('category', cat);
      next.set('page', String(np));
      return next;
    });
  };

  const goCategory = (nextCat: CategoryCode) => {
    setSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set('category', nextCat);
      next.set('page', '1');
      return next;
    });
  };

  return (
    <Layout
      showHeader
      showFooter
      headerProps={{ type: 'detail', text: CATEGORY_LABELS[cat] }}
    >
      {/* ▶ 헤더 아래 카테고리 이동 버튼 */}
      <Tabs>
        {CATEGORY_ORDER.map((code) => {
          const active = code === cat;
          return (
            <TabButton
              key={code}
              $active={active}
              aria-pressed={active}
              onClick={() => goCategory(code)}
            >
              {CATEGORY_LABELS[code]}
            </TabButton>
          );
        })}
      </Tabs>

      <L.Wrap>
        <L.CountBar>
          <b style={{ color: '#111827' }}>전체 {total}건</b>
          {error && (
            <span style={{ color: 'crimson', marginLeft: 8 }}>
              에러: {error}
            </span>
          )}
        </L.CountBar>

        <L.List>
          <Fallback
            loading={loading}
            error={error}
            empty={!loading && !error && data.length === 0}
          >
            {data.map((n) => (
              <NoticeCard key={n.id} {...n} />
            ))}
          </Fallback>
        </L.List>

        {!loading && !error && totalPages > 1 && (
          <Pager page={page} totalPages={totalPages} onChange={setPage} />
        )}
      </L.Wrap>
      <FabChat />
    </Layout>
  );
}
