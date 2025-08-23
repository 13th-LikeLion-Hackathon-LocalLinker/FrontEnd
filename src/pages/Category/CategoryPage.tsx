// src/pages/Category/CategoryPage.tsx
import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../../layouts/layout';
import NoticeCard from '../../components/Card/NoticeCard';
import Pager from '../../components/Pager/Pager';
import FabChat from '../../components/FabChat';
import * as L from './CategoryPage.styles';

import CategoryTabs from '../../components/CategoryTabs/CategoryTabs';
import Fallback from '../../components/common/Fallback';

import type { CategoryCode } from '../../types/category';
import {
  CATEGORY_LABELS,
  DEFAULT_CATEGORY,
  isCategoryCode,
} from '../../types/category';

import { CATEGORY_ORDER } from '../../constants/categories';
import { VISA_OPTIONS, NATIONALITIES } from '../../constants/onboardingOptions';

import { useCategoryResults } from '../../hooks/useCategoryResults';

// 분리된 컴포넌트
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import PersonSwitch from '../../components/PersonSwitch/PersonSwitch';
import SortButtons from '../../components/SortButtons/SortButtons';

// 유틸
import {
  periodEndTs,
  periodStartTs,
  cmpAscSafe,
  cmpDescSafe,
} from '../../utils/dates';
import {
  loadOnboardingFilters,
  NATION_TO_LANGUAGE,
  type MarriedStr,
} from '../../utils/onboarding';
import { normalizeVisa } from '../../utils/shared';

type SortKey = 'due' | 'latest';
const PAGE_SIZE = 6;

export default function CategoryPage() {
  const [sp, setSp] = useSearchParams();

  // 카테고리 파라미터
  const raw = sp.get('category');
  const cat: CategoryCode = isCategoryCode(raw)
    ? (raw as CategoryCode)
    : DEFAULT_CATEGORY;

  // 개인 맞춤 / 정렬
  const [personalOnly, setPersonalOnly] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>('due');

  // 스위치 OFF일 때만 사용하는 필터 상태
  const [filters, setFilters] = useState<{
    visa: string;
    nation: string;
    married: MarriedStr;
  }>({
    visa: '',
    nation: '',
    married: '',
  });

  // 온보딩 저장값
  const onboarding = loadOnboardingFilters();

  // 실제 요청 파라미터(개인 맞춤 ON이면 온보딩값 사용)
  const active = personalOnly ? onboarding : filters;

  // 데이터 조회 (훅 내부에서 서버 실패 시 목업으로 폴백)
  const {
    list: categoryList,
    loading,
    error,
  } = useCategoryResults({
    cat,
    page: 0,
    size: 500,
    visa: normalizeVisa(active.visa) ?? undefined,
    language: active.nation ? NATION_TO_LANGUAGE[active.nation] : undefined,
    married: active.married === '' ? undefined : active.married === 'true',
  });

  // 페이지네이션
  const page = Math.max(1, parseInt(sp.get('page') || '1', 10));

  // 정렬
  const sortedAll = useMemo(() => {
    const base = [...categoryList];
    if (sortKey === 'due') {
      base.sort((a, b) =>
        cmpAscSafe(periodEndTs(a.period), periodEndTs(b.period)),
      );
    } else {
      base.sort((a, b) =>
        cmpDescSafe(periodStartTs(a.period), periodStartTs(b.period)),
      );
    }
    return base;
  }, [categoryList, sortKey]);

  const total = sortedAll.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const current = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedAll.slice(start, start + PAGE_SIZE);
  }, [sortedAll, page]);

  const setPageSafe = (p: number) => {
    const np = Math.min(Math.max(1, p), totalPages);
    setSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', String(np));
      return next;
    });
    requestAnimationFrame(() => {
      document
        .getElementById('top-anchor')
        ?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const goCategory = (nextCat: CategoryCode) => {
    setSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set('category', nextCat);
      next.set('page', '1');
      return next;
    });
    setSortKey('due'); // 카테고리 바뀌면 기본 정렬로
  };

  return (
    <Layout
      showHeader
      showFooter
      headerProps={{ type: 'detail', text: CATEGORY_LABELS[cat] }}
    >
      <div id="top-anchor" />

      {/* 카테고리 탭 */}
      <CategoryTabs active={cat} order={CATEGORY_ORDER} onChange={goCategory} />

      <L.Wrap>
        {/* 상단 건수/에러 */}
        <L.CountBar>
          <b style={{ color: '#111827' }}>전체 {total}건</b>
          {error && (
            <span style={{ color: 'crimson', marginLeft: 8 }}>
              에러: {error}
            </span>
          )}
        </L.CountBar>

        {/* 상단 컨트롤: 개인맞춤 스위치 + 정렬 버튼 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 16px 8px',
          }}
        >
          <PersonSwitch
            personalOnly={personalOnly}
            onSwitchPerson={() => setPersonalOnly((v) => !v)}
          />
          <SortButtons sortKey={sortKey} onChangeSort={setSortKey} />
        </div>

        {/* 스위치 OFF → 검색 패널 */}
        {!personalOnly && (
          <FilterPanel
            visa={filters.visa}
            nation={filters.nation}
            married={filters.married}
            onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))}
            onReset={() => setFilters({ visa: '', nation: '', married: '' })}
            visaOptions={VISA_OPTIONS}
            nationalities={NATIONALITIES}
          />
        )}

        {/* 리스트 */}
        <L.List>
          <Fallback
            loading={loading}
            error={error}
            empty={!loading && !error && current.length === 0}
          >
            {current.map((n) => (
              <NoticeCard key={n.id} {...n} />
            ))}
          </Fallback>
        </L.List>

        {!loading && !error && totalPages > 1 && (
          <Pager page={page} totalPages={totalPages} onChange={setPageSafe} />
        )}
      </L.Wrap>

      <FabChat />
    </Layout>
  );
}
