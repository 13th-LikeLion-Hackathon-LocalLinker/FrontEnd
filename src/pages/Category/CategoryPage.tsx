import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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

import FilterPanel from '../../components/FilterPanel/FilterPanel';
import PersonSwitch from '../../components/PersonSwitch/PersonSwitch';
import SortButtons from '../../components/SortButtons/SortButtons';
import { sortNotices } from '../../components/SortButtons/sort';
import type { SortKey } from '../../components/SortButtons/SortButtons.types';

import { loadOnboardingFilters, type MarriedStr } from '../../utils/onboarding';
import { normalizeVisa } from '../../utils/shared';

const DEBUG = true;
const PAGE_SIZE = 6;

type Filters = { visa: string; nation: string; married: MarriedStr };

// 언더스코어 포맷으로 강제
const toVisaParam = (visaValue?: string): string | undefined => {
  if (!visaValue) return undefined;
  const n = normalizeVisa(visaValue) || visaValue;
  return n.trim().toUpperCase().replace(/-/g, '_').replace(/\s+/g, '');
};

export default function CategoryPage() {
  const navigate = useNavigate();
  const [sp, setSp] = useSearchParams();

  // 렌더 중 Router 업데이트 방지: 다음 틱
  const deferSetSp = useCallback(
    (updater: (prev: URLSearchParams) => URLSearchParams) => {
      setTimeout(() => {
        setSp((prev) => updater(new URLSearchParams(prev)));
      }, 0);
    },
    [setSp],
  );

  const raw = sp.get('category');
  const cat: CategoryCode = isCategoryCode(raw)
    ? (raw as CategoryCode)
    : DEFAULT_CATEGORY;

  const [personalOnly, setPersonalOnly] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>('due');

  // 입력/적용 분리
  const [pending, setPending] = useState<Filters>({
    visa: '',
    nation: '',
    married: '',
  });
  const [applied, setApplied] = useState<Filters>({
    visa: '',
    nation: '',
    married: '',
  });

  // 개인맞춤 ON이면 온보딩, OFF면 적용값
  const onboarding = loadOnboardingFilters(); // { visa, nation, married: 'true'|'false'|'' }
  const active = personalOnly ? onboarding : applied;

  const page = Math.max(1, parseInt(sp.get('page') || '1', 10));

  // 화면 디버그
  useEffect(() => {
    if (!DEBUG) return;
    console.log('[CategoryPage] mount');
    return () => console.log('[CategoryPage] unmount');
  }, []);
  useEffect(() => {
    if (!DEBUG) return;
    console.log('[CategoryPage] state', {
      personalOnly,
      pending,
      applied,
      active,
      cat,
      page,
      sortKey,
    });
  }, [personalOnly, pending, applied, active, cat, page, sortKey]);

  const applyFilters = useCallback(() => {
    if (DEBUG) console.log('[CategoryPage] applyFilters()', { pending });
    setApplied(pending);
    deferSetSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', '1');
      return next;
    });
  }, [pending, deferSetSp]);

  const resetFilters = useCallback(() => {
    if (DEBUG) console.log('[CategoryPage] resetFilters()');
    setPending({ visa: '', nation: '', married: '' });
  }, []);

  const togglePersonal = useCallback(() => {
    setPersonalOnly((prev) => {
      const nv = !prev;
      if (prev === true) setPending(applied); // OFF 전환 시 현재 적용값 프리필
      if (DEBUG)
        console.log('[CategoryPage] togglePersonal()', { from: prev, to: nv });
      return nv;
    });
    deferSetSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set('page', '1');
      return next;
    });
  }, [applied, deferSetSp]);

  // 최종 파라미터 (국적은 전송 X)
  const visaParam = toVisaParam(active.visa);
  const marriedParam =
    active.married === '' ? undefined : active.married === 'true';

  if (DEBUG) {
    console.log('[CategoryPage] query params to hook', {
      category: cat,
      page: 0,
      size: 500,
      visa: visaParam,
      married: marriedParam,
    });
  }

  const {
    list: categoryList,
    loading,
    error,
  } = useCategoryResults({
    cat,
    page: 0,
    size: 500,
    visa: visaParam,
    married: marriedParam,
  });

  const sortedAll = useMemo(
    () => sortNotices(categoryList, sortKey),
    [categoryList, sortKey],
  );
  const total = sortedAll.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const current = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedAll.slice(start, start + PAGE_SIZE);
  }, [sortedAll, page]);

  const setPageSafe = (p: number) => {
    const np = Math.min(Math.max(1, p), totalPages);
    deferSetSp((prev) => {
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
    if (DEBUG) console.log('[CategoryPage] goCategory()', { nextCat });
    deferSetSp((prev) => {
      const next = new URLSearchParams(prev);
      next.set('category', nextCat);
      next.set('page', '1');
      return next;
    });
    setSortKey('due');
  };

  return (
    <Layout
      showHeader
      showFooter
      headerProps={{ type: 'detail', text: CATEGORY_LABELS[cat] }}
    >
      <div id="top-anchor" />
      <CategoryTabs active={cat} order={CATEGORY_ORDER} onChange={goCategory} />

      <L.Wrap>
        <L.CountBar>
          <b style={{ color: '#111827' }}>
            전체 <span style={{ color: '#0FB050' }}>{total}</span>건
          </b>
          {error && (
            <span style={{ color: 'crimson', marginLeft: 8 }}>
              에러: {error}
            </span>
          )}
        </L.CountBar>

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
            onSwitchPerson={togglePersonal}
          />
          <SortButtons sortKey={sortKey} onChangeSort={setSortKey} />
        </div>

        {!personalOnly && (
          <FilterPanel
            visa={pending.visa}
            nation={pending.nation} // 보여주기 전용
            married={pending.married}
            onChange={(patch) => setPending((f) => ({ ...f, ...patch }))}
            onReset={resetFilters}
            onSubmit={applyFilters}
            visaOptions={VISA_OPTIONS}
            nationalities={NATIONALITIES}
          />
        )}

        <L.List>
          <Fallback
            loading={loading}
            error={error}
            empty={!loading && !error && current.length === 0}
          >
            {current.map((n) => (
              <NoticeCard
                key={n.id}
                {...n}
                onClick={() => navigate(`/detail/${Number(n.id)}`)}
              />
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
