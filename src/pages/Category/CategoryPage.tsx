// src/pages/Category/CategoryPage.tsx
import React, { useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '../../layouts/layout';
import NoticeCard from '../../components/Card/NoticeCard';
import Pager from '../../components/Pager/Pager';
import FabChat from '../../components/FabChat';
import * as L from './CategoryPage.styles';
import CategoryTabs from '../../components/CategoryTabs/CategoryTabs';
import Fallback from '../../components/common/Fallback';

import type { CategoryCode } from '../../types/category';
import { CATEGORY_LABELS, DEFAULT_CATEGORY, isCategoryCode } from '../../types/category';
import { CATEGORY_ORDER } from '../../constants/categories';
import { VISA_OPTIONS, NATIONALITIES } from '../../constants/onboardingOptions';
import { useCategoryResults } from '../../hooks/useCategoryResults';

import FilterPanel from '../../components/FilterPanel/FilterPanel';
import PersonSwitch from '../../components/PersonSwitch/PersonSwitch';
import SortButtons from '../../components/SortButtons/SortButtons';
import { sortNotices } from '../../components/SortButtons/sort';
import type { SortKey } from '../../components/SortButtons/SortButtons.types';

import { loadOnboardingFilters, NATION_TO_LANGUAGE, type MarriedStr } from '../../utils/onboarding';
import { normalizeVisa } from '../../utils/shared';

const PAGE_SIZE = 6;

export default function CategoryPage() {
  const navigate = useNavigate();
  const handleCardClick = (id: string | number) => navigate(`/detail/${Number(id)}`);
  const [sp, setSp] = useSearchParams();

  const raw = sp.get('category');
  const cat: CategoryCode = isCategoryCode(raw) ? (raw as CategoryCode) : DEFAULT_CATEGORY;

  const [personalOnly, setPersonalOnly] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>('due');

  const [filters, setFilters] = useState<{ visa: string; nation: string; married: MarriedStr }>({
    visa: '',
    nation: '',
    married: '',
  });

  const onboarding = loadOnboardingFilters();
  const active = personalOnly ? onboarding : filters;

  const { list: categoryList, loading, error } = useCategoryResults({
    cat,
    page: 0,
    size: 500,
    visa: normalizeVisa(active.visa) ?? undefined,
    language: active.nation ? NATION_TO_LANGUAGE[active.nation] : undefined,
    married: active.married === '' ? undefined : active.married === 'true',
  });

  const page = Math.max(1, parseInt(sp.get('page') || '1', 10));

  // ✅ 정렬: 공용 함수로 통일
  const sortedAll = useMemo(() => sortNotices(categoryList, sortKey), [categoryList, sortKey]);

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
      document.getElementById('top-anchor')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const goCategory = (nextCat: CategoryCode) => {
    setSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set('category', nextCat);
      next.set('page', '1');
      return next;
    });
    setSortKey('due');
  };

  return (
    <Layout showHeader showFooter headerProps={{ type: 'detail', text: CATEGORY_LABELS[cat] }}>
      <div id="top-anchor" />
      <CategoryTabs active={cat} order={CATEGORY_ORDER} onChange={goCategory} />

      <L.Wrap>
        <L.CountBar>
          <b style={{ color: '#111827' }}>전체 {total}건</b>
          {error && <span style={{ color: 'crimson', marginLeft: 8 }}>에러: {error}</span>}
        </L.CountBar>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 16px 8px' }}>
          <PersonSwitch personalOnly={personalOnly} onSwitchPerson={() => setPersonalOnly((v) => !v)} />
          <SortButtons sortKey={sortKey} onChangeSort={setSortKey} />
        </div>

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

        <L.List>
          <Fallback loading={loading} error={error} empty={!loading && !error && current.length === 0}>
            {current.map((n) => (
              <NoticeCard key={n.id} {...n} onClick={() => handleCardClick(n.id)} />
            ))}
          </Fallback>
        </L.List>

        {!loading && !error && totalPages > 1 && <Pager page={page} totalPages={totalPages} onChange={setPageSafe} />}
      </L.Wrap>

      <FabChat />
    </Layout>
  );
}
